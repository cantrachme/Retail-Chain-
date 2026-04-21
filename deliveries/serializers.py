from rest_framework import serializers


class DeliverySerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    order_id = serializers.IntegerField()
    supplier_id = serializers.IntegerField(required=False, allow_null=True)
    status = serializers.CharField(max_length=50, default="processing")
    estimated_delivery = serializers.DateTimeField(required=False, allow_null=True)
    created_at = serializers.DateTimeField(read_only=True)
