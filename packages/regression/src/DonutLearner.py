import sys
import json
from sklearn import linear_model
import numpy as np
from scipy.optimize import basinhopping
from sklearn.preprocessing import PolynomialFeatures
from sklearn.pipeline import make_pipeline

class DonutLearner:

  @staticmethod
  def ridge_regression_with_sim_ann(X, Y):
    # reg = linear_model.Ridge().fit(X, Y)
    model = make_pipeline(PolynomialFeatures(4), linear_model.Ridge())
    reg = model.fit(X, Y)
    def explore(x):
      all_zero_plus = np.all(x >= 0)
      all_one_or_under = np.all(x <= 1)
      if all_one_or_under and all_zero_plus:
        return -1 * reg.predict([x])
      return 0
    return basinhopping(explore, X[0], niter=1000)


  @staticmethod
  def from_stdin():
    sys.stderr.write('Reading input\n')
    request = json.load(sys.stdin)
    response = {}
    for learner in request['learners']:
      X = request['X']
      sys.stderr.write(f'Execing learner ({len(X)} records): {learner}\n')
      reg = getattr(DonutLearner, learner)(X, request['Y'])
      response[learner] = list(reg.x)
    sys.stderr.write('writing response\n')
    sys.stdout.write(json.dumps(response))

if __name__ == "__main__":
  sys.stderr.write('Launching DonutLearner\n')
  DonutLearner.from_stdin()
