from django.urls import include, path
from rest_framework import routers
from . import views

# router = routers.DefaultRouter()
# router.register(r'domains', views.DomainsViewSet)

urlpatterns = [
    path('', views.DomainList.as_view()),
    path('<slug>/', views.DomainDetail.as_view()),
    # path('', include(router.urls)),
    # path('domains-list', views.DomainsView.as_view(), name='domains-list'),
    # path('industries-list', views.IndustriesView.as_view(), name='industries-list'),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
