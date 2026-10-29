/**
 * Deployment/build configuration.
 *
 * The lookbook is data-free: booking, payment, KYC, coastguard clearance,
 * and check-in happen in the Al Marsa app (https://almarsa.app/), so there
 * is no request endpoint and no analytics/telemetry integration here. If a
 * backend integration is ever added, it belongs behind a documented API —
 * never fabricated client-side.
 */
export const environment = {
  production: true,
};
