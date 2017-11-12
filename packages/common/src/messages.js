module.exports = {
  // Server-emitted initial state to client when it connects
  INIT_CLIENT: 'INIT_CLIENT',

  // Server-emitted newly computed coefficients
  NEW_COEFFICIENTS: 'NEW_COEFFICIENTS',

  // Client-emitted upload of donuts
  NEW_DONUTS: 'NEW_DONUTS',

  // Client-emitted setting of 'submit mode'
  // Server-emitted value of 'submit mode' when changed
  SUBMIT_MODE: 'SUBMIT_MODE'
}
