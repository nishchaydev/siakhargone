# Sanskar International Academy - Khargone

This project is a modern, responsive website for the Sanskar International Academy located in Khargone. It is built with Next.js and Firebase.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Quality checks

Run these before shipping changes:

```bash
npm run lint
npm run typecheck
npm run build
```

## Production debug API access

`/api/debug-headers` is blocked in production unless a debug key is provided.

Set `DEBUG_API_KEY` in the environment, then call with either:

1. Header: `x-debug-key: <DEBUG_API_KEY>`
2. Query string: `?key=<DEBUG_API_KEY>`

# siakhargone
