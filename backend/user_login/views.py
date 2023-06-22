import os
import random
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from django.db import IntegrityError
from rest_framework import status
from django.core.exceptions import ObjectDoesNotExist
from django.core.mail import send_mail
from django.core.cache import cache

# Create your views here.


class ResetPassword(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, format=None):
        try:
            user_email = request.data.get("user_email")
            random_number = random.randint(100000, 999999)
            random_number_str = str(random_number)
            email_message = f"Here is your recovery code {random_number} for {user_email} \n The code is valid for only 1 hour"

            # Check if email information is present
            if user_email:
                # Check if a user with the same email address already exists
                email_exists = User.objects.filter(email=user_email).first()

                if email_exists:
                    cache_key = f"user_variable_{email_exists.id}"
                    if cache.has_key(cache_key):
                        cache.delete(cache_key)
                        cache.set(cache_key, random_number_str, 3600)
                    else:
                        cache.set(cache_key, random_number_str, 3600)

                    send_mail(
                        subject="Shoppy recovery code",
                        message=email_message,
                        from_email=os.environ.get("EMAIL_HOST_USER"),
                        recipient_list=[user_email],
                    )

                    return Response({"user_id": email_exists.id}, status.HTTP_200_OK)

                else:
                    return Response(
                        {"error": "User with this email does not exist"},
                        status=status.HTTP_404_NOT_FOUND,
                    )

            else:
                return Response(
                    {"error": "Missing user_email field"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class ResetcodeCheck(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        try:
            user_id = request.data.get("user_id")
            user_code = request.data.get("user_code")
            cache_key = f"user_variable_{user_id}"
            correct_code = cache.get(cache_key)

            if correct_code is not None:
                # Check if the code user sent is valid or not
                if user_code == correct_code:
                    # cache.delete(cache_key)
                    return Response(
                        {"Success": "User Has successfuly mathced the code"},
                        status.HTTP_200_OK,
                    )
                else:
                    return Response(
                        {"error": "Invalid code"}, status=status.HTTP_401_UNAUTHORIZED
                    )
            else:
                return Response(
                    {"error": "Code not found"}, status=status.HTTP_404_NOT_FOUND
                )

        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class UserNewPassword(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        user_id = request.data.get("user_id")
        user_email = request.data.get("user_email")
        user_code = request.data.get("user_code")
        cache_key = f"user_variable_{user_id}"
        user_new_password = request.data.get("user_new_password")
        user_reEnter_password = request.data.get("user_reEnter_password")
        correct_code = cache.get(cache_key)

        if user_id and user_email and user_code:
            try:
                # Check if a user with the same email address already exists
                user_email_exists = User.objects.filter(email=user_email).first()

                if user_email_exists:
                    if (
                        user_new_password == user_reEnter_password
                        and user_code == correct_code
                    ):
                        user_email_exists.set_password(user_new_password)
                        user_email_exists.save()

                        return Response(
                            {"Success": "User successfuly changed the password"},
                            status.HTTP_200_OK,
                        )
                    else:
                        return Response(
                            {"error": "Invalid code or passwords do not match"},
                            status=status.HTTP_401_UNAUTHORIZED,
                        )
            except ObjectDoesNotExist:
                return Response(
                    {"error": "User with the given email does not exist"},
                    status=status.HTTP_404_NOT_FOUND,
                )
        else:
            return Response(
                {"error": "Missing required parameters"},
                status=status.HTTP_400_BAD_REQUEST,
            )


class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, format=None):
        # Extract user information from the request data
        username = request.data.get("username")
        email = request.data.get("email")
        password = request.data.get("password")

        try:
            # Check if all required information is present
            if username and email and password:
                # Check if a user with the same email address already exists
                user_exists = User.objects.filter(email=email).first()

                if user_exists:
                    # If a user with this email already exists, return an error message
                    return Response(
                        {"error": "User with this credential already exists"},
                        status=status.HTTP_400_BAD_REQUEST,
                    )
                else:
                    # If the user does not already exist, create a new user and generate access and refresh tokens
                    user = User.objects.create_user(
                        username, email=email, password=password
                    )

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
                        return Response(
                            {
                                "refresh": str(refresh),
                                "access": str(refresh.access_token),
                            },
                            status.HTTP_200_OK,
                        )

        except ValueError:
            # If a ValueError is raised, return an error response with a 401 status code
            return Response(status=401)
