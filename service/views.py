from django.shortcuts import render, get_object_or_404,redirect
from .models import Blog
from django.core.mail import send_mail
from django.conf import settings
from .forms import ContactForm
from django.contrib import messages
from .models import Certification
# =========================
# BLOG VIEWS
# =========================

def blog_list(request):
    blogs = Blog.objects.filter(is_published=True).order_by('-created_at')
    return render(request, 'blog.html', {'blogs': blogs})


def blog_detail(request, slug):
    blog = get_object_or_404(Blog, slug=slug, is_published=True)
    return render(request, 'blog_detail.html', {'blog': blog})



def home(request):
    certifications = Certification.objects.all()

    return render(request, 'home.html', {
        'certifications': certifications
    })





