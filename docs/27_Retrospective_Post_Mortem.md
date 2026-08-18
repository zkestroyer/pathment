---
id: doc-27
title: Retrospective Post Mortem
status: draft
version: 1.0.0
project_name: Eshop
---

# 27. Retrospective & Post Mortem

## 1. Executive Summary
- **Sprint Goal:** Deploy backend API and frontend SPA to Vercel, integrate Tailwind v4, and establish basic functional flows for the Eshop multi-vendor platform.
- **Outcome:** Successfully deployed. Both frontend and backend are communicating correctly.
- **Key Challenges:** Vercel deployment folder mappings, Tailwind v4 breaking changes, and a Mongoose async hook bug crashing the database seeding and user auth.

## 2. What Went Well
- **Decoupled Architecture:** Having separate Frontend and Backend directories allowed us to isolate the Vercel 500 error quickly without affecting the frontend build process.
- **Swarm Coordination:** The God Mode Swarm was able to rapidly pivot from setting up the scaffolding to debugging live production logs (`injected env (0) from config/.env`).
- **Tailwind Migration:** Upgrading to Tailwind v4 via the `@tailwindcss/vite` plugin and preserving legacy tokens using `@config` saved massive amounts of time compared to rewriting the design system.

## 3. What Went Wrong (Root Cause Analysis)
- **Deployment Oversights:** We did not instruct the user to configure Vercel environment variables immediately upon deployment, resulting in the Stripe SDK crashing the Node runtime during boot (`FUNCTION_INVOCATION_FAILED`).
- **Empty Database:** The frontend was successfully deployed but showed no products because the MongoDB cluster was completely empty. We lacked an initial data seeding strategy for UAT testing.
- **Mongoose Bug:** In newer versions of Mongoose (v6+), passing the `next` callback to `async` pre-save hooks and calling it causes `TypeError: next is not a function`. This crashed our seeding script and would have broken the auth endpoints in production.

## 4. Action Items & Lessons Learned
1. **Always Seed Data:** Before handing off a frontend to UAT or the client, ensure a database seeding script (`seed.js`) is run so the application does not look "empty" or "broken".
2. **Vercel Env Variables:** Document Vercel environment variable setup *before* the first deployment push to avoid the classic 500 boot crash.
3. **Mongoose Modernization:** Ensure all Mongoose async hooks omit the `next` parameter to align with Mongoose v6+ native Promise handling.

## 5. Next Sprint Focus
- Finalize Stripe Checkout flows with the frontend `Cart.jsx`.
- Build the Seller Dashboard for shop owners to manage products directly via the UI.
- Implement comprehensive e2e tests using QAHub.
