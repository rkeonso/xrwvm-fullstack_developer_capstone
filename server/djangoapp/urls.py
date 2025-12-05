# Django app URL configuration

from django.urls import path
from . import views

urlpatterns = [
    path(
        'get_dealers/',
        views.get_dealerships,
        name='get_dealers'
    ),

    path(
        'get_dealers/<str:state>/',
        views.get_dealerships_by_state,
        name='get_dealers_by_state'
    ),

    path(
        'get_reviews/<int:dealer_id>/',
        views.get_reviews,
        name='get_reviews'
    ),

    path(
        'add_review/',
        views.add_review,
        name='add_review'
    ),
]
