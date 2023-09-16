import os
from django.core.management.base import BaseCommand
import json
from django.conf import settings
from shop.models import ProductsModel, ShopModel
from user_profile.models import Avatar


class Command(BaseCommand):
    def handle(self, *args, **options):
        avatar_file_path = os.path.join(settings.BASE_DIR, "avatar_data.json")
        products_file_path = os.path.join(settings.BASE_DIR, "products_data.json")
        shop_file_path = os.path.join(settings.BASE_DIR, "shop_data.json")

        print("Loadings Products:")
        self.import_products_from_json(products_file_path)

        print("Loading Avatars")
        self.import_avatars_from_json(avatar_file_path)

        print("Loadings Shop")
        self.import_shop_from_json(shop_file_path)

    def import_products_from_json(self, json_file_path):
        with open(json_file_path, "r") as file:
            data = json.load(file)

            for products in range(len(data)):
                # Check if a product with the same 'id' already exists in the database
                product_id = data[products]["id"]
                existing_product = ProductsModel.objects.filter(id=product_id).first()

                if existing_product is None:
                    # Create a new instance of the Product model and populate fields from the JSON data
                    new_product = ProductsModel(
                        id=data[products]["id"],
                        image=data[products]["image"],
                        name=data[products]["name"],
                        price=data[products]["price"],
                    )
                    new_product.save()

                    print(f"Inserted product with id: {product_id}")
                else:
                    print(f"Skipped duplicate product with id: {product_id}")

    def import_avatars_from_json(self, json_file_path):
        with open(json_file_path, "r") as file:
            data = json.load(file)

            for avatars in range(len(data)):
                # Check if an avatar with the same 'id' already exists in the database
                avatar_id = data[avatars]["id"]

                existing_avatar = Avatar.objects.filter(id=avatar_id).first()

                if existing_avatar is None:
                    # Create a new instance of the Avatar model and populate fields from the JSON data
                    new_avatar = Avatar(
                        id=data[avatars]["id"], image=data[avatars]["image"]
                    )

                    new_avatar.save()
                    print(f"Inserted avatar with id: {avatar_id}")
                else:
                    print(f"Skipped duplicate avatar with id: {avatar_id}")

    def import_shop_from_json(self, json_file_path):
        with open(json_file_path, "r") as file:
            data = json.load(file)

            for shop in range(len(data)):
                # Check if an shop with the same 'id' already exists in the database
                shop_id = data[shop]["id"]

                existing_shop = ShopModel.objects.filter(id=shop_id).first()

                if existing_shop is None:
                    # Create a new instance of the shop model and populate fields from the JSON data
                    new_shop = ShopModel(
                        id=data[shop]["id"],
                        category=data[shop]["category"],
                        position_id=data[shop]["position_id"],
                        product_id=data[shop]["product_id"],
                    )

                    new_shop.save()
                    print(f"Inserted shop with id: {shop_id}")
                else:
                    print(f"Skipped duplicate shop with id: {shop_id}")
