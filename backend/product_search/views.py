from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework import permissions
from shop.models import ProductsModel

from redis.exceptions import ResponseError
from redis.commands.search.query import Query

import redis
import json


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
                return print(f"Index {index_name} already exists")

        except ResponseError:
            response = r.execute_command(
                "FT.CREATE",
                "idx:product",
                "ON",
                "hash",
                "PREFIX",
                "1",
                "product:",
                "SCHEMA",
                "name",
                "TEXT",
                "SORTABLE",
                "price",
                "NUMERIC",
                "image",
                "TEXT",
            )
            return print("RedisCreateIndex: ", response)

    def RedisDataLoad(self):
        r = redis.Redis(host="redis", port=6379, db=0)

        flag_key = "Data_Loaded_Flag"
        if r.exists(flag_key):
            return print("RedisDataLoad: Data already loaded, skipping...")

        products_list = ProductsModel.objects.all()

        for product in products_list:
            product_id = f"product:{product.id}"

            r.hset(
                product_id,
                mapping={
                    "item_id": product.id,
                    "name": product.name,
                    "price": product.price,
                    "image": product.image.url,
                },
            )

        # Set the flag key to indicate that the data has been loaded
        r.set(flag_key, "loaded")

        return print("RedisDataLoad: Program executed Succesfully")


class ProductSearch(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        
        search_text = request.data.get("search_text")
        user_search = request.data.get("user_search")

        try:
            r = redis.Redis(host="redis", port=6379, db=0, decode_responses=True)
            index = r.ft("idx:product")

            if search_text:
                redis_search_test = f"{search_text.rstrip()}*"
                redis_response = index.search(
                    Query(redis_search_test).paging(0, 5)
                )

            elif user_search:
                redis_user_search = f"{user_search.rstrip()}*"
                redis_response = index.search(
                    Query(redis_user_search)
                )

            if len(redis_response.docs) != 0:
                result_list = []

                # Iterate through the documents in the response
                for doc in redis_response.docs:

                    # print(doc.item_id)

                    result_dict = {
                        "id": doc.item_id,
                        "name": doc.name,
                        "image": doc.image
                    }
                    result_list.append(result_dict)

                # Convert the list of dictionaries into a JSON format
                result_json = json.dumps(result_list)
                return Response(data=result_json,status=status.HTTP_200_OK)


            else:
                return Response(
                    {"message": "No Product found"}, status=status.HTTP_404_NOT_FOUND
                )

        except ResponseError as e:
            # Return error response for any other exceptions
            return Response(
                {"error": {str(e)}},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
