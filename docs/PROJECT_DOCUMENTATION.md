## Completionist Project Documentation

### Overview
- **Platform**: React Native (iOS & Android) with React 19.
- **State management**: Redux Toolkit with feature-specific slices, async persistence hooks, and migration toward an `auth`-centric session slice.
- **Networking**: Axios instance (`authInterceptor`) that attaches auth headers, logs, and error handling; endpoints defined in `src/data/api`.
- **Caching**: `AsyncStorage` for hydrated game data and `react-native-keychain` for credentials.

---

## Dependencies & Usage

### Runtime Dependencies
| Package | Purpose / Usage |
| --- | --- |
| @apollo/client | GraphQL client (future-proofing for remote content). |
| @babel/polyfill | Polyfills missing JS features in older runtimes. |
| @babel/preset-typescript | Allows Babel to transpile `.ts/.tsx` files alongside Metro. |
| @gorhom/bottom-sheet | UI bottom sheets for modals/filters. |
| @react-native-async-storage/async-storage | Persistent key-value storage (user cache, content cache). |
| @react-native-community/checkbox | Native checkbox component used in settings/forms. |
| @react-native-google-signin/google-signin | Google OAuth for signup/login. |
| @react-native/babel-preset | React Native default Babel preset. |
| @react-native/polyfills | Adds RN-specific polyfills (URL, base64, etc.). |
| @react-navigation/drawer | Drawer navigator for authenticated shell. |
| @react-navigation/native | Core navigation primitives. |
| @react-navigation/native-stack | Native-stack navigator for auth/onboarding flows. |
| @react-navigation/stack | Fallback stack navigation (legacy screens). |
| @reduxjs/toolkit | Redux store, slices, middleware helpers. |
| @stripe/stripe-react-native | Payments / in-app purchases. |
| axios | REST client for Completionist API + Steam API. |
| axios-cache-interceptor | Lightweight response caching for idempotent calls. |
| axios-mock-adapter | Testing mocks for API interactions. |
| glob | Utility for locale generation scripts. |
| graphql | Needed by Apollo (even if not yet invoked). |
| i18next | Internationalization engine. |
| i18next-browser-languagedetector | Detects language for web / RN web. |
| i18next-http-backend | Loads translation bundles over HTTP. |
| jest-react-native | Jest presets for RN testing. |
| lodash | Utility helpers (deep clone, grouping, etc.). |
| lottie-react-native | Animated splash and onboarding assets. |
| moment | Date/time formatting for achievements/progress. |
| react | Core UI library. |
| react-dom | Required for Jest + React 19 typings. |
| react-i18next | React bindings for `i18next`. |
| react-native | Host runtime. |
| react-native-config | Loads `.env` values (API URLs, keys). |
| react-native-dotenv | Babel plugin to inline env vars. |
| react-native-gesture-handler | Required by React Navigation gestures. |
| react-native-keychain | Secure storage for auth token + userId. |
| react-native-localize | Detects locale/timezone for translations. |
| react-native-reanimated | Animations for drawers, sheets. |
| react-native-safe-area-context | Safe area padding on iOS/Android. |
| react-native-screens | Native navigation performance (screen container). |
| react-native-uuid | Generates UUIDs for new accounts/requests. |
| react-native-vector-icons | Icon glyphs across UI. |
| react-native-webview | Embedded Steam/sign-in web flows. |
| react-native-worklets | Advanced animation hooks (if needed). |
| react-redux | React bindings for Redux + hooks. |
| redux-logger | Debug logging middleware during development. |
| styled-components | Theming/styling across RN components. |
| ts-jest | Enables TypeScript + Jest integration. |
| ts-node | Allows running TS scripts (locale generation, etc.). |

### Dev Dependencies
| Package | Purpose / Usage |
| --- | --- |
| @babel/core | Required for custom Babel transforms. |
| @babel/node | Executes Node scripts with Babel transpilation. |
| @babel/plugin-transform-private-methods | Supports TS private fields in Metro. |
| @babel/preset-env | Targets JS features for tooling scripts. |
| @babel/runtime | Helper runtime for Babel output. |
| @react-native-community/cli | RN CLI (init, linking, etc.). |
| @react-native/eslint-config | Baseline ESLint rules tuned for RN. |
| @react-native/metro-config | Metro bundler configuration helpers. |
| @testing-library/react-native | Component testing utilities. |
| @tsconfig/react-native | Shared tsconfig defaults. |
| @types/* packages | Type definitions for Jest, lodash, RN icons, React, etc. |
| babel-jest | Jest transformer for Babel. |
| babel-plugin-module-resolver | Absolute/alias imports (`@redux/*`). |
| babel-plugin-styled-components | Better debugging + SSR hints for styled-components. |
| babel-preset-env | Legacy preset (used by scripts). |
| eslint | Linting engine. |
| jest | Test runner. |
| prettier | Code formatter. |
| typescript | Type system. |
| typescript-plugin-styled-components | Auto-complete & type hints for styled components. |

---

## State Management
- **Store setup**: `src/redux/store.ts` uses Redux Toolkit’s `configureStore`, wiring feature reducers (`main`, `login`, `settings`, `content`, and the new `auth` slice). Middleware disables serializable checks (plan: re-enable once non-serializable values are removed) and plugs in optional `redux-logger` during development.
- **Slices**:
  - `auth`: Holds authenticated `user`, tokens, and session flags. Hooks (`useAuthUser`, `useAuthActions`) guard access and trigger logout when the `user` reference disappears.
  - `main`: Global UI/application state—current screen, selected game, splash visibility, search, and `shouldUpdateUser` dirty flag controlling background sync.
  - `login`: Tracks login form data, verification token, Google sign-in mode, and onboarding gating.
  - `settings`: Lightweight slice storing the settings screen dropdown selection (planned migration to local component state).
  - `content`: Stores currently selected content section, search term, category filter, async game content payload, and WebView hrefs.
- **Hooks**:
  - `useMainState` / `useMainDispatch`, `useLoginState` etc. wrap `useSelector`/`useDispatch` to keep view code minimal and typed.
  - `useInitUserData` watches `AppState` changes; when the app becomes active it rehydrates the auth user from cache if necessary and pushes pending updates when backgrounding.
  - `useRemoveUserData` centralizes logout (clears Redux slices, AsyncStorage cache, Keychain credentials, and resets navigation state).
- **Persistence**:
  - `AsyncStorage`: caches `User` records and game data snapshots with timestamps to avoid re-fetching on cold start.
  - `Keychain`: stores `{ username: userId, password: token }` for silent re-auth.
  - Planned `redux-persist` integration will replace manual cache hydration to provide automatic store rehydration and fewer “optional user” checks.

---

## API Reference
- **Base URL**: `baseUrl` set via `IOS_LOCAL_URL` / `ANDROID_LOCAL_URL` in `.env` (see `src/data/api/urls.ts`). Every endpoint is accessed as `${baseUrl}/<path>`.
- **Client**: `authInterceptor` wraps Axios, adds auth headers, stores refresh tokens, logs success/failure, and centralizes error handling via `handleAxiosError`.

### Authentication Endpoints
| Endpoint | Method | Path | Description |
| --- | --- | --- | --- |
| `checkUserExists` | POST | `/api/exists` | Returns `{ regular: boolean, google: boolean }`, enabling flows for linking accounts or showing “email not found”. |
| `signUp` | POST | `/api/signup` | Creates a new user (generates UUID if missing), seeds signup flags and settings, returns `User`. |
| `signIn` | POST | `/api/signin` | Authenticates via email/pw or Google ID, returns `User` + token (token stored in Keychain through interceptor). |
| `linkAndSignIn` | PATCH | `/api/link` | Links existing credentials (password ↔︎ Google) and signs the user in. |
| `sendVerificationEmail` | POST | `/send_email/verify` | Sends onboarding or link-account verification emails. |
| `forgotPw` | PATCH | `/api/reset` | Resets password for a provided email. |

### User & Account
| Endpoint | Method | Path | Description |
| --- | --- | --- | --- |
| `getUserByUserId` | GET | `/users/id/:userId` | Fetches latest `User` profile, used when rehydrating from cache. |
| `updateUser` | PATCH | `/users/update/:userId` | Persists username, email, Steam ID, account/signup/settings, and `gameData`. Called when dirty flags are set. |
| `changePw` | PATCH | `/users/update/pw/:userId` | Changes password given old/new pair. |
| `sendEmail` | POST | `/send_email/send` | Sends support/request emails (prefills body). |
| `deleteUser` | DELETE | `/users/delete/:userId` | Removes the account. |

### Game Data & Progress
| Endpoint | Method | Path | Description |
| --- | --- | --- | --- |
| `getGameData` | GET | `/game_data/get?game=<id>&lang=<lang>` | Retrieves quests/collectables/locations/misc lists for a game in a specific language. Results cached per game+lang. |

### Steam Integrations
| Endpoint | Method | Path | Description |
| --- | --- | --- | --- |
| `getSteamUserById` | GET | `/steam/profile?steamId=<id>` | Returns Steam profile metadata for linking. |
| `getSteamPlayerAchievements` | GET | `/steam/achievements?steamId=<id>&gameId=<id>` | Returns `achievements`, `hasPermission`, and locked counts. Handles permission errors gracefully. |
| `steamAchievementsByIdUrl` | GET | Steam Web API | Direct schema lookups against Valve’s API using API key. |

### Payments
| Endpoint | Method | Path | Description |
| --- | --- | --- | --- |
| `createPayment` | POST | `/payment/create/:userId` | Creates Stripe payment intents for unlocking game tiers (amount + game payload). |

---

## Workflow Notes
- **Cache strategy**: `saveToCache`/`fetchUserFromCache` wrap AsyncStorage writes with timestamps, enabling expiry-based invalidation. `useLoadUserFromCache` first checks Keychain for credentials, then hydrates from cache or remote.
- **Dirty flag**: `main.shouldUpdateUser` flips to `true` whenever quest/location completion arrays change; backgrounding triggers `updateUser` to persist progress.
- **Navigation guard**: `useAuthUser` hook ensures authenticated screens always have a `User`. If the user becomes `null`, the hook dispatches logout + navigation reset.

---

## Suggested .gitignore Additions
- `docs/*.md` if internal-only docs shouldn’t ship (optional).
- `*.env.local`, `.env.production`, `.env.staging` (cover multiple env files).
- `.vscode/` (editor settings).
- `yarn.lock` *or* `package-lock.json` (currently ignoring `package-lock.json`; decide on one package manager and ignore the other’s lockfile).
- `android/app/build/`, `ios/build/` (platform-specific build outputs if not already covered by `build/` rule).
- `coverage/` already ignored, but consider `reports/` or `artifacts/` if CI produces them.
- `*.log`, `logs/` to cover Metro bundler logs.
- `*.keystore` already partially ignored; add `android/app/release.keystore` if used.

Additions depend on your workflow—if you plan to version documentation or env templates, adjust accordingly.

---

## Next Steps
- Adopt `redux-persist` for automatic store hydration, reducing optional user checks.
- Map completion arrays to Sets client-side for O(1) lookups (serialize back to arrays for API payloads).
- Expand docs with sequence diagrams (auth flow, caching) if onboarding more contributors.



## Ideas To Level Up Completionist

**Architecture & State**
- Complete the Redux Persist migration so auth/user slices are hydrated automatically; enables removing `useInitUserData` cache plumbing and lets you re-enable the serializable check.
- Consolidate transient UI state (search/category filters) into local components or a lightweight context to cut re-renders and simplify slices.
- Normalize `user.gameData` with RTK entity adapters so updates to quests/collectables don’t require manual array mutation logic.

**Auth & Session**
- Formalize an auth “ready” state so hooks like `useAuthUser` don’t have to throw during bootstrap; surface a skeleton UI until rehydration completes.
- Add a refresh-token strategy and interceptor to auto-renew tokens before they expire and keep Keychain state in sync.

**Networking & Data**
- Introduce RTK Query (or React Query) for API calls; you’ll get caching, invalidation, and loading/error states without custom hooks.
- Implement delta updates for completion arrays (send only changed IDs) to avoid overwriting concurrent progress from other devices.

**Testing & Quality**
- Expand Jest + Testing Library coverage for reducers, hooks, and screen flows (login, quest completion) to catch regressions as state logic evolves.
- Add E2E tests (Detox) covering onboarding, quest completion, and payments to ensure navigation guards and cache rehydration work in real devices.

**Dev Experience**
- Add CI (GitHub Actions) that runs lint/test/TypeScript checks and reports bundle size changes.
- Tighten TypeScript config (`strict`, `noImplicitAny`) and type all slice reducers (`PayloadAction<T>`) for better DX.
- Provide a sample `.env.example` so contributors know which variables to define locally.

**Product Features**
- Track completion timelines (timestamp when a quest was finished) and surface streaks/insights in the UI.
- Offer offline mode by caching game data per language and queuing progress updates until connectivity returns.
- Integrate push notifications/reminders based on incomplete quests or new DLC drops.

Let me know if you want help prioritizing or tackling any of these upgrades.