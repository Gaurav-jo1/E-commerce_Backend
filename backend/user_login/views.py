from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from django.db import IntegrityError
from rest_framework import status



class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, format=None):

        # Extract user information from the request data
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')

        try:
            # Check if all required information is present
            if username and email  and password:

                # Check if a user with the same email address already exists
                user_exists = User.objects.filter(email=email).first()

                if user_exists:

                    # If a user with this email already exists, return an error message
                    return Response({"error": "A user with this credential already exists"}, status=status.HTTP_400_BAD_REQUEST)
                else:

                    # If the user does not already exist, create a new user and generate access and refresh tokens
                    user = User.objects.create_user(username, email=email, password=password)
                    
                    try:
                        user.save()
                    except IntegrityError as e:

                        # If an IntegrityError is raised, handle it by printing an error message
                        print(f"Error saving user: {e}")
                    else:
                        # If the save operation completes successfully, refresh the user's information
                        user.refresh_from_db()
                        # Generate refresh and access tokens for the new user
                        refresh = RefreshToken.for_user(user)
                        return Response({'refresh': str(refresh), 'access': str(refresh.access_token)},status.HTTP_200_OK)

        except ValueError:
            # If a ValueError is raised, return an error response with a 401 status code
            return Response(status=401)


# from django.core.mail import send_mail
# import os
# import random

# Create your views here.
# class ResetPassword(APIView):
#     permission_classes = [permissions.AllowAny]

#     def get(self, request,format=None):
#         user_email = request.data.get("user_email")
#         random_number = random.randint(100000, 999999)
#         print("Local: ", random_number)
#         email_message = f"Here is your recovery code {random_number} for {user_email}" 
        
#         # Check if email information is present
#         if user_email:

#             # Check if a user with the same email address already exists
#             email_exists = User.objects.filter(email=user_email).first()

#             if email_exists:
#                 send_mail(
#                     subject="Shoppy recovery code",
#                     message=email_message,
#                     from_email= os.environ.get('EMAIL_HOST_USER'),
#                     recipient_list=[user_email])
                
#                 return Response(status.HTTP_200_OK)
            
#             else:
#                 return Response({"error": "A user with this credential does not exists"}, status=status.HTTP_400_BAD_REQUEST)
            
#         else:
#             return Response(status=status.HTTP_401_BAD_REQUEST)