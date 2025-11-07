from django.urls import path
from . import views

urlpatterns = [
    path('recommend/', views.recommend, name='recommend'),
    path('save_user/', views.save_user, name='save_user'),
]

