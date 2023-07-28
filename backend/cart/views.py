from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework import status

from .serializers import CartSerializer
from .models import Cart
from shop.models import ProductsModel

from django.core import serializers

import redis
import json


# Create your views here.
class CartAddView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def add_data_to_redis_set(self, cart_key, product_data_json):
        r = redis.Redis(host="redis", port=6379, db=0)
        r.sadd(cart_key, product_data_json)

    def get_data_from_redis_set(self, key):
        r = redis.Redis(host="redis", port=6379, db=0)
        data = r.smembers(key)
        return data

    def get(self, request, format=None):
        user_id = request.user.id

        try:
            if user_id:
                cache_key = f"{user_id}_cart"
                self.add_data_to_redis_set(user_id)
                products_cache_list = self.get_data_from_redis_set(cache_key)
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
        product_id = request.data.get("product_id")
        user_id = request.user.id
        cart_key = f"cart:{user_id}"
        product_data = ProductsModel.objects.get(id=product_id)
        product_data_json = json.dumps(
            {
                "id": product_data.id,
                "image": product_data.image.url,
                "name": product_data.name,
                "price": product_data.price,
            }
        )

        try:
            if product_id is not None:
                user_cart_exists = Cart.objects.filter(User=user_id)
                if user_cart_exists:
                    self.add_data_to_redis_set(cart_key, json.dumps(product_data_json))
                    user_cart = Cart.objects.get(User=user_id)
                    user_cart.add_product(product_id)

                    return Response(
                        {"message": "Product Added to Cart"}, status.HTTP_200_OK
                    )
                else:
                    self.add_data_to_redis_set(cart_key, json.dumps(product_data_json))
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
