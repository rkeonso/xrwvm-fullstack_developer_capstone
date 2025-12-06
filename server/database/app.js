var express = require('express');
var mongoose = require('mongoose');
var fs = require('fs');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();
var port = 3030;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var reviews_data = JSON.parse(fs.readFileSync("reviews.json", 'utf8'));
var dealerships_data = JSON.parse(fs.readFileSync("dealerships.json", 'utf8'));

mongoose.connect("mongodb://mongo_db:27017/", { dbName: 'dealershipsDB' });

var Reviews = require('./review');
var Dealerships = require('./dealership');

try {
    Reviews.deleteMany({}).then(function () {
        Reviews.insertMany(reviews_data.reviews);
    });

    Dealerships.deleteMany({}).then(function () {
        Dealerships.insertMany(dealerships_data.dealerships);
    });
} catch (error) {
    console.log("Startup DB insert error:", error);
}

// --------------------------- ROUTES ---------------------------

// Home route
app.get('/', function (req, res) {
    res.send("Welcome to the Mongoose API");
});

// Fetch all reviews
app.get('/fetchReviews', function (req, res) {
    Reviews.find().then(function (documents) {
        res.json(documents);
    }).catch(function () {
        res.status(500).json({ error: 'Error fetching documents' });
    });
});

// Fetch reviews by dealer ID
app.get('/fetchReviews/dealer/:id', function (req, res) {
    Reviews.find({ dealership: req.params.id })
        .then(function (documents) {
            res.json(documents);
        })
        .catch(function () {
            res.status(500).json({ error: 'Error fetching documents' });
        });
});

// Fetch all dealers
app.get('/fetchDealers', function (req, res) {
    Dealerships.find()
        .then(function (documents) {
            res.json(documents);
        })
        .catch(function () {
            res.status(500).json({ error: 'Error fetching dealerships' });
        });
});

// Fetch dealers by state
app.get('/fetchDealers/:state', function (req, res) {
    var state = (req.params.state || "").toUpperCase();

    Dealerships.find({ state: state })
        .then(function (documents) {
            res.json(documents);
        })
        .catch(function () {
            res.status(500).json({ error: 'Error fetching dealerships by state' });
        });
});

// Fetch dealer by ID
app.get('/fetchDealer/:id', function (req, res) {
    var id = req.params.id;

    Dealerships.findOne({ id: id })
        .then(function (document) {
            if (!document) {
                return res.status(404).json({ error: "Dealer not found" });
            }
            res.json(document);
        })
        .catch(function () {
            res.status(500).json({ error: 'Error fetching dealer' });
        });
});

// Insert review
app.post('/insert_review', express.raw({ type: '*/*' }), function (req, res) {
    var data = JSON.parse(req.body);

    Reviews.find().sort({ id: -1 }).then(function (documents) {
        var new_id = documents.length > 0 ? documents[0].id + 1 : 1;

        var review = new Reviews({
            id: new_id,
            name: data.name,
            dealership: data.dealership,
            review: data.review,
            purchase: data.purchase,
            purchase_date: data.purchase_date,
            car_make: data.car_make,
            car_model: data.car_model,
            car_year: data.car_year
        });

        review.save()
            .then(function (savedReview) {
                res.json(savedReview);
            })
            .catch(function (error) {
                console.log(error);
                res.status(500).json({ error: 'Error inserting review' });
            });

    }).catch(function () {
        res.status(500).json({ error: 'Error generating new review ID' });
    });
});

// Start server
app.listen(port, function () {
    console.log("Server is running on http://localhost:" + port);
});
