import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifySession } from "@/lib/auth"; // Your existing auth lib
import { ReactNode } from "react";

interface ProtectProps {
  children: ReactNode;

  roles?: string[];
  /**
   * Optional: What to render if access is denied.
   * Defaults to null (renders nothing).
   */
  fallback?: ReactNode;
  /**
   * Optional: If set, redirects the user to this path if access is denied.
   * Useful for protecting entire pages.
   */
  redirectTo?: string;
}

export default async function Protect({
  children,
  roles,
  fallback = null,
  redirectTo,
}: ProtectProps) {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  // 1. Verify Authentication
  const session = await verifySession(token);

  let isAuthorized = false;

  if (session) {
    // 2. Verify Authorization (Role Check)
    if (!roles || roles.length === 0) {
      // No specific roles required, just being logged in is enough
      isAuthorized = true;
    } else {
      // Check if user's role exists in the allowed roles array
      // Ensure your session payload actually has a 'role' property
      isAuthorized = roles.includes(session.role);
    }
  }

  // 3. Handle Unauthorized Access
  if (!isAuthorized) {
    if (redirectTo) {
      redirect(redirectTo);
    }
    return <>{fallback}</>;
  }

  // 4. Render Protected Content
  return <>{children}</>;
}
