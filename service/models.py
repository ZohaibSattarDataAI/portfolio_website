# service/models.py

from django.db import models
from django.contrib.auth.models import User

class Blog(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    short_description = models.TextField()
    content = models.TextField()
    is_published = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    # Picture field
    picture = models.ImageField(upload_to='blog_images/', null=True, blank=True)

    # Category field
    category = models.CharField(max_length=100, null=True, blank=True)  # ✅

    def __str__(self):
        return self.title




#Model to Setup Email on Contact us page 


class Contact(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=200)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


#Certification uploading model
from django.db import models

class Certification(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to='certifications/')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

