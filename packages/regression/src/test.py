from DonutLearner import DonutLearner
import numpy as np

X = np.array([
  [0, 0, 4.9],
  [0, 2.5, 5],
  [3, 2.5, 5],
  [4, 2.5, 5],
  [4, 5, 5],
])
Y = np.array([
  0,
  0.9,
  0.99,
  0.9,
  0
])
reg = DonutLearner.ridge_regression(X, Y)
print reg