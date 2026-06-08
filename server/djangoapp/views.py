# Uncomment the required imports before adding the code

# from django.shortcuts import render
from django.contrib.auth.models import User
# from django.shortcuts import get_object_or_404, render, redirect
from django.contrib.auth import logout
# from django.contrib import messages
# from datetime import datetime


from django.http import JsonResponse
from django.contrib.auth import login, authenticate
import logging
import requests
import json
from django.views.decorators.csrf import csrf_exempt
from .populate import initiate
from .models import CarMake, CarModel, Review
# from .restapis import get_request, analyze_review_sentiments, post_review


# Get an instance of a logger
logger = logging.getLogger(__name__)

# Create your views here.


# Create a `login_request` view to handle sign in request
@csrf_exempt
def login_user(request):
    # Get username and password from request.POST dictionary
    data = json.loads(request.body)
    username = data['userName']
    password = data['password']
    # Try to check if provide credential can be authenticated
    user = authenticate(username=username, password=password)
    data = {"userName": username}
    if user is not None:
        # If user is valid, call login method to login current user
        login(request, user)
        data = {"userName": username, "status": "Authenticated"}
    return JsonResponse(data)


# Create a `logout_request` view to handle sign out request
def logout_request(request):
    # try to log the user out
    logout(request)
    data = {"userName": ""}
    return JsonResponse(data)


# Create a `registration` view to handle sign up request
@csrf_exempt
def registration(request):
    data = json.loads(request.body)

    username = data['userName']
    password = data['password']
    first_name = data['firstName']
    last_name = data['lastName']
    email = data['email']

    username_exist = False

    try:
        User.objects.get(username=username)
        username_exist = True
    except Exception as err:
        logger.debug(f"{username} is a new user")

    if not username_exist:
        user = User.objects.create_user(
            username=username,
            first_name=first_name,
            last_name=last_name,
            password=password,
            email=email
        )

        login(request, user)

        return JsonResponse({
            "userName": username,
            "status": "Authenticated"
        })
    else:
        return JsonResponse({
            "userName": username,
            "status": "User already exists"
        })

def index(request):
    return JsonResponse({"message": "Django backend is running!"})


# get a list of cars
def get_cars(request):
    count = CarMake.objects.filter().count()
    print(count)
    if (count == 0):
        initiate()
    car_models = CarModel.objects.select_related('car_make')
    cars = []
    for car_model in car_models:
       cars.append({"CarModel": car_model.name,
                    "CarMake": car_model.car_make.name})
    return JsonResponse({"CarModels": cars})


# Update the `get_dealerships` render list of dealerships all by default,
# particular state if state is passed

def get_dealerships(request, state="All"):

    dealers = [
        {
            "id": 1,
            "full_name": "Best Cars",
            "city": "Dallas",
            "address": "123 Main St",
            "zip": "75001",
            "state": "TX"
        },
        {
            "id": 2,
            "full_name": "Auto World",
            "city": "Austin",
            "address": "456 Market St",
            "zip": "73301",
            "state": "TX"
        }
    ]

    return JsonResponse({
        "status": 200,
        "dealers": dealers
    })


def get_dealer_details(request, dealer_id):
    if dealer_id == 1:
        dealer = {
            "id": 1,
            "full_name": "Best Cars",
            "city": "Dallas",
            "state": "TX",
            "address": "123 Main St",
            "zip": "75001"
        }

    elif dealer_id == 2:
        dealer = {
            "id": 2,
            "full_name": "Auto World",
            "city": "Austin",
            "state": "TX",
            "address": "456 Market St",
            "zip": "73301"
        }

    else:
        return JsonResponse(
            {"status": 404, "error": "Dealer not found"},
            status=404
        )

    return JsonResponse({
        "status": 200,
        "dealer": dealer
    })


def get_dealer_reviews(request, dealer_id):

    reviews = Review.objects.filter(dealership=dealer_id)

    return JsonResponse({
        "status": 200,
        "reviews": list(reviews.values())
    })


def get_request(endpoint):
    url = "http://127.0.0.1:3030" + endpoint   # 👈 local mock API server

    try:
        response = requests.get(url)
        return response.json()
    except:
        return {"error": "Request failed"}


# Create a `add_review` view to submit a review
def add_review(request):
    if request.method == "POST":
        data = json.loads(request.body)

        review = Review.objects.create(
            name=data["name"],
            dealership=data["dealership"],
            review=data["review"],
            purchase=data["purchase"],
            purchase_date=data["purchase_date"],
            car_make=data["car_make"],
            car_model=data["car_model"],
            car_year=data["car_year"]
        )

        return JsonResponse({
            "status": 200,
            "message": "Review added successfully"
        })
    return JsonResponse({
        "status": 400,
        "message": "Invalid request"
    })


def get_dealers(request):
    dealers = [
        {
            "id": 1,
            "name": "Best Cars",
            "city": "Dallas"
        },
        {
            "id": 2,
            "name": "Auto World",
            "city": "Austin"
        }
    ]

    return JsonResponse(dealers, safe=False)
