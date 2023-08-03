from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework import status

from .models import Cart
from shop.models import ProductsModel

from .serializers import CartSerializer
from shop.serializers import ProductsModelSerializer

import redis
import json


# Create your views here.


class CartGetView(APIView):
    def get_data_from_redis_set(self, key):
        r = redis.Redis(host="redis", port=6379, db=0)
        user_cart_redis = r.smembers(key)
        user_cart_list = []
        for product in user_cart_redis:
            product_json = json.loads(product)
            user_cart_list.append(product_json)
        return user_cart_list

    def add_data_to_redis_set(self, cart_key, product_data_list):
        r = redis.Redis(host="redis", port=6379, db=0)
        for product in product_data_list:
            r.sadd(cart_key, json.dumps(product))
        r.expire(cart_key, 600)

    def get(self, request, format=None):
        user_id = request.user.id

        try:
            if user_id:
                cart_key = f"cart:{user_id}"
                products_cache_list = self.get_data_from_redis_set(cart_key)

                if products_cache_list:
                    return Response(products_cache_list, status.HTTP_200_OK)
                else:
                    usercart_db = Cart.objects.get(User=user_id)
                    usercart_db_list = usercart_db.Products_list.all()
                    serializer = ProductsModelSerializer(usercart_db_list, many=True)
                    self.add_data_to_redis_set(cart_key, serializer.data)
                    return Response(serializer.data, status.HTTP_200_OK)

            else:
                return Response(
                    {"error": "Missing product"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class CartAddView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def add_data_to_redis_set(self, cart_key, product_data_json):
        r = redis.Redis(host="redis", port=6379, db=0)
        r.sadd(cart_key, product_data_json)
        r.expire(cart_key, 10)

    def post(self, request, format=None):
        product_id = request.data.get("product_id")
        user_id = request.user.id
        cart_key = f"cart:{user_id}"
        product_data_db = ProductsModel.objects.get(id=product_id)
        product_data = {
            "id": product_data_db.id,
            "image": product_data_db.image.url,
            "name": product_data_db.name,
            "price": product_data_db.price,
        }

        product_data_json = json.dumps(product_data)

        try:
            if product_id is not None:
                user_cart_exists = Cart.objects.filter(User=user_id)
                if user_cart_exists:
                    self.add_data_to_redis_set(cart_key, (product_data_json))
                    user_cart = Cart.objects.get(User=user_id)
                    user_cart.add_product(product_id)

                    return Response(
                        {"message": "Product Added to Cart"}, status.HTTP_200_OK
                    )
                else:
                    self.add_data_to_redis_set(cart_key, (product_data_json))
                    data = {"User": user_id, "Products_list": [product_id]}
                    serializer = CartSerializer(data=data)
                    if serializer.is_valid():
                        serializer.save()
                        return Response(
                            {"message": "Product Added to Cart"}, status.HTTP_200_OK
                        )

                    else:
                        return Response(
                            {"error": "Missing product"},
                            status=status.HTTP_400_BAD_REQUEST,
                        )

            else:
                return Response(
                    {"error": "Missing product"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class CartDeleteItemView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def remove_data_to_redis_set(self, cart_key, product_data_json):
        r = redis.Redis(host="redis", port=6379, db=0)
        r.srem(cart_key, product_data_json)


    def delete(self, request, product_id):
        user_id = request.user.id

        try:
            if product_id is not None:
                user_cart_exists = Cart.objects.filter(User=user_id)

                if user_cart_exists:
                    user_cart = Cart.objects.get(User=user_id)
                    user_cart.remove_product(product_id)
                    cart_key = f"cart:{user_id}"
                    product_data_db = ProductsModel.objects.get(id=product_id)
                    product_data = {
                        "id": product_data_db.id,
                        "image": product_data_db.image.url,
                        "name": product_data_db.name,
                        "price": product_data_db.price,
                    }

                    product_data_json = json.dumps(product_data)
                    self.remove_data_to_redis_set(cart_key, product_data_json)

                    return Response(
                        {"message": "Product Deleted from the Cart"}, status.HTTP_200_OK
                    )
                else:
                    return Response(
                        {"error": "Missing product"},
                        status=status.HTTP_404_NOT_FOUND,
                    )
            else:
                return Response(
                    {"error": "Missing product"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
