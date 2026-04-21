from rest_framework import serializers


class OrderSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    user_id = serializers.IntegerField()
    status = serializers.CharField(max_length=50, default="pending")
    total_amount = serializers.FloatField(default=0.0)
    created_at = serializers.DateTimeField(read_only=True)


class OrderItemSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    order_id = serializers.IntegerField()
    product_id = serializers.IntegerField()
    quantity = serializers.IntegerField()
    unit_price = serializers.FloatField()
