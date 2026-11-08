import { redirect } from "next/navigation";

// Fallback for "/" if the middleware doesn't run (e.g. static hosting): always land on /pt.
export default function RootPage() {
  redirect("/pt");
}
