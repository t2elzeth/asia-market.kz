from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import Group

from . import models


class UserAdmin(BaseUserAdmin):
    ordering = ('is_staff',)

    list_display = (
        'email',
    )

    list_filter = (
        'is_staff', 'referral_of'
    )

    readonly_fields = (
        'id', 'is_superuser'
    )

    fieldsets = (
        (None, {
            'fields': (
                'id', 'referral_of', 'full_name',
                'email', 'phone',
                'iin', 'balance',
                'is_superuser', 'is_staff',
            )
        }),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2'),
        }),
    )


admin.site.register(models.User, UserAdmin)

admin.site.unregister(Group)
