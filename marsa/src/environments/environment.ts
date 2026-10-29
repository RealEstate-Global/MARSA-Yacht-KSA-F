/**
 * Deployment/build configuration.
 *
 * `requestEndpoint` must point at the backend that receives service and
 * provisions-directory requests (expects `POST` with a JSON payload).
 *
 * When it is empty (as shipped), the app intentionally reports an honest
 * "submission unavailable" error instead of pretending the request was
 * delivered. See issue #33 for the rationale.
 */
export const environment = {
  production: true,
  requestEndpoint: '',
};
