from django.db import models
from django.contrib.auth.models import User
from shop.models import ShopModel

# Create your models here.

class Cart(models.Model):
    id = models.AutoField(primary_key=True, null=False)
    User = models.ForeignKey(User, on_delete=models.CASCADE, null=False)
    Products_list = models.ManyToManyField(ShopModel)


    def add_product(self, product):
        self.Products_list.add(product)

    def remove_product(self, product):
        self.Products_list.remove(product)

    def __str__(self):
        return f"User: {self.User}"
