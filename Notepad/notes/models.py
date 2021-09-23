from django.db import models
from django_mysql.models import Model, JSONField


# Create your models here.
from Notepad.owners.models import Owner


class Note(Model):
    id = models.AutoField(primary_key=True)
    owner = models.ForeignKey(Owner, on_delete=models.PROTECT)
    content = models.CharField(max_length=180)
    date_created = models.DateTimeField(auto_now_add=True, null=True)
    last_updated = models.DateTimeField(auto_now=True, null=True)
