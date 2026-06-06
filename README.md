# Car Dealeship Reviews Application

# Overview 
This project is a full-stack car dealership review application developed as part of the **IBM Full Stack Software Developer Capstone**.

The application allows users to:
* View a list of dealerships
* View dealership details
* Register and log in
* Submit reviews for dealerships
* View reviews associated with specific dealerships
* Select vehicle make and model when posting a review

The frontend is built using **React** and the backend is built using **Django**.

---

## Features 

### User Authentication
* User registration
* User login
* User logout
* Session-based authentication

### Dealership Management
* Display dealership listings
* Display dealership details
* View dealership information

### Review System
* Submit dealership reviews
* Store reviews in the database
* Retrieve reviews by dealership
* Display reviews on dealership pages

### Vehicle Information
* Vehicle make and model database
* Dynamic vehicle dropdown selection
* Vehicle year selection during review submission

## Tech stack
* **Frontend**: React, React Router, JavaScript, HTML/CSS
* **Backend**: Django, SQlite
* **Tools**: Git, Github

## Installation
### Frontend
''' bash
 cd frontend 
 npm install
 npm start
 '''

 ### Backend
 ''' bash
 cd server
python manage.py migrate
python manage.py runserver
'''

## API Endpoints
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/djangoapp/dealers` | Fetch all dealers |
| **GET** | `/djangoapp/dealer/<dealer_id>` | Fetch specific dealer details |
| **GET** | `/djangoapp/get_cars` | Fetch vehicle list |
| **GET** | `/djangoapp/get_dealer_reviews/<dealer_id>` | Fetch reviews for a dealer |
| **POST** | `/djangoapp/add_review` | Submit a new review |

### Completed Features
* [x] Dealership listing & details
* [x] User authentication
* [x] Review submission & persistence
* [x] Vehicle dropdown integration

 ## Key Accomplishments
 During development, I implemented:
 Dynamic vehicle make/model dropdowns from backend data
- Review persistence using Django models and SQLite
- Review filtering by dealership
- React state management for dealership and review data
- REST API integration between React frontend and Django backend