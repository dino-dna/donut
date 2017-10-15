FROM python:3.6.3
RUN pip install -U numpy scipy scikit-learn
RUN mkdir -p /app
COPY src/DonutLearner.py /app/DonutLearner.py
COPY src/test.json /app/test.json
WORKDIR /app
CMD ["python", "DonutLearner.py"]
