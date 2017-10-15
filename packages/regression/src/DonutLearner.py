import sys
import json
from sklearn import linear_model
import numpy as np

class DonutLearner:
  @staticmethod
  def linear_regression(donuts):
    reg = linear_model.LinearRegression()
    return reg.fit(X, Y)

  @staticmethod
  def ridge_regression(X, Y):
    reg = linear_model.Ridge()
    return reg.fit(X, Y)

  @staticmethod
  def from_stdin():
    sys.stderr.write('Reading input\n')
    request = json.load(sys.stdin)
    response = {}
    for learner in request['learners']:
      sys.stderr.write('Execing learner: %s\n' % learner)
      reg = getattr(DonutLearner, learner)(request['X'], request['Y'])
      response[learner] = reg.coef_.tolist()
    sys.stderr.write('writing resonse\n')
    sys.stdout.write(json.dumps(response))

if __name__ == "__main__":
  sys.stderr.write('Launching DonutLearner\n')
  DonutLearner.from_stdin()
