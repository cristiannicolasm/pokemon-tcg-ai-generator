from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.
class CustomUser(AbstractUser):
    # Aquí se puede añadir campos adicionales de necesitarlos en el futuro, por ejemplo:
    # phone_number = models.CharField(max_length=15, blank=True, null=True)
    # birth_date = models.DateField(blank=True, null=True)

    # Usar email como campo de login principal (opcional, si quieres que el login sea por email)
    # Esto requiere que el email sea único
    # EMAIL_FIELD = "email"
    # REQUIRED_FIELDS = [] # Si se usa email como username, email no puede estar en REQUIRED_FIELDS

    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'

    def __str__(self):
        return self.email if self.email else self.username
