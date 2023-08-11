from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework import permissions
from shop.models import ProductsModel

import redis

# Create your views here.

class LoadProducts:
    def RedisDataLoad(self):
        r = redis.Redis(host="redis", port=6379, db=0, decode_responses=True)

        products_list = ProductsModel.objects.all()

        for product in products_list:
            product_id = f"product:{product.id}"

            r.hset(product_id, "name", product.name)
            r.hset(product_id, "price", product.price)
            r.hset(product_id, "image", product.image.url)



        return print("RedisDataLoad: Program executed Succesfully")


class ProductSearch(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        try:
            search_text = request.data.get("search_text")
        except (KeyError, AttributeError) as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        try:
            r = redis.Redis(host="redis", port=6379, db=0, decode_responses=True)
            command = "FT.SEARCH idx:movie '%gdfather%' RETURN 3 title release_year rating"
            redis_response = r.execute_command(command)
            print("Redis Response: ", redis_response)
            Response(status=status.HTTP_200_OK)
        except Exception as e:
            # Return error response for any other exceptions
            return Response(
                {"error": "Internal Server Error"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
