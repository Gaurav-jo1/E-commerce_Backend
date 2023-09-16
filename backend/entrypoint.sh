#!/bin/sh
python manage.py wait_for_db
python manage.py makemigrations
python manage.py migrate --noinput
python manage.py load_data
python manage.py load_redis
python manage.py runserver 0.0.0.0:8000