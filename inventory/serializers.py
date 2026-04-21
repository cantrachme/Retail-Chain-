from rest_framework import serializers


class WarehouseSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=150)
    location = serializers.CharField(max_length=300, required=False, allow_blank=True)
    created_at = serializers.DateTimeField(read_only=True)


class StockSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    product_id = serializers.IntegerField()
    warehouse_id = serializers.IntegerField()
    quantity = serializers.IntegerField()
    updated_at = serializers.DateTimeField(read_only=True)
