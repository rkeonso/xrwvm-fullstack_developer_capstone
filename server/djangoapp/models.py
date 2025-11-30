# Uncomment the following imports before adding the Model code

from django.db import models
from django.utils.timezone import now
from django.core.validators import MaxValueValidator, MinValueValidator


# Create your models here.
class CarMake(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
 
    def __str__(self):
        return f"{self.name} - {self.description[:20]}..."


class CarModel(models.Model):
    # Many-to-one relationship to CarMake
    car_make = models.ForeignKey(CarMake, on_delete=models.CASCADE)

    
    dealer_id = models.IntegerField()

    # Model name
    name = models.CharField(max_length=100)

    
    CAR_TYPES = [
        ('SEDAN', 'Sedan'),
        ('SUV', 'SUV'),
        ('WAGON', 'Wagon'),
        ('HATCH', 'Hatchback'),
        ('COUPE', 'Coupe'),
    ]
    type = models.CharField(max_length=10, choices=CAR_TYPES, default='SUV')

   
    year = models.IntegerField(
        validators=[
            MaxValueValidator(2025),
            MinValueValidator(1990)
        ]
    )

    
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.car_make.name} {self.name} ({self.year})"

