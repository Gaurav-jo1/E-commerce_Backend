from rest_framework import serializers
from .models import ShopModel, ProductsModel

class ProductsModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductsModel
        fields = '__all__'

class ShopModelSerializer(serializers.ModelSerializer):
    product = ProductsModelSerializer()
    class Meta:
        model = ShopModel
        fields = '__all__'
