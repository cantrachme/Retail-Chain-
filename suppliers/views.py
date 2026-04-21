from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from core.database import SessionLocal
from suppliers.models import Supplier
from suppliers.serializers import SupplierSerializer


@api_view(["GET", "POST"])
def suppliers(request):
    db = SessionLocal()
    try:
        if request.method == "GET":
            data = db.query(Supplier).all()
            return Response(SupplierSerializer(data, many=True).data)
        elif request.method == "POST":
            serializer = SupplierSerializer(data=request.data)
            if serializer.is_valid():
                obj = Supplier(**serializer.validated_data)
                db.add(obj)
                db.commit()
                db.refresh(obj)
                return Response(
                    SupplierSerializer(obj).data, status=status.HTTP_201_CREATED
                )
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    finally:
        db.close()
