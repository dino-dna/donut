from DonutLearner import DonutLearner
import numpy as np
import json
import os

# your pyenv/venv must be configured w/ the required packages.
# see the associated Dockerfile
dir_name = os.path.dirname(os.path.realpath(__file__))
donuts = json.load(open(os.path.join(dir_name, '../test/fixture/donuts.json')))

X = np.array(donuts['X'])
Y = np.array(donuts['Y'])
# res = DonutLearner.ridge_regression_with_sim_ann(X, Y)
res = DonutLearner.knn(X, Y)
print(res['score'])
