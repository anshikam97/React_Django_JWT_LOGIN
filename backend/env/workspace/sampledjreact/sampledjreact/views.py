from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView, ListAPIView, UpdateAPIView, RetrieveAPIView
from .serializers import UserProfileSerializer, UserSerializer, UserRegisterSerializer
from django.contrib.auth.models import User
from .models import UserProfile
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication 
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response

class UserList(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]


class UserProfileList(ListAPIView):
    serializer_class = UserProfileSerializer
    def get_queryset(self):
        ids = self.kwargs['pk']
        return UserProfile.objects.filter(user_id = ids)
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

class UserProfileUpdate(RetrieveAPIView, UpdateAPIView):
    serializer_class = UserProfileSerializer
    queryset = UserProfile.objects.all()
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

class UserRegister(CreateAPIView, ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegisterSerializer
