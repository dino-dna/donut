from DonutLearner import DonutLearner
import numpy as np
import json
import os

dir_name = os.path.dirname(os.path.realpath(__file__))
donuts = json.load(open(os.path.join(dir_name, '../test/fixture/donuts.json')))

X = np.array(donuts['X'])
Y = np.array(donuts['Y'])
res = DonutLearner.ridge_regression_with_sim_ann(X, Y)
print(res)
