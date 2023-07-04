
from django.contrib.auth.models import User

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework import status
from .serializers import AvatarSerializer
from .models import Avatar
import random



# Create your views here.

class UserInfoView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        data = {
            'id': user.id,
            'username': user.username,
            'email': user.email
        }

        return Response(data,status=status.HTTP_200_OK)

class UserProfileView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        avatars = Avatar.objects.all()
        if avatars:
            random_avatar = random.choice(avatars)
            serializer = AvatarSerializer(random_avatar)
            serialized_avatar = serializer.data
            print(serialized_avatar)
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)
