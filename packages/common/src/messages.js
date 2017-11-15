module.exports = {
  // Server-emitted initial state to client when it connects
  INIT_CLIENT: 'INIT_CLIENT',

  // Server-emitted newly computed regression results
  NEW_REGRESSION_RESULTS: 'NEW_REGRESSION_RESULTS',

  // Client-emitted upload of donuts
  UPLOAD_DONUTS: 'UPLOAD_DONUTS',

  // Server-emitted stream of all clients' donuts
  ALL_DONUTS: 'ALL_DONUTS',

  // Client-emitted setting of 'submit mode'
  // Server-emitted value of 'submit mode' when changed
  SUBMIT_MODE: 'SUBMIT_MODE'
}
