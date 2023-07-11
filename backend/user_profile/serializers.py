from rest_framework import serializers
from .models import Avatar, UserProfile
from django.contrib.auth.models import User

class AvatarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Avatar
        fields = ('id', 'image')

class UserProfileSerializer(serializers.ModelSerializer):
    user = serializers.CharField(source='user.username')
    picture = serializers.ImageField(source='picture.image')

    class Meta:
        model = UserProfile
        fields = '__all__'
