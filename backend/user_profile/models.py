from django.db import models

# Create your models here.
class Avatar(models.Model):
    id = models.AutoField(primary_key=True, null=False)
    image = models.ImageField(upload_to='images/',default=None)

    def __str__(self):
        return f"ID: {self.id}"