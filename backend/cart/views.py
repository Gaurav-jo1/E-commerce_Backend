from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework import status

from django.core.cache import cache
import redis

# Create your views here.
class CartAddView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, format=None):
        # Getting the product with it's product_id
        product_id = request.data.get("product_id")
        user_id = request.user.id

        try:
            if product_id is not None:
                cache_key = f"{user_id}_cart"
                # cache.set(cache_key, product_id, timeout=None)
                r = redis.Redis(host='redis', port=6379, db=0)
                r.sadd(cache_key,product_id)

                return Response({"message": "Product Added to Cart" }, status.HTTP_200_OK)

            else:
                return Response(
                    {"error": "Missing product"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class CartGetView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, format=None):
        user_id = request.user.id

        try:
            if user_id is not None:
                cache_key = f"{user_id}_cart"
                r = redis.Redis(host='redis', port=6379, db=0)
                product_value = r.smembers(cache_key)

                return Response({"message": product_value}, status.HTTP_200_OK)

            else:
                return Response(
                    {"error": "Missing product"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        