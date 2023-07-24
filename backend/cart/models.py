from django.db import models
from user_profile.models import UserProfile
from shop.models import ShopModel

# Create your models here.

class Cart(models.Model):
    id = models.AutoField(primary_key=True, null=False)
    User = models.OneToOneField(UserProfile, on_delete=models.CASCADE, null=False)
    Products_list = models.ManyToManyField(ShopModel)

    def __str__(self):
        return f"User: {self.User}"
