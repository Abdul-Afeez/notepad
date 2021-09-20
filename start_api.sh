#!/bin/bash

export LC_ALL=C.UTF-8
export LANG=C.UTF-8


python3 manage.py collectstatic --noinput

echo "<<<<<<<< Database Setup and Migrations Starts >>>>>>>>>"

# Run database migrations
python3 manage.py makemigrations && python3 manage.py migrate

# Adding crontabs
python3 manage.py crontab add

# wait for three seconds
echo "<<<<<<<<<<<<<<<<<<<< START API >>>>>>>>>>>>>>>>>>>>>>>>"
sleep 3

# Start the API
gunicorn --workers 5 -t 300 Notepad.wsgi -b 0.0.0.0:8000 --access-logfile '-' --reload
