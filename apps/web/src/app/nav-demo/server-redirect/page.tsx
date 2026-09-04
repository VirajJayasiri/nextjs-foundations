import { redirect } from "next/navigation";

export default function ServerRedirectPage() {
  redirect("/nav-demo/page-a");
}