"""Notepad URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from Notepad.views import apiOverview, register, owners, add_note, notes, delete_note, update_note

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', apiOverview),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/register/', register, name='Creates note owner'),
    path('api/add_note/', add_note, name='Add new note'),
    path('api/owners/', owners, name='Creates note owner'),
    path('api/notes/', notes, name='Shows list of notes created by an owner'),
    path('api/delete_note/<str:note_id>', delete_note, name='Delete a single note'),
    path('api/update_note/<str:note_id>', update_note, name='Update a single note'),
]
