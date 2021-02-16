#!/bin/bash

python manage.py makemigrations --no-input
python manage.py migrate --no-input
python manage.py collectstatic --no-input

echo "$(cat entrypoint.py.txt)" | python manage.py shell

exec gunicorn -c "./gunicorn_config.py" core.wsgi
