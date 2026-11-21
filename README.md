# Secondly

**The first free eSIM with a phone number.**

Secondly is a planned mobile connectivity service. The initial concept is an Italian service with real +39 mobile numbers, eSIM activation, and a free data allowance.

## Planned product

| Feature | Target |
|---|---:|
| Secondly Free data | 5 GB every 5 weeks |
| Rewarded ads | 100 MB per verified ad |
| Daily ad limit | 10 ads (up to 1 GB/day) |
| Founder allowance | 20 GB/day |
| Phone number | Real Italian +39 mobile number |
| Price | €0 for the free plan |

These are product goals, not currently active telecom services. Real numbers, mobile data, calls, SMS and eSIM profiles depend on a suitable network/eSIM provider, commercial agreements and applicable legal requirements.

## Project structure

- `docs/` — product and technical planning
- `backend/api/` — initial API service
- `mobile/` — Expo / React Native Android app prototype
- `.github/workflows/` — automated checks

## Development

Requirements: Node.js 24 or newer.

Run the API:

```sh
cd backend/api
npm install
npm run dev
```

Health check: `GET /health`

Plan definitions: `GET /api/v1/plans`

## Important

- No live eSIM profiles or phone numbers are issued by this repository.
- Ad rewards must be verified server-side before any data balance is credited.
- Founder privileges must be assigned server-side; never trust a role or allowance supplied by the app.
- Never commit passwords, API keys, provider credentials, customer identity documents, phone numbers, or eSIM activation codes.

Secondly is currently an early-stage software project. Telecom launch requires appropriate adult-led legal and commercial arrangements, provider integration, privacy/security controls and operational funding.
