from django.urls import path

from . import views

urlpatterns = [
    path("", views.PersonalAreaView.as_view(), name='personal-area'),
    path("signup/", views.SignUpView.as_view(), name='signup'),
    path("<str:pk>/signup/", views.SignUpAsReferralView.as_view(), name='signup-as-referral'),
    path("login/", views.LoginView.as_view(), name='login'),
    path("logout/", views.LogoutView.as_view(), name='logout'),
]
