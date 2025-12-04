#Uncomment the imports before you add the code
from django.urls import path
from django.conf.urls.static import static
from django.conf import settings
from . import views
from django.views.generic import TemplateView

app_name = 'djangoapp'

urlpatterns = [
    # React login page
    path('login/', TemplateView.as_view(template_name="index.html"), name='login_page'),

    # Django login POST endpoint
    path('login', views.login_user, name='login'),
    path('logout', views.logout_request, name='logout'),
    path('register', views.registration, name='registration'),
    path(route='get_cars', view=views.get_cars, name ='getcars'),
    path(route='get_dealers/', view=views.get_dealerships, name='get_dealers'),
    path(route='get_dealers/<str:state>', view=views.get_dealerships, name='get_dealers_by_state'),
    path('dealer/<int:dealer_id>/', views.get_dealer_details, name='dealer_details'),
    path('dealer/<int:dealer_id>/reviews/', views.get_dealer_reviews, name='dealer_reviews'),
    path(route='add_review', view=views.add_review, name='add_review'),





] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
