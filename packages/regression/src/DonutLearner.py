import json
import os
import sys
import numpy as np
from scipy.optimize import differential_evolution
from sklearn import linear_model
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import PolynomialFeatures
from sklearn.neighbors import KNeighborsRegressor


def log(msg):
  if os.getenv('DEBUG') is not None:
    sys.stderr.write(f'donut:py_regression: {msg}\n')

class DonutLearner:

  @staticmethod
  def knn(X, Y):
    neigh = KNeighborsRegressor()
    neigh.fit(X, Y)
    def explore(x):
      score = -1 * neigh.predict([x])
      return score
    minimized = differential_evolution(explore, ((0, 1), (0, 1), (0, 1), (0, 1), (0, 1)))
    return {
      'X_min': list(minimized.x),
      'score': neigh.score(X, Y)
    }

  @staticmethod
  def ridge_regression_with_sim_ann(X, Y):
    model = make_pipeline(PolynomialFeatures(2), linear_model.Ridge())
    reg = model.fit(X, Y)
    def explore(x):
      score = -1 * reg.predict([x])
      return score
    minimized = differential_evolution(explore, ((0, 1), (0, 1), (0, 1), (0, 1), (0, 1)))
    return {
      'X_min': list(minimized.x),
      'score': reg.score(X, Y)
    }


  @staticmethod
  def from_stdin():
    log('reading input')
    data = ""
    for line in sys.stdin:
      data += line
      try:
        request = json.loads(data)
        break
      except:
        pass

    log('input read complete')
    response = {}
    for learner in request['learners']:
      X = request['X']
      log(f'execing learner ({len(X)} records): {learner}')
      reg = getattr(DonutLearner, learner)(X, request['Y'])
      response[learner] = reg
    log('writing response')
    print(json.dumps(response)) # send to stdout for parsing


if __name__ == "__main__":
  log('Launching DonutLearner')
  DonutLearner.from_stdin()
  log('complete.')
  exit(0)
