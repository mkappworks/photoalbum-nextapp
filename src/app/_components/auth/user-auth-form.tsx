"use client";

import { useSearchParams } from "next/navigation";

import {
  CredentialsSchema,
  type CredentialsSchemaType,
} from "@/schema/credentials";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";

import { Button } from "@components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import { GoogleIcon } from "@components/icons/icons";

export const UserAuthForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const form = useForm<CredentialsSchemaType>({
    resolver: zodResolver(CredentialsSchema),
  });

  const registerUser = api.user.register.useMutation({
    onSuccess: async () => {
      await signIn("credentials", {
        email: form.getValues("email"),
        password: form.getValues("password"),
        callbackUrl: callbackUrl ?? "/",
      });
    },
    onError: (error: unknown) => {
      console.error(error);
    },
  });

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            registerUser.mutate({
              email: form.getValues("email"),
              password: form.getValues("password"),
            });
          }}
          className="w-full space-y-2"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email..."
                    disabled={registerUser.isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password..."
                    disabled={registerUser.isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled={registerUser.isPending}
            className="ml-auto w-full"
            type="submit"
          >
            Continue With Email
          </Button>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <GoogleSignInButton isDisabled={registerUser.isPending} />
    </>
  );
};

const GoogleSignInButton = ({ isDisabled }: { isDisabled: boolean }) => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  return (
    <Button
      className="w-full"
      variant="outline"
      type="button"
      disabled={isDisabled}
      onClick={() => signIn("google", { callbackUrl: callbackUrl ?? "/" })}
    >
      <GoogleIcon />
      <span className="ml-2">Continue with Google</span>
    </Button>
  );
};
