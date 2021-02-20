FROM python:3.8.3-slim-buster

RUN pip3 install --upgrade pip

WORKDIR /app

ENV FLASK_APP app.py
ENV FLASK_RUN_HOST 0.0.0.0

COPY . /app

RUN pip3 --no-cache-dir install -r requirements.txt

CMD ["python3", "src/app.py"]