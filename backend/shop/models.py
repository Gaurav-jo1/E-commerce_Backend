from django.db import models

# Create your models here.
class ShopModel(models.Model):
    category_list = (
        ('option1','New & Featured'),
        ('option2','Men'),
        ('option3','Women'),
        ('option4','Kids'),
        ('option5','Sale'),
    )
    
    category = models.CharField(max_length=100, choices=category_list)
    product = models.CharField(max_length=100, default=None)
    image = models.ImageField(upload_to='products/',default=None)

    def __str__(self):
        return self.category
