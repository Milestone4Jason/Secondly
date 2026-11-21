# eSIM Access integration (prototype)

Secondly has a server-side, read-only adapter scaffold for the eSIM Access Partner API.

## What is implemented

- HMAC-SHA256 request signing using the documented timestamp + request ID + access code + exact JSON body format.
- A read-only package catalogue request filtered to Italy (ISO country code `IT` by default).
- Input validation and sanitized provider errors.
- Automated tests with a mocked HTTP response. Tests do not contact eSIM Access.

The adapter is not connected to a public API route yet. This is intentional: provider credentials and catalogue access must remain server-side, and the app must not be able to trigger provider operations directly.

## Local configuration

1. Copy `backend/api/.env.example` to `backend/api/.env`.
2. Set `ESIM_ACCESS_CODE` and `ESIM_ACCESS_SECRET_KEY` in the local environment.
3. Keep the real `.env` file private. The repository ignores `.env* ` files except the example template.
4. Run the API tests with `npm test` from `backend/api`.

The current API starter does not load dotenv automatically. Set environment variables through your shell or hosting platform's secret manager.

## Important limitations

- This is a data-package catalogue adapter only. It does not place orders, spend provider funds, issue QR codes, or activate profiles.
- eSIM Access documents no sandbox environment. Do not run live tests or fund an account without an adult reviewing and approving the provider relationship and costs.
- Provider documentation describes data plans. It does not establish that an Italian +39 number or normal outbound voice calling is available. SMS support is profile/network dependent and the documented SMS endpoint sends messages to an eSIM; it is not proof of full two-way SMS service.
- Provider usage records can be delayed by hours, so they are not suitable as the sole real-time meter for Secondly's allowance enforcement.
- eSIM Access allows up to 8 API requests per second. Add centralized rate limiting before production use.
- No real telecom service is available from this prototype. A carrier agreement, legal review, privacy/security work, customer support, and appropriate adult-managed business arrangements are still required.

## Provider references

- API documentation: https://docs.esimaccess.com/
- Production API base URL: https://api.esimaccess.com
