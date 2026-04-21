from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from core.database import SessionLocal
from users.models import User
from users.serializers import UserSerializer


@api_view(["GET"])
def get_users(request):
    db = SessionLocal()
    try:
        users = db.query(User).all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)
    finally:
        db.close()


@api_view(["POST"])
def create_user(request):
    db = SessionLocal()
    try:
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = User(
                name=serializer.validated_data["name"],
                email=serializer.validated_data["email"],
                password=serializer.validated_data["password"],  # hash this later
            )
            db.add(user)
            db.commit()
            db.refresh(user)
            return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    finally:
        db.close()
