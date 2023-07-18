from django.db import models

# Create your models here.
class ShopModel(models.Model):
    category_list = (
        ('New & Featured','New & Featured'),
        ('Men','Men'),
        ('Women','Women'),
        ('Kids','Kids'),
        ('Sale','Sale'),
    )
    
    position_id = models.IntegerField(unique=False, default=None)
    category = models.CharField(max_length=100, choices=category_list)
    product = models.CharField(max_length=100, default=None)
    image = models.ImageField(upload_to='products/',default=None)

    def __str__(self):
        return f"{self.position_id}. {self.category}: {self.product}"
