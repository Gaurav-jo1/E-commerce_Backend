from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework import status

import redis
from django.core.cache import cache


# Create your views here.
class CartAddView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def add_data_to_redis_set(self, key, data):
        r = redis.Redis(host="redis", port=6379, db=0)
        r.sadd(key, data)
        cache.set(key, r.smembers(key)) 

    # def get_data_from_redis_set(self, key):
    #     r = redis.Redis(host="redis", port=6379, db=0)
    #     cache.clear()
    #     data = r.smembers(key)
    #     return data

    def get(self, request, format=None):
        user_id = request.user.id

        try:
            if user_id:
                cache_key = f"{user_id}_cart"
                # products_list = self.get_data_from_redis_set(cache_key)
                r = redis.Redis(host="redis", port=6379, db=0)
                r.smembers(cache_key)
                return Response({"message": list(r.smembers(cache_key))}, status.HTTP_200_OK)

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

        try:
            if product_id is not None:
                cache_key = f"{user_id}_cart"
                # cache.set(cache_key, product_id, timeout=None)
                self.add_data_to_redis_set(cache_key, product_id)

                return Response(
                    {"message": "Product Added to Cart"}, status.HTTP_200_OK
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
