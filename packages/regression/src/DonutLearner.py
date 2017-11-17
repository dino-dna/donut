import json
import numpy as np
import os
import sys
from scipy.optimize import basinhopping, brute, differential_evolution, fmin
from sklearn import linear_model
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import PolynomialFeatures


def log(msg):
  sys.stderr.write(f'{msg}\n')

class DonutLearner:

  @staticmethod
  def ridge_regression_with_sim_ann(X, Y):
    # model = linear_model.LinearRegression()
    # model = linear_model.RidgeCV()
    # .fit(X, Y)
    model = make_pipeline(PolynomialFeatures(2), linear_model.Ridge())
    reg = model.fit(X, Y)
    def explore(x):
      score = -1 * reg.predict([x])
      return score
    minimized = differential_evolution(explore, ((0, 1), (0, 1), (0, 1), (0, 1), (0, 1)))
    return {
      'minimized': minimized,
      'score': reg.score(X, Y)
    }
    # return fmin(explore, X[0])
    #   cost_raw = (x-4)
    # if   x >= 1.0: cost_overrun = (1000*(x-1))**8
    # elif x <= 0.0: cost_overrun = (1000*(-x))**8
    # else: cost_overrun = 0.0
    #   all_zero_plus = np.all(x_new >= 0)
    #   all_one_or_under = np.all(x_new <= 1)
    #   log(f'basinhop: {score}')
    # def accept_test(f_new, x_new, f_old, x_old):
    #   all_zero_plus = np.all(x_new >= 0)
    #   all_one_or_under = np.all(x_new <= 1)
    #   will_accept = True if all_one_or_under and all_zero_plus else False
    #   log(f'{"accepting step" if will_accept else "reject_step"}: {", ".join(["%.2f" % s for s in list(x_new)])}')
    #   return will_accept
    # return basinhopping(explore, [0.5, 0.5, 0.5, 0.5, 0.5], niter=100, T=2, stepsize=0.3, accept_test=accept_test)
    # rranges = tuple([slice(0, 1, 0.2) for i in range(0, 5)])
    # return brute(explore, rranges , Ns=10, finish=fmin)

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
