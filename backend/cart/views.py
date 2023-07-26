from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework import status
from .models import Cart
from .serializers import CartSerializer
from shop.models import ProductsModel
import redis


# Create your views here.
class CartAddView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def add_data_to_redis_set(self, key, data):
        r = redis.Redis(host="redis", port=6379, db=0)
        r.sadd(key, data)

    def get_data_from_redis_set(self, key):
        r = redis.Redis(host="redis", port=6379, db=0)
        data = r.smembers(key)
        return data

    def add_data_to_db_shop(self, username, product_id):
        product = ProductsModel.objects.get(id=product_id)
        Cart.objects.create(user=username)
        Cart.Products_list.set(product)
        Cart.save()

    def get(self, request, format=None):
        user_id = request.user.id

        try:
            if user_id:
                cache_key = f"{user_id}_cart"
                products_cache_list = self.get_data_from_redis_set(cache_key)
                # products_db_list = Cart.objects.get(User=request.user)
                return Response({"message": products_cache_list}, status.HTTP_200_OK)

            else:
                return Response(
                    {"error": "Missing product"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def post(self, request, format=None):
        # Getting the product with it's product_id
        product_id = request.data.get("product_id")
        user_id = request.user.id
        data = {"User": user_id, "Products_list": [product_id]}

        try:
            if product_id is not None:
                cache_key = f"{user_id}_cart"
                self.add_data_to_redis_set(cache_key, product_id)

                user_cart_exists = Cart.objects.filter(User=user_id)

                if user_cart_exists:
                    user_cart = Cart.objects.get(User=user_id)
                    user_cart.add_product(product_id)

                    return Response(
                        {"message": "Product Added to Cart"}, status.HTTP_200_OK
                    )
                else:
                    serializer = CartSerializer(data=data)
                    if serializer.is_valid():
                        serializer.save()

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
