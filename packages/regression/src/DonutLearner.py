import json
import numpy as np
import os
import sys
from scipy.optimize import differential_evolution
from sklearn import linear_model
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import PolynomialFeatures


def log(msg):
  sys.stderr.write(f'donut:py_regression: {msg}\n')

class DonutLearner:

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
    request = json.load(sys.stdin)
    response = {}
    for learner in request['learners']:
      X = request['X']
      log(f'execing learner ({len(X)} records): {learner}')
      reg = getattr(DonutLearner, learner)(X, request['Y'])
      response[learner] = reg
    log('writing response')
    print(json.dumps(response)) # send to stdout for parsing

if __name__ == "__main__":
  if os.getenv('DEBUG'):
    dir_name = os.path.dirname(os.path.realpath(__file__))
    donuts = json.load(open(os.path.join(dir_name, '../test/fixture/donuts.json')))

    X = np.array(donuts['X'])
    Y = np.array(donuts['Y'])
    for i in range(0, len(X), 1):
      if i < 2: continue
      res = DonutLearner.ridge_regression_with_sim_ann(X[0:i], Y[0:i])
      r2 = res['score']
      predicted_max_inputs = res['minimized'].x
      predicted_rating = -1 * res['minimized'].fun[0]
      print(f'donut count: {str(len(X[0:i]))} r2: {"%.2f" % r2} predicted_rating: {"%.2f" % predicted_rating} using inputs:', predicted_max_inputs)
  else:
    sys.stderr.write('Launching DonutLearner\n')
    DonutLearner.from_stdin()
