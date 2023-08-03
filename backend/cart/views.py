from django.shortcuts import get_object_or_404
# REST
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework import status
# Models
from .models import Cart
from shop.models import ProductsModel
# Serilizers
from .serializers import CartSerializer
from shop.serializers import ProductsModelSerializer
# Tools
import json
import redis

# Create your views here.
class CartGetView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    # Create a connection to the Redis server
    redis_connection = redis.Redis(host="redis", port=6379, db=0)

    def get(self, request):
        try:
            user_id = request.user.id
        except AttributeError:
            return Response({"error": "Missing product"}, status=status.HTTP_404_NOT_FOUND)

        cart_key = f"cart:{user_id}"

        # Retrieve the products list from Redis cache
        products_cache_list = self.get_data_from_redis_set(cart_key)

        try:
            if products_cache_list:
                return Response(products_cache_list, status.HTTP_200_OK)
            else:
                usercart_cart_db = get_object_or_404(Cart, user=user_id)
                usercart_db_list = usercart_cart_db.Products_list.all()
                serializer = ProductsModelSerializer(usercart_db_list, many=True)

                # Store the fetched data in the Redis cache
                self.add_data_to_redis_set(cart_key, serializer.data)
                return Response(serializer.data, status.HTTP_200_OK)
        except Exception as e:
            # Return error response for any other exceptions
            return Response({"error": "Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def get_data_from_redis_set(self, key):
        user_cart_redis = CartGetView.redis_connection.smembers(key)
        user_cart_list = []
        for product in user_cart_redis:
            product_json = json.loads(product)
            user_cart_list.append(product_json)
        return user_cart_list

    def add_data_to_redis_set(self, cart_key, product_data_list):
        r = CartGetView.redis_connection
        for product in product_data_list:
            r.sadd(cart_key, json.dumps(product))
        r.expire(cart_key, 600)


class CartAddView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, format=None):
        try:
            product_id = request.data.get("product_id")
            user_id = request.user.id
        except (KeyError, AttributeError) as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        try:
            # Retrieve product data from the database using the provided product_id
            product_data_db = ProductsModel.objects.get(id=product_id)
            serializer = ProductsModelSerializer(product_data_db)

            # Create a Redis key to store the user's cart
            cart_key = f"cart:{user_id}"

            # Check if the user already has a cart
            if Cart.objects.filter(User=user_id).exists():
                # If the user has a cart, add the product to the existing cart
                user_cart = Cart.objects.get(user=user_id)
                user_cart.add_product(product_id)

                # Store product data in Redis set associated with the user's cart
                self.add_data_to_redis_set(cart_key, (json.dumps(serializer.data)))

                return Response({"message": "Product Added to Cart"}, status.HTTP_200_OK)
            else:
                # If the user doesn't have a cart, create a new cart for the user

                # Store product data in Redis set associated with the new cart
                self.add_data_to_redis_set(cart_key, (json.dumps(serializer.data)))

                # Create data for the new cart
                data = {"User": user_id, "Products_list": [product_id]}
                serializer = CartSerializer(data=data)

                # Validate and save the new cart data
                if serializer.is_valid():
                    serializer.save()
                    return Response({"message": "Product Added to Cart"}, status.HTTP_200_OK)
                else:
                    return Response({"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
                
        except Exception as e:
            # Return error response for any other exceptions
            return Response({"error": "Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def add_data_to_redis_set(self, cart_key, product_data_json):
        r = redis.Redis(host="redis", port=6379, db=0)
        r.sadd(cart_key, product_data_json)
        r.expire(cart_key, 600)  


class CartDeleteItemView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, product_id):
        try:
            user_id = request.user.id
        except AttributeError as e:
            return Response({"error": "User not authenticated"}, status=status.HTTP_403_FORBIDDEN)

        try:
            # Check if the user has a cart
            user_cart = get_object_or_404(Cart, user=user_id)
        except Cart.DoesNotExist:
            return Response({"error": "Cart not found"}, status=status.HTTP_404_NOT_FOUND)

        try:
            if product_id is not None:
                # Remove the specified product from the user's cart
                user_cart.remove_product(product_id)

                cart_key = f"cart:{user_id}"

                # Retrieve product data from the database using the provided product_id
                product_data_db = ProductsModel.objects.get(id=product_id)
                serializer = ProductsModelSerializer(product_data_db)

                # Remove the product data from the Redis set associated with the user's cart
                self.remove_data_to_redis_set(cart_key, json.dumps(serializer.data))

                return Response({"message": "Product deleted from the cart"}, status=status.HTTP_200_OK)
            else:
                return Response({"error": "Missing product_id"}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            # Return error response for any other exceptions
            return Response({"error": "Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def remove_data_to_redis_set(self, cart_key, product_data_json):
        # Helper function to remove product data from the Redis set associated with the user's cart
        r = redis.Redis(host="redis", port=6379, db=0)
        r.srem(cart_key, product_data_json)
