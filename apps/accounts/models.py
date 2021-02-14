from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.db import models
from django.urls import reverse_lazy

from . import managers


class User(AbstractBaseUser, PermissionsMixin):
    """Custom User model for authentication"""
    objects = managers.UserManager()

    referral_of = models.ForeignKey('self',
                                    on_delete=models.CASCADE,
                                    related_name="referrals",
                                    null=True,
                                    blank=True, verbose_name='Реферал пользователя')
    full_name = models.CharField(max_length=255, verbose_name='Ф.И.О.')
    iin = models.CharField(max_length=255, unique=True, verbose_name='ИИН')
    email = models.EmailField(max_length=255, unique=True, verbose_name='Почта')
    phone = models.CharField(max_length=255, verbose_name='Телефон')
    balance = models.PositiveIntegerField(default=0, verbose_name='Баланс')

    is_staff = models.BooleanField(default=False)

    # No longer need in usernames, email is enough to login
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []  # Email & Password are required by default.

    def get_full_name(self):
        """Returns full name of user"""
        return self.full_name

    @property
    def referral_link(self):
        return reverse_lazy('signup-as-referral', kwargs={"pk": self.id})

    @property
    def referrals_number(self):
        return len(self.referrals.all())

    def __str__(self):
        """What to display in admin panel"""
        return self.get_username()

    def has_perm(self, perm, obj=None):
        """Does the user have a specific permission?"""
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        """Does the user have permissions to view the app `app_label`?"""
        # Simplest possible answer: Yes, always
        return True
