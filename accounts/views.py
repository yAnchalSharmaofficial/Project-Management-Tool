from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken

@api_view(['POST'])
def register(request):
    email = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
        return Response({"error": "Email and password required"}, status=400)

    if User.objects.filter(email=email).exists():
        return Response({"error": "User already exists"}, status=400)

    # username required in Django → use email as username
    user = User.objects.create_user(
        username=email,
        email=email,
        password=password
    )

    return Response({"message": "User created"}, status=201)


@api_view(['POST'])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')

    user = authenticate(username=email, password=password)

    if not user:
        return Response({"error": "Invalid credentials"}, status=401)

    refresh = RefreshToken.for_user(user)

    return Response({
        "access": str(refresh.access_token),
        "refresh": str(refresh)
    })