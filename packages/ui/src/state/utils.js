/**
 * Make a request to the donut-monster.
 *
 * @returns {Promise}
 */
export const makeRequest = (method = 'GET') => fetch(
  'http://localhost:3001/is-submit-mode',
  { method }
)
  .then(response => {
    if (!response.ok) {
      throw new Error(`Status: ${response.status}, Message: ${response.statusText}`);
    }

    return response.json();
  });
