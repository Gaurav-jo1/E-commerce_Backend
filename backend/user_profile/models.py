from django.db import models
from django.contrib.auth.models import User
from django.dispatch import receiver
from django.db.models.signals import post_save
import random
# Create your models here.
class Avatar(models.Model):
    id = models.AutoField(primary_key=True, null=False)
    image = models.ImageField(upload_to='images/',default=None)

    def __str__(self):
        return f"ID: {self.id}"
    
class UserProfile(models.Model):
    id = models.AutoField(primary_key=True, null=False)
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True)
    picture = models.ForeignKey(Avatar, on_delete=models.SET_NULL, null=True)

    @receiver(post_save, sender=User)
    def create_user_profile(sender, instance, created, **kwargs):
        avatars = Avatar.objects.all()
        random_avatar = random.choice(avatars)
        if created:
            UserProfile.objects.create(user=instance, picture=random_avatar)

    def __str__(self):
        return "%s's Profile" % self.user
    