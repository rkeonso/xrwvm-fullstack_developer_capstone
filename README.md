# coding-project-template

Car Dealeship reviews application

Overview 
This project is a full-stack car dealership review application developed as part of the IBM Full Stack Software Developer Capstone.

The application allows users to:

View a list of dealerships
View dealership details
Register and log in
Submit reviews for dealerships
View reviews associated with specific dealerships
Select vehicle make and model when posting a review

The frontend is built using React and the backend is built using Django.

User Authentication
 -User registration
 -User login
 -User logout
 -Session-based authentication

Dealership Management
 -Display dealership listings
 -Display dealership details
 -View dealership information

Review System
 -Submit dealership reviews
 -Store reviews in the database
 -Retrieve reviews by dealership
 -Display reviews on dealership pages

Vehicle Information
 -Vehicle make and model database
 -Dynamic vehicle dropdown selection
 -Vehicle year selection during review submission

Tech stack
 Frontend: React, React Router, JavaScript, HTML/CSS
 Backend: Django, SQlite
 Tools: Git, Github

Installation
 Frontend: cd frontend, npm install, npm start
 Backend: cd server, python manage.py migrate, python manage.py runserver

API Endpoints
 GET /djangoapp/dealers
 GET /djangoapp/dealer/<dealer_id>
 GET /djangoapp/get_cars
 GET /djangoapp/get_dealer_reviews/<dealer_id>
 POST /djangoapp/add_review

 Completed: Dealership listing, Dealership details, User authentication,Review submission, Review persistence, Vehicle dropdown integration

 Key Accomplishments
 During development, I implemented:
 Dynamic vehicle make/model dropdowns from backend data
- Review persistence using Django models and SQLite
- Review filtering by dealership
- React state management for dealership and review data
- REST API integration between React frontend and Django backend