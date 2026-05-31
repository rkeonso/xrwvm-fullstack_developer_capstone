from django.urls import path
from . import views

urlpatterns = [
    path('dealers/', views.get_dealerships, name='get_dealerships'),
    path('dealer/<int:dealer_id>/', views.get_dealer_details, name='dealer_details'),
    path('dealers/<int:dealer_id>/reviews', views.get_dealer_reviews, name='get_dealer_reviews'),
    path('add_review', views.add_review, name='add_review'),
    path('register', views.registration, name='register'),
    path('get_cars', views.get_cars, name='get_cars'),
]