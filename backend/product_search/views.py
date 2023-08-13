from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework import permissions
from shop.models import ProductsModel

import redis

from redis.exceptions import ResponseError


# Create your views here.

class LoadProducts:
    def RedisCreateIndex(self):
        # Establish a connection to the Redis server
        r = redis.Redis(host="redis", port=6379, db=0)

        # Index name
        index_name = "idx:product"

        try:
            index_exists = r.execute_command("FT.INFO idx:product")

            if index_exists:
               return print(f"Index '{index_name}' exists")
            else:
                print(f"Index '{index_name}' does not exist")
                

        except ResponseError as e:
            if "Unknown Index name" in str(e):
                response = r.execute_command('FT.CREATE', 'idx:product', 'ON', 'hash', 'PREFIX', '1', 'product:', 'SCHEMA', 'name', 'TEXT', 'SORTABLE', 'price', 'NUMERIC', 'image', 'TEXT')
                return print("RedisCreateIndex: ", response)

            else:
                return print(f"Redis error: {str(e)}")

    def RedisDataLoad(self):
        r = redis.Redis(host="redis", port=6379, db=0)

        flag_key = "Data_Loaded_Flag"
        if r.exists(flag_key):
            return print("RedisDataLoad: Data already loaded, skipping...")
        
        products_list = ProductsModel.objects.all()

        for product in products_list:
            product_id = f"product:{product.id}"

            r.hset(product_id, "name", product.name)
            r.hset(product_id, "price", product.price)
            r.hset(product_id, "image", product.image.url)

        # Set the flag key to indicate that the data has been loaded
        r.set(flag_key, "loaded")

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
