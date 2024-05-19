from django.urls import include, path
from django.http import JsonResponse
from rest_framework import routers
from .views import compare_texts
def happy(request):
    return JsonResponse({"Test":1})
urlpatterns = [
    path('core/', compare_texts, name='compare-texts'),
    path("", happy)
]