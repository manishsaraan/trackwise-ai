"use server";

import { stackServerApp } from "@/stack";
import { redirect } from "next/navigation";

export async function ensureOnboarded() {
  const user = await stackServerApp.getUser();
  console.log("user", user?.serverMetadata);
  if (!user?.serverMetadata?.onboarded) {
    return redirect("/onboarding");
  }
}

export async function saveOnboardingData(address: string) {
  const user = await stackServerApp.getUser();
  console.log("user", user);
  try {
    await user?.update({
      serverMetadata: { onboarded: true, address },
    });
  } catch (error) {
    console.error(error);
  }
}
