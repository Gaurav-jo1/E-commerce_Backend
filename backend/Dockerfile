FROM python:3.12.0b2-alpine3.18

WORKDIR /app

COPY requirements.txt /app

RUN apk add --no-cache postgresql-dev gcc musl-dev python3-dev libffi-dev

RUN pip install -r requirements.txt --no-cache-dir

COPY . /app 

RUN python manage.py makemigrations

RUN python manage.py migrate

ENTRYPOINT ["python3"] 

EXPOSE 8000

CMD ["manage.py", "runserver", "0.0.0.0:8000"]