from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework import permissions
from shop.models import ProductsModel

import redis

# Create your views here.

class LoadProducts:
    def redisDataLoad(self):
        r = redis.Redis(host="redis", port=6379, db=0, decode_responses=True)

        products_list = ProductsModel.objects.all()

        for product in products_list:
            product_id = product.id

            field_value_pairs = {
                "name": product.name,
                "price": product.price,
                "image": product.image.url,
            }

            r.hset(f"product:{product_id}", mapping=field_value_pairs)

        return print("Program executed Succesfully")


class ProductSearch(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        try:
            search_text = request.data.get("search_text")
        except (KeyError, AttributeError) as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        try:
            r = redis.Redis(host="redis", port=6379, db=0, decode_responses=True)

        except Exception as e:
            # Return error response for any other exceptions
            return Response(
                {"error": "Internal Server Error"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
