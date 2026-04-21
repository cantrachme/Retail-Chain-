from django.urls import path
from . import views

urlpatterns = [
    path("orders/", views.orders, name="orders"),
    path("order-items/", views.order_items, name="order_items"),
]
