#!/bin/bash

python manage.py makemigrations --no-input
python manage.py migrate --no-input
python manage.py collectstatic --no-input

echo "from django.contrib.auth import get_user_model; User = get_user_model(); User.objects.create_superuser('asiamarket676@mail.ru', '82738899')" | python manage.py shell

#gunicorn config.wsgi:application --bind 0.0.0.0:8000
exec gunicorn -c "/app/production/gunicorn/gunicorn_config.py" core.wsgi

