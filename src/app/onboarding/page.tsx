"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveOnboardingData } from "@/app/actions/onboarding-functions";

export default function OnboardingPage() {
  const router = useRouter();
  const [address, setAddress] = useState("");

  const onClickSubmit = async () => {
    await saveOnboardingData(address);
    router.push("/jobs");
  };

  return (
    <>
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      <button onClick={onClickSubmit}>Submit</button>
    </>
  );
}
