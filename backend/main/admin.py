from django.contrib import admin
from .models import Domain, Industry


# Register your models here.

class DomainAdmin(admin.ModelAdmin):
    list_display = ('name', 'industry')


class IndustryAdmin(admin.ModelAdmin):
    display = 'name'


admin.site.register(Domain, DomainAdmin)

admin.site.register(Industry, IndustryAdmin)
