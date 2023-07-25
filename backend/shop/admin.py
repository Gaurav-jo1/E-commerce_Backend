from django.contrib import admin
from .models import ShopModel,ProductsModel

# Register your models here.

admin.site.register(ShopModel)
admin.site.register(ProductsModel)