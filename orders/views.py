from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from core.database import SessionLocal
from orders.models import Order, OrderItem
from orders.serializers import OrderSerializer, OrderItemSerializer


@api_view(["GET", "POST"])
def orders(request):
    db = SessionLocal()
    try:
        if request.method == "GET":
            data = db.query(Order).all()
            return Response(OrderSerializer(data, many=True).data)
        elif request.method == "POST":
            serializer = OrderSerializer(data=request.data)
            if serializer.is_valid():
                obj = Order(**serializer.validated_data)
                db.add(obj)
                db.commit()
                db.refresh(obj)
                return Response(
                    OrderSerializer(obj).data, status=status.HTTP_201_CREATED
                )
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    finally:
        db.close()


@api_view(["GET", "POST"])
def order_items(request):
    db = SessionLocal()
    try:
        if request.method == "GET":
            data = db.query(OrderItem).all()
            return Response(OrderItemSerializer(data, many=True).data)
        elif request.method == "POST":
            serializer = OrderItemSerializer(data=request.data)
            if serializer.is_valid():
                obj = OrderItem(**serializer.validated_data)
                db.add(obj)
                db.commit()
                db.refresh(obj)
                return Response(
                    OrderItemSerializer(obj).data, status=status.HTTP_201_CREATED
                )
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    finally:
        db.close()
