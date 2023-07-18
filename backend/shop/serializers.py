from rest_framework import serializers
from .models import ShopModel

class ShopModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShopModel
        fields = '__all__'
