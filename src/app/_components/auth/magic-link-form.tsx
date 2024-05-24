"use client";

import { redirect } from "next/navigation";

import { MagicLinkSchema, type MagicLinkSchemaType } from "@/schema/magic-link";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
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

export const MagicLinkForm = () => {
  const form = useForm<MagicLinkSchemaType>({
    resolver: zodResolver(MagicLinkSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: MagicLinkSchemaType) => {
    sendMagicLinkToUser.mutate(values);
  };

  const sendMagicLinkToUser = api.user.createMagicLinkUser.useMutation({
    onSuccess: async () => {
      redirect("/magic-link");
    },
    onError: (error: unknown) => {
      console.error(error);
    },
  });

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
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
                    disabled={sendMagicLinkToUser.isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled={sendMagicLinkToUser.isPending}
            className="ml-auto w-full"
            type="submit"
          >
            Sign in with Magic Link
          </Button>
        </form>
      </Form>
    </>
  );
};
