FROM python:3.6.2
RUN pip install -U numpy scipy scikit-learn
RUN mkdir -p /app
COPY src/DonutLearner.py /app/DonutLearner.py
WORKDIR /app
CMD ["python", "DonutLearner.py"]
