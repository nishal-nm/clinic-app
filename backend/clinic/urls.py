from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('users/login/', views.login_user),
    path('users/me/', views.get_user_profile),
    
    path('doctors/', views.doctor_list),
    path('appointments/', views.appointments_view),
]
    