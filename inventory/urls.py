from django.urls import path
from . import views

urlpatterns = [
    path("warehouses/", views.warehouses, name="warehouses"),
    path("stock/", views.stock, name="stock"),
]
