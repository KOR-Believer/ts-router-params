# TanStack Router Params Issue Reproduction

This repository demonstrates a bug where route parameters are not correctly parsed during Client-Side Rendering (CSR) navigation when using "concrete" string paths.

## Issue Description

When navigating using `<Link to="/office/gangnam" />` (a concrete string path) instead of the typed routing `<Link to="/office/$placeId" params={{ placeId: 'gangnam' }} />`, TanStack Router fails to automatically parse the `$placeId` parameter from the URL in some scenarios during CSR.

### Key Observation
- **Expected Behavior**: Both navigation methods should result in `params.placeId` being correctly populated in the `loader` and `useParams()`.
- **Actual Bug**: Using a concrete string path sometimes results in missing or stale parameters during navigation.

## How to Reproduce

1. Install dependencies: `pnpm install`
2. Start the dev server: `npm run dev`
3. Click on the **Red links (concrete)** in the header.
4. Observe the "BUG DETECTED" warning on the page when the parameters fail to update.
5. Click on the **Blue links (params)** to see the correct behavior.
