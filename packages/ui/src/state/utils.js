/**
 * Make a request to the donut-monster.
 *
 * @returns {Promise}
 */
export const makeRequest = ({
  data,
  method = 'GET',
  endpoint,
}) => fetch(
  `http://localhost:3001/${endpoint}`,
  {
    body: data ? JSON.stringify(data) : null,
    method,
  }
)
  .then(response => {
    if (!response.ok) {
      throw new Error(`Status: ${response.status}, Message: ${response.statusText}`);
    }

    return response.json();
  });
