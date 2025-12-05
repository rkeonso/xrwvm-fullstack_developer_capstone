from django.http import JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth import login, logout, authenticate
import json
from django.views.decorators.csrf import csrf_exempt
from .models import CarMake, CarModel
from .populate import initiate
from .restapis import get_request, analyze_review_sentiments, post_review


@csrf_exempt
def login_user(request):
    """Handle user login."""
    data = json.loads(request.body)
    username = data["userName"]
    password = data["password"]
    user = authenticate(username=username, password=password)
    response_data = {"userName": username}

    if user is not None:
        login(request, user)
        response_data["status"] = "Authenticated"

    return JsonResponse(response_data)


def logout_request(request):
    """Handle user logout."""
    logout(request)
    return JsonResponse({"userName": ""})


@csrf_exempt
def registration(request):
    """Handle user registration."""
    data = json.loads(request.body)
    username = data.get("userName")
    password = data.get("password")
    first_name = data.get("firstName")
    last_name = data.get("lastName")
    email = data.get("email")

    if not User.objects.filter(username=username).exists():
        user = User.objects.create_user(
            username=username,
            password=password,
            first_name=first_name,
            last_name=last_name,
            email=email,
        )
        login(request, user)
        return JsonResponse({"userName": username, "status": "Authenticated"})
    return JsonResponse({"userName": username, "error": "Already Registered"})


def get_cars(request):
    """Return list of cars."""
    if CarMake.objects.count() == 0:
        initiate()
    car_models = CarModel.objects.select_related("car_make")
    cars = [
        {"CarModel": cm.name, "CarMake": cm.car_make.name} for cm in car_models
    ]
    return JsonResponse({"CarModels": cars})


def get_dealerships(request, state="All"):
    """Return dealerships for a state or all."""
    endpoint = "/fetchDealers" if state == "All" else f"/fetchDealers/{state}"
    dealerships = get_request(endpoint)
    return JsonResponse({"status": 200, "dealers": dealerships})


def get_dealer_reviews(request, dealer_id):
    """Return reviews for a dealer with sentiment."""
    if not dealer_id:
        return JsonResponse({"status": 400, "message": "Bad Request"})

    endpoint = f"/fetchReviews/dealer/{dealer_id}"
    reviews = get_request(endpoint) or []
    for review in reviews:
        sentiment = analyze_review_sentiments(review["review"])
        review["sentiment"] = sentiment.get("sentiment", "neutral")
    return JsonResponse({"status": 200, "reviews": reviews})


def get_dealer_details(request, dealer_id):
    """Return details of a dealer."""
    if not dealer_id:
        return JsonResponse({"status": 400, "message": "Bad Request"})
    endpoint = f"/fetchDealer/{dealer_id}"
    dealer = get_request(endpoint)
    return JsonResponse({"status": 200, "dealer": dealer})


def add_review(request):
    """Add a review if user is authenticated."""
    if request.user.is_anonymous:
        return JsonResponse({"status": 403, "message": "Unauthorized"})

    data = json.loads(request.body)
    try:
        _ = post_review(data)
        return JsonResponse({"status": 200})
    except Exception:
        return JsonResponse(
            {"status": 401, "message": "Error in posting review"}
        )
