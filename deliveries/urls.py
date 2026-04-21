from django.urls import path
from . import views

urlpatterns = [
    path("deliveries/", views.deliveries, name="deliveries"),
]
