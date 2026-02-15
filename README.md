# 📚 Architecture & Patterns

This project utilizes specific data structuring patterns introduced in Next.js 16, utilizing cache components and partial rerendering (PPR).

**Recommended Reference:**
To understand the core architectural decisions and data flow used in this application, please watch the following guides:

- [**Next.js Patterns: Public Pages with Personalization**](https://www.youtube.com/watch?v=F6romq71KtI)

- [**Next.js 'use cache' in 100 seconds**](https://www.youtube.com/watch?v=OWmRn74CQKY)

# The “Litmus Test” (When to  Use React Query)
Ask yourself these 3 questions about a specific piece of data (e.g., a list of products, a user profile, a blog post):

Does this data change while the user is looking at it? (e.g., live stock prices, chat messages, notification counts)
Does the user interact with this data to change it? (e.g., “Like” button, “Edit” form, “Delete” item)
Is this data used in multiple, disconnected places simultaneously? (e.g., User Avatar in Header AND User Email in Settings form)
If you answered “YES” to ANY of these:

🚀 Use React Query (Hydration Pattern).

If you answered “NO” to ALL of these:

🛑 Use Standard Server Components (Direct Fetch).

Next.js 16 Caching & Layouts
Critical architectural constraints to remember when structuring Layouts and Pages in Next.js 16:

1. Layout Caching Independence
Parallel Routes and Pages with dynamic APIs (e.g., cookies(), headers()) do not automatically opt the parent Layout out of caching. The Layout attempts to remain static even if its children are dynamic.

2. The “Dynamic Import” Trap
⚠️ Error Warning: You cannot import a Dynamic Component (one that reads cookies/headers) directly into a Cached (Static) Layout. This will throw a build/runtime error because the static layout cannot process the dynamic data requirements during the build.

3. The “Dynamic Wrapper” Pattern
✅ Allowed: A Dynamic Layout can wrap Cached Children.

You are allowed to make the outer shell (the Layout) dynamic to handle auth/cookies, while keeping the inner children static/cached.

# Internationalization (next-intl) & Static Rendering

To ensure our application supports **Static Rendering** and **PPR (Partial Prerendering)** while using `next-intl`, we must adhere to specific implementation patterns.

📚 **Official Documentation:**
- [Static Rendering Setup](https://next-intl.dev/docs/routing/setup#static-rendering)
- [Advanced Usage](https://next-intl.dev/docs/usage)

### 1. Required: Generate Static Params
To enable static prerendering for our locale routes, every Layout and Page inside `[locale]` must define which locales to generate. Add this to your page/layout files:
```typescript
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
```
### 2. Required: Set Request Locale
In Server Components, Pages, and Layouts, you **must** call `setRequestLocale` before accessing translations. The `locale` is passed as a prop to these components. This signals Next.js to treat the locale as a static parameter rather than a dynamic header.

```typescript
// app/[locale]/dashboard/page.tsx
import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';

export default async function DashboardPage({ params: { locale } }: Props) {
  // 1. Enable static rendering for this locale
  setRequestLocale(locale);

  // 2. Now safe to fetch translations
  const t = await getTranslations("Dashboard");

  return <h1>{t('title')}</h1>;
}
```
### 3. Navigation Wrappers
Do **not** use `next/link` or `next/navigation` directly. We must use the specific navigation APIs created by our routing configuration to handle locale prefixes automatically.

Import these from your local navigation configuration (e.g., `@/i18n/routing`):

```typescript
// ✅ CORRECT
import { Link, redirect, usePathname, useRouter } from "@/i18n/routing";

// ❌ INCORRECT
// import { Link } from "next/link";
// import  useRouter } from "next/navigation";
```

# Server-Side Protection (`<Protect />`)

The `<Protect>` component is a **Server Component** designed to wrap UI elements, Pages, or Layouts. It performs authentication and role verification on the server before sending HTML to the client.

**Import:**
```tsx
import Protect from "@/components/utils/Protect";
```
### 1. Section-Level Protection
Use this to hide specific parts of the UI based on roles. If the user is not authorized, you can render a `fallback` (like a message or disabled button) or render nothing at all.

```tsx
export default function Navbar() {
  return (
<nav>
<Link href="/">Home</Link>

{/* Only visible to logged-in users with ADMIN role */}
<Protect 
roles={["ADMIN"]} 
fallback={<span className="text-gray-400">Read Only View</span>}
>
<AdminSettingsButton />
</Protect>
</nav>
  );
}
```
### 2. Full Page Protection (with Redirect)
Use this in `page.tsx` or `layout.tsx` to protect an entire route. If the user is not authorized, they will be immediately redirected via `next/navigation`.

```tsx
// app/dashboard/page.tsx
export default function DashboardPage() {
  return (
<Protect 
roles={["USER", "ADMIN"]} 
redirectTo="/auth/login" // 👈 Triggers 307 Redirect if unauthorized
>
<main>
<h1>User Dashboard</h1>
<p>Private user data...</p>
</main>
</Protect>
  );
}
```

### Component Props
```tsx
| Prop | Type | Description |
| :--- | :--- | :--- |
| `children` | `ReactNode` | The content to verify access for. |
| `roles` | `string[]` | (Optional) Array of allowed roles (e.g., `["ADMIN"]`). If omitted, checks only if user is logged in. |
| `fallback` | `ReactNode` | (Optional) Content to render if access is denied. Defaults to `null`. |
| `redirectTo`|`string` | (Optional) If provided, unauthorized users are redirected to this path instead of showing the fallback. |
```