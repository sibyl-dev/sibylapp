FROM python:3.6.11-buster

RUN apt-get update

ADD . /sibylapp
WORKDIR /sibylapp
RUN cd sibyl && python -m pip install --upgrade pip && pip install .
RUN cd ..
RUN pip install .

