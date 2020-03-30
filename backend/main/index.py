from algoliasearch_django import AlgoliaIndex
from algoliasearch_django.decorators import register

from .models import Domain


@register(Domain)
class DomainIndex(AlgoliaIndex):
    fields = ('name', 'price', 'industry', 'thumbnail_image')
    settings = {
        'searchableAttributes': ['name', 'price', 'industry'],
        'attributesForFaceting': [
            'industry',
        ]
    }
    index_name = 'dev_NAME'
