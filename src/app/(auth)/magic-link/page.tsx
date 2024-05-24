import { redirect } from "next/navigation";

import { getServerAuthSession } from "@/server/auth";

export default async function MagicLinkPage() {
  const session = await getServerAuthSession();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <h1>Check email for magic link</h1>
    </div>
  );
}
