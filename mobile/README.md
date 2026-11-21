# Secondly Mobile

Expo / React Native prototype for Android.

## Run locally

Requirements: Node.js 20.19.4+ and Android tooling.

```sh
cd mobile
npm install
npx expo start
```

## Android debug APK

Push changes under `mobile/` or update the Android workflow to trigger a GitHub Actions build. The workflow uploads a debug APK artifact.

## Prototype limitations

This is a UI preview only. It does not issue phone numbers, install eSIM profiles, connect to a mobile network, show real data usage, or pay ad rewards. Those features require a secure backend and authorized telecom/ad-provider integrations.
