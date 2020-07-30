FROM python:3.6-stretch

RUN apt-get update

ADD . /sibylapp
WORKDIR /sibylapp

RUN python -m pip install --upgrade pip
RUN make install
RUN cd sibyl && make install
