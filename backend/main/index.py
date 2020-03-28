from algoliasearch_django import AlgoliaIndex
from algoliasearch_django.decorators import register

from .models import Domain


@register(Domain)
class DomainIndex(AlgoliaIndex):
    fields = ('name', 'price', 'industry')
    settings = {
        'searchableAttributes': ['name', 'price', 'industry'],
        'attributesForFaceting': [
            'industry',
            'price',
        ],
        'ranking': [
            'asc(price)',
            'desc(price)'
        ]
    }
    index_name = 'dev_NAME'
