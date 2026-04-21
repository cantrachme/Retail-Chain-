from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from core.database import SessionLocal
from products.models import Category, Product
from products.serializers import CategorySerializer, ProductSerializer


@api_view(["GET", "POST"])
def categories(request):
    db = SessionLocal()
    try:
        if request.method == "GET":
            data = db.query(Category).all()
            return Response(CategorySerializer(data, many=True).data)
        elif request.method == "POST":
            serializer = CategorySerializer(data=request.data)
            if serializer.is_valid():
                obj = Category(**serializer.validated_data)
                db.add(obj)
                db.commit()
                db.refresh(obj)
                return Response(
                    CategorySerializer(obj).data, status=status.HTTP_201_CREATED
                )
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    finally:
        db.close()


@api_view(["GET", "POST"])
def products(request):
    db = SessionLocal()
    try:
        if request.method == "GET":
            data = db.query(Product).all()
            return Response(ProductSerializer(data, many=True).data)
        elif request.method == "POST":
            serializer = ProductSerializer(data=request.data)
            if serializer.is_valid():
                obj = Product(**serializer.validated_data)
                db.add(obj)
                db.commit()
                db.refresh(obj)
                return Response(
                    ProductSerializer(obj).data, status=status.HTTP_201_CREATED
                )
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    finally:
        db.close()
