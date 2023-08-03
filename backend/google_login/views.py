import os
from rest_framework.decorators import APIView
from rest_framework import status
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from google.oauth2 import id_token
from django.contrib.auth.models import User
from google.auth.transport import requests
from django.contrib.auth.models import User
from django.db import IntegrityError
from jwt.exceptions import InvalidTokenError


# Create your views here.

class GoogleLogin(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        user_token = request.data.get('id_token')

        if not user_token:
            return Response({'error': 'id_token is required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Verify the ID token using the Google API
            CLIENT_ID = os.environ.get('GOOGLE_CLIENT_ID')
            idinfo = id_token.verify_oauth2_token(user_token, requests.Request(), CLIENT_ID)
            # Extract the user info from the user token
            email = idinfo['email']
            name = idinfo['name']

            if email and name:

                user_exists = User.objects.filter(email=email).first()

                if user_exists:
                    # Generate a JWT token using the user ID
                    refresh = RefreshToken.for_user(user_exists)

                    return Response({'refresh': str(refresh), 'access': str(refresh.access_token)})
                else:
                    # User with this email does not exist, create a new user and generate access and refresh tokens
                    user = User.objects.create_user(name, email=email, password=None)
                    user.name = name
                    try:
                        user.save()
                    except IntegrityError as e:
                        return Response({"error": f"Error saving user: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                    else:
                        # The save operation completed successfully
                        user.refresh_from_db()
                        # Continue with the rest of the program here
                        refresh = RefreshToken.for_user(user)
                        return Response({'refresh': str(refresh), 'access': str(refresh.access_token)})
            
            else:
                return Response({"error": "Email and Name not found in id_token"}, status=status.HTTP_400_BAD_REQUEST)

        except InvalidTokenError:
            return Response({"error": "Invalid Token"}, status=status.HTTP_401_UNAUTHORIZED)