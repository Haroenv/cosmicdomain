from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import ugettext_lazy as _


# Create your models here.


class Industry(models.Model):
    name = models.CharField(max_length=300)

    def __str__(self):
        return self.name


class Domain(models.Model):
    name = models.CharField(max_length=120)
    price = models.CharField(max_length=120)

    industry = models.ForeignKey(
        Industry,
        verbose_name=_("Industry"),
        related_name="domain",
        on_delete=models.DO_NOTHING,
        null=True,
        blank=True)

    def _str_(self):
        return self.name
