from rest_framework import serializers
from django.contrib.auth import get_user_model, password_validation
from django.core.exceptions import ValidationError
from django.contrib.auth.hashers import make_password

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    password_confirmation = serializers.CharField(write_only=True)
    def validate(self, data):
        print('data ->', data)
        password = data.pop('password')
        password_confirmation = data.pop('password_confirmation')
        if password != password_confirmation:
            raise ValidationError({ 'password_confirmation': 'Does not match password' })
        try:
            password_validation.validate_password(password)
        except ValidationError as error:
            print(error)
            raise ValidationError({ 'password': 'Invalid password' })
        data['password'] = make_password(password)
        return data

    class Meta:
        model = User
        fields = ("id", "email", "username", "profile_image", "stats", "description", "password", "password_confirmation")