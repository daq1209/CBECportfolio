import { redirect } from "next/navigation";

/**
 * Root page — immediately redirects to the default locale (/global).
 *
 * The real locale detection + redirection lives in proxy.ts, but this page
 * acts as a server-side fallback for the `/` route before proxy.ts can run.
 * In practice proxy.ts intercepts first; this is belt-and-suspenders safety.
 */
export default function RootPage() {
  redirect("/global");
}
