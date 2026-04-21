from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from core.database import SessionLocal
from deliveries.models import Delivery
from deliveries.serializers import DeliverySerializer


@api_view(["GET", "POST"])
def deliveries(request):
    db = SessionLocal()
    try:
        if request.method == "GET":
            data = db.query(Delivery).all()
            return Response(DeliverySerializer(data, many=True).data)
        elif request.method == "POST":
            serializer = DeliverySerializer(data=request.data)
            if serializer.is_valid():
                obj = Delivery(**serializer.validated_data)
                db.add(obj)
                db.commit()
                db.refresh(obj)
                return Response(
                    DeliverySerializer(obj).data, status=status.HTTP_201_CREATED
                )
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    finally:
        db.close()
