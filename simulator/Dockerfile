FROM python:3.12

WORKDIR /usr/simulator

COPY ./* .

RUN pip3 install -r ./requirements.txt

ENTRYPOINT ["python", "./simulator.py"]