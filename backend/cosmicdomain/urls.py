from django.contrib import admin
from django.urls import path, include
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.contrib.staticfiles.urls import static
from cosmicdomain import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('main.urls')),
    # path('', include('main.urls')),
    # path('domains/<slug>/', DomainDetailView.as_view(), name='domain-detail'),
]

urlpatterns += staticfiles_urlpatterns()
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)