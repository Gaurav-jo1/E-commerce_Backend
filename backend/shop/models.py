from django.db import models

class ProductsModel(models.Model):
    image = models.ImageField(upload_to='products/',default=None)
    name = models.CharField(max_length=100, default=None)
    price = models.IntegerField(default=None)

    def __str__(self):
        return f"{self.name}"
    
    class Meta:
        ordering = ['name'] 

# Create your models here.
class ShopModel(models.Model):
    category_list = (
        ('New & Featured','New & Featured'),
        ('Men','Men'),
        ('Women','Women'),
        ('Kids','Kids'),
        ('Sale','Sale'),
    )
    
    category = models.CharField(max_length=100, choices=category_list)
    position_id = models.IntegerField(unique=False, null=True)
    product = models.ForeignKey(ProductsModel, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return f"{self.position_id}. {self.category}: {self.product}"
    
    class Meta:
        ordering = ['category', 'position_id'] 


