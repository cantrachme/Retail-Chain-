from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from core.database import SessionLocal
from inventory.models import Warehouse, Stock
from inventory.serializers import WarehouseSerializer, StockSerializer


@api_view(["GET", "POST"])
def warehouses(request):
    db = SessionLocal()
    try:
        if request.method == "GET":
            data = db.query(Warehouse).all()
            return Response(WarehouseSerializer(data, many=True).data)
        elif request.method == "POST":
            serializer = WarehouseSerializer(data=request.data)
            if serializer.is_valid():
                obj = Warehouse(**serializer.validated_data)
                db.add(obj)
                db.commit()
                db.refresh(obj)
                return Response(
                    WarehouseSerializer(obj).data, status=status.HTTP_201_CREATED
                )
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    finally:
        db.close()


@api_view(["GET", "POST"])
def stock(request):
    db = SessionLocal()
    try:
        if request.method == "GET":
            data = db.query(Stock).all()
            return Response(StockSerializer(data, many=True).data)
        elif request.method == "POST":
            serializer = StockSerializer(data=request.data)
            if serializer.is_valid():
                obj = Stock(**serializer.validated_data)
                db.add(obj)
                db.commit()
                db.refresh(obj)
                return Response(
                    StockSerializer(obj).data, status=status.HTTP_201_CREATED
                )
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    finally:
        db.close()
