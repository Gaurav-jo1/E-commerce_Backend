from rest_framework import serializers

class UserCredentialsSerializer(serializers.Serializer):
    username = serializers.CharField(required=False)
    email = serializers.EmailField(required=False)
    password = serializers.CharField(required=True)

class UserNewSerializer(serializers.Serializer):
    user_id = serializers.CharField(required=False)
    user_email = serializers.EmailField(required=False)
    user_code = serializers.CharField()
    user_new_password = serializers.CharField(required=True)
    user_reEnter_password = serializers.CharField(required=True)