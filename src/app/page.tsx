import { redirect } from "next/navigation";

// Redirect bare / to the default locale. Middleware handles this in
// production; this page catches it in dev when middleware is unreliable.
export default function RootPage() {
  redirect("/uz");
}
