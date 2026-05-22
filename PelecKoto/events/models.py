from django.db import models


class EventRegistration(models.Model):
    full_name = models.CharField(max_length=255)
    email = models.EmailField(max_length=254)
    age = models.PositiveIntegerField()
    # NOTE: This quiz stores the password directly as a field.
    # In real applications, always hash passwords.
    password = models.CharField(max_length=255)

    def __str__(self) -> str:
        return f"{self.full_name} ({self.email})"

