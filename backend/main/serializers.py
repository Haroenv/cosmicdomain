from rest_framework import serializers
from .models import Domain


class DomainsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Domain
        fields = '__all__'
