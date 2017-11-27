module.exports = {
  // Server-emitted initial state to client when it connects
  INIT_CLIENT: 'INIT_CLIENT',

  // Server-emitted newly computed regression results
  NEW_REGRESSION_RESULTS: 'NEW_REGRESSION_RESULTS',

  // Client-emitted upload of donuts
  UPLOAD_DONUTS: 'UPLOAD_DONUTS',

  // Server-emitted stream of all clients' donuts
  DONUT_FIREHOSE: 'DONUT_FIREHOSE',

  // Client-emitted setting of 'submit mode'
  // Server-emitted value of 'submit mode' when changed
  SUBMIT_MODE: 'SUBMIT_MODE',

  DONUT_FIREHOSE_SPRAY: 'DONUT_FIREHOSE_SPRAY',

  // Start spraying random donuts
  DONUT_FIREHOSE_SPRAY_ON: 'DONUT_FIREHOSE_SPRAY_ON',

  // Stop the spray
  DONUT_FIREHOSE_SPRAY_OFF: 'DONUT_FIREHOSE_SPRAY_OFF'
}
