from django.db import models
from django.utils.timezone import now
from django.core.validators import MaxValueValidator, MinValueValidator


class CarMake(models.Model):
    """Model representing a car manufacturer."""

    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        short_desc = self.description[:20]
        return f"{self.name} - {short_desc}..."


class CarModel(models.Model):
    """Model representing a specific car model."""

    car_make = models.ForeignKey(
        CarMake,
        on_delete=models.CASCADE,
        related_name="car_models",
    )

    dealer_id = models.IntegerField()
    name = models.CharField(max_length=100)

    CAR_TYPES = [
        ("SEDAN", "Sedan"),
        ("SUV", "SUV"),
        ("WAGON", "Wagon"),
        ("HATCH", "Hatchback"),
        ("COUPE", "Coupe"),
    ]

    type = models.CharField(
        max_length=10,
        choices=CAR_TYPES,
        default="SUV",
    )

    year = models.IntegerField(
        validators=[
            MaxValueValidator(now().year),
            MinValueValidator(1990),
        ]
    )

    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.car_make.name} {self.name} ({self.year})"
