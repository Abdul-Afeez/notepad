from django.contrib.auth.models import (AbstractBaseUser, BaseUserManager,
                                        PermissionsMixin)
from django.db import models
from django.utils import timezone
from django_mysql.models import Model, JSONField


class OwnerManager(BaseUserManager):
    """
    Implementing a usermanger to reimplement the user creation process
    """

    def create_owner(self, **kwargs):
        """
        A method to create a user with the passed in credentials
        """
        username = kwargs.get("username")
        password = kwargs.get("password")

        # validate the credentials entered
        if username is None:
            raise Exception('Username is required')

        if password is None:
            raise Exception('Password is required')

        existing_username = Owner.objects.filter(
            username=username
        ).first()

        if existing_username:
            raise Exception('Owner already exists')

        # create the owner
        new_owner = self.model(
            username=username
        )
        new_owner.set_password(password)
        new_owner.save()
        return new_owner

    def create_superuser(self, username, password):
        """
        A custom method to create a superuser
        """
        owner = self.create_user(username=username, password=password)
        owner.is_superuser = True
        owner.save()


PENDING = 'PENDING'
ACTIVE = 'ACTIVE'
IN_ACTIVE = 'IN_ACTIVE'


class Owner(Model, AbstractBaseUser):
    """
        A representation of how the note owner is stored
    """
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=100)
    meta = JSONField()
    verified_at = models.DateTimeField(null=True)
    date_created = models.DateTimeField(auto_now_add=True, null=True)
    last_updated = models.DateTimeField(auto_now=True, null=True)
    deleted_at = models.DateTimeField(null=True, blank=True)

    objects = OwnerManager()
    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.username

    def delete(self):
        self.deleted_at = timezone.now()
        self.save()

    def hard_delete(self):
        super().delete()



