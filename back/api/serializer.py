from rest_framework import serializers
from .models import Patrimonio
from django.contrib.auth.models import User

class PatrimonioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patrimonio
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password']
        )
        return user