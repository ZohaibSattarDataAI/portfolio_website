from django.urls import path
from . import views

urlpatterns = [

    path('blog/', views.blog_list, name='blog_list'),        # Blog list page
    path('<slug:slug>/', views.blog_detail, name='blog_detail'),  # Single blog page
    path('', views.home, name='Home'),

]