import os
import redis
import random

# Django
from django.contrib.auth.models import User
from django.db import IntegrityError
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.shortcuts import get_object_or_404

# Rest Framework
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from rest_framework import permissions
from django.contrib.auth import authenticate
from .serializers import UserCredentialsSerializer, UserNewSerializer
from django.conf import settings

redis_url = os.environ.get("Redis_Server")

if redis_url:
    redis_domain = "redis://shoppy-redis.onrender.com:6379"
    redis_connnection = redis.StrictRedis.from_url(redis_domain)
else:
    redis_connnection = redis.Redis(host="redis", port=6379, db=0)
 

class UserLoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        # Log in a user with either username or email and password.
        try:
            # Validate input data using serializer (Assuming you have defined a serializer named UserLoginSerializer)
            serializer = UserCredentialsSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)

            username = serializer.validated_data.get("username")
            email = serializer.validated_data.get("email")
            password = serializer.validated_data.get("password")

            # Attempt to authenticate the user
            if username and password:
                user = authenticate(username=username, password=password)
            elif email and password:
                try:
                    user = User.objects.get(email=email)
                    user = authenticate(username=user.username, password=password)
                except User.DoesNotExist:
                    user = None
            else:
                return Response(
                    {"error": "Missing credentials"}, status=status.HTTP_400_BAD_REQUEST
                )

            # Check if user is authenticated and generate tokens
            if user is not None:
                refresh = RefreshToken.for_user(user)
                return Response(
                    {"refresh": str(refresh), "access": str(refresh.access_token)},
                    status=status.HTTP_200_OK,
                )
            else:
                return Response(
                    {"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST
                )
        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, format=None):
        try:
            serializer = UserCredentialsSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)

            username = serializer.validated_data.get("username")
            email = serializer.validated_data.get("email")
            password = serializer.validated_data.get("password")

            # Check if all required information is present
            if username and email and password:
                # Check if a user with the same email address already exists
                username_exists = User.objects.filter(username=username).first()
                user_email_exists = User.objects.filter(email=email).first()

                if user_email_exists:
                    # If a user with this email and username already exists, return an error message
                    return Response(
                        {"error": "User with this Email already exists"},
                        status=status.HTTP_400_BAD_REQUEST,
                    )

                elif username_exists:
                    return Response(
                        {"error": "User with this Username already exists"},
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
            else:
                return Response(
                    {"error": "Missing credentials "},
                    status=status.HTTP_400_BAD_REQUEST,
                )
        except ValueError:
            # If a ValueError is raised, return an error response with a 401 status code
            return Response(status=401)


class ResetPassword(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, format=None):
        try:
            user_email = request.data.get("user_email")
        except AttributeError:
            return Response(
                {"error": "Missing User Email"}, status=status.HTTP_404_NOT_FOUND
            )

        try:
            random_number = random.randint(100000, 999999)
            random_number_str = str(random_number)

            # Email Content
            first_three_numbers, last_three_numbers = (
                random_number_str[:3],
                random_number_str[-3:],
            )
            html_message = render_to_string(
                "email_template.html",
                {
                    "code1": first_three_numbers,
                    "code2": last_three_numbers,
                    "code": random_number_str,
                },
            )
            email_message = f"Here is your recovery code {random_number} for {user_email} \n The code is valid for only 1 hour"

            # Check if a user with the email address already exists
            email_exists = get_object_or_404(User, email=user_email)

            cache_key = f"user_variable_{email_exists.id}"

            self.add_code_to_redis(cache_key, random_number_str)

            send_mail(
                subject="Shoppy recovery code",
                message=email_message,
                from_email="Shoppy Code <{}>".format(os.environ.get("EMAIL_HOST_USER")),
                recipient_list=[user_email],
                html_message=html_message,
            )

            return Response({"user_id": email_exists.id}, status.HTTP_200_OK)

        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def add_code_to_redis(self, cache_key, random_number_str):
        r = redis_connnection
        if r.exists(cache_key):
            r.delete(cache_key)
            r.set(cache_key, random_number_str)
            r.expire(cache_key, 3600)
        else:
            r.set(cache_key, random_number_str)
            r.expire(cache_key, 3600)


class ResetcodeCheck(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        try:
            user_id = request.data.get("user_id")
            user_code = request.data.get("user_code")
        except AttributeError:
            return Response(
                {"error": "Missing product"}, status=status.HTTP_404_NOT_FOUND
            )

        try:
            cache_key = f"user_variable_{user_id}"
            correct_code = self.get_code_from_redis(cache_key)

            if correct_code is not None:
                # Check if the code user sent is valid or not
                if user_code == correct_code.decode("utf-8"):
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

    def get_code_from_redis(self, cache_key):
        r = redis_connnection
        return r.get(cache_key)


class UserNewPassword(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        try:
            serializer = UserNewSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)

            user_id = serializer.validated_data.get("user_id")
            user_email = serializer.validated_data.get("user_email")
            user_code = serializer.validated_data.get("user_code")
            user_new_password = serializer.validated_data.get("user_new_password")
            user_reEnter_password = serializer.validated_data.get(
                "user_reEnter_password"
            )

        except (KeyError, AttributeError) as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        cache_key = f"user_variable_{user_id}"
        correct_code = self.get_code_from_redis(cache_key)

        try:
            # Check if a user with the same email address already exists
            user_email_exists = get_object_or_404(User, email=user_email)

            if user_new_password != user_reEnter_password:
                return Response(
                    {"error": "Passwords do not match"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            if user_code != correct_code.decode("utf-8"):
                return Response(
                    {"error": "Invalid code"},
                    status=status.HTTP_401_UNAUTHORIZED,
                )

            user_email_exists.set_password(user_new_password)
            user_email_exists.save()

            return Response(
                {"Success": "User successfuly changed the password"},
                status.HTTP_200_OK,
            )

        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def get_code_from_redis(self, cache_key):
        r = redis_connnection
        return r.get(cache_key)
