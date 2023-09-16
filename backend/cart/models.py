from django.db import models
from django.contrib.auth.models import User
from shop.models import ProductsModel
# Create your models here.

class Cart(models.Model):
    id = models.AutoField(primary_key=True, null=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False)
    Products_list = models.ManyToManyField(ProductsModel, blank=True)

    def add_product(self, product):
        self.Products_list.add(product)

    def remove_product(self, product):
        self.Products_list.remove(product)

    def __str__(self):
        return f"User: {self.user}"
