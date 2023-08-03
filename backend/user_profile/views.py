from django.shortcuts import get_object_or_404

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework import status

from .serializers import UserProfileSerializer
from .models import UserProfile

# Create your views here.
class UserProfileView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        try:
            user = request.user
        except AttributeError:
            return Response({"error": "Missing product"}, status=status.HTTP_404_NOT_FOUND)
        
        try:
            user_info = get_object_or_404(UserProfile, user=user.id)
            serializer = UserProfileSerializer(user_info)
            return Response(serializer.data,status=status.HTTP_200_OK)
        except Exception as e:
            # Return error response for any other exceptions
            return Response({"error": "Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
