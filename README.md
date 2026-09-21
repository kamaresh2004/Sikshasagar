# Siksha Sagar Preschool — Mobile App

**Android & iOS** app for Management, Teacher, and Parent logins, built with **React Native CLI** (bare, no Expo).

> Theme: *ocean of learning* — deep teal + warm coral, playful but professional.

---

## Quick start

Requirements: **Node 22+, Android Studio + SDK, Java 17+** (or Xcode on macOS).

```bash
npm install

# Android (emulator or device running)
npm run android

# iOS (macOS only, pods first)
cd ios && bundle install && pod install   # also needs: npm run ios

# Other checks
npm run lint          # ESLint
npm run typecheck     # TypeScript
npm test              # Jest
```

The debug APK is built at `android/app/build/outputs/apk/debug/app-debug.apk` via `cd android && ./gradlew assembleDebug`.

---

## Demo accounts

All logins use the same password: **`demo1234`**

| Role        | Email                         |
| ----------- | ----------------------------- |
| Management  | `management@sikshasagar.in`    |
| Teacher     | `teacher@sikshasagar.in`      |
| Parent      | `parent@sikshasagar.in`       |

Authentication is a **Zustand store persisted to AsyncStorage**; it validates against bundled demo users (see `src/constants/mock.ts`). The app routes each role to its own dashboard and rejects unknown credentials.

---

## What's built (all three roles)

**Shared** — Login, Forgot Password, Notifications feed, Profile & Settings, AI Chatbot.

**Management** — Dashboard (enquiries, attendance %, approvals, students), Students list + profile, Teachers list, Enquiries with **AI-suggested replies**, Announcements, Gallery approval queue, Fee overview, Attendance reports with class/status filters.

**Teacher** — Home (my class, quick stats), Mark Attendance (present/absent/leave toggle), Daily Activity Log (create + feed), Homework & Notes, Performance notes per student, Events, Upload Photos (emojis → approval pipeline).

**Parent** — Home (children switcher, today's activities), Gallery (class-wise approved albums), School Calendar, Child Profile, Attendance history, Performance timeline, Daily activities, Contact school (call/WhatsApp/email), AI Assistant chat, Parent Rewards preview.

Navigation = **React Navigation 7** (`native-stack` root + role-conditional bottom tabs).

---

## Project structure

```
src/
  components/
    brand/        # Logo, demo-account picker
    shared/       # Greeting header, activity/announcement cards, quick actions
    ui/           # Button, Card, Field, Header, Screen, Avatar, Badge, StatCard,
                  # ListItem, SearchBar, EmptyState, SectionTitle
  constants/      # theme (colors/spacing/radius), types, mock data
  navigation/     # auth stack, root stack, role tabs, param lists
  screens/
    auth/         # login, forgot password
    management/   # dashboard, students, teachers, enquiries, approvals, fees, reports
    teacher/      # home, attendance, activities, homework, performance, events, upload
    parent/       # home, gallery, calendar, child profile, contact, chatbot
    shared/       # notifications, profile
  services/api.ts # API client — mirrors the backend spec (see below)
  store/auth.ts   # Zustand auth store (login/logout, persisted token)
```

`src/services/api.ts` is the **single swap point** for the real backend — every screen already calls `api.*` with the same signatures an Express REST API will expose. It currently resolves from in-app mock data and simulates latency.

---

## Still to do (developer handoff)

The UI is a fully-runnable, professional demo with realistic mock data. Before production you still need:

1. **Backend API** (Node/Express + MongoDB) — implement the endpoint groups in `src/services/api.ts`:
   `POST /auth/login`, `users`, `students`, `attendance`, `performance`, `activities`, `homework`,
   `gallery/upload` + `gallery/:id/approve`, `announcements`, `notifications`, `enquiries`, `ai/chatbot`.
   Swap each `api.*` body from mock → `fetch(API_BASE_URL + path, { headers: Authorization: Bearer <token> })`.
2. **Real auth** — replace the demo login with JWT from the server; keep role-based gate + RBAC on every route (server-side).
3. **Media storage** — wire teacher photo upload to Cloudflare R2 / Firebase Storage with signed, expiring URLs (replace the emoji placeholders with real `<Image>` sources).
4. **Push notifications** — FCM tokens per user; send on attendance, activity, announcement, gallery approval.
5. **AI features** — OpenAI/Anthropic behind `/ai/chatbot` (currently a scripted reply), smart enquiry auto-replies, photo auto-tagging, blog suggestions (admin web panel).
6. **Achievements** — parent reward points logic (points → redeemable perks).
7. **Branding & release** — replace app icon/splash art, set bundle IDs (`com.sikshasagar` on Android is already set), sign release keystore, then Play Store + App Store via the release builds.
8. **Test accounts** — teacher/parent users created from real DB, not the bundled demo list.

iOS specifics: `pod install` on macOS, Apple IDs / provisioning for device testing.

---

## Build output (Android)

- Debug APK: `android/app/build/outputs/apk/debug/app-debug.apk`