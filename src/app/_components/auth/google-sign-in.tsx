"use client";

import { signIn } from "next-auth/react";

import { Button } from "@components/ui/button";
import { GoogleIcon } from "@components/icons/icons";

export const GoogleSignIn = () => {
  return (
    <Button
      className="w-full"
      variant="outline"
      type="button"
      onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
    >
      <GoogleIcon />
      <span className="ml-2">Continue with Google</span>
    </Button>
  );
};
