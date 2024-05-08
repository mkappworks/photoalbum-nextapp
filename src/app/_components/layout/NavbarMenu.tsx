"use client";

import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "../ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

import { Button, buttonVariants } from "../ui/button";
import { Menu } from "lucide-react";
import { ModeToggle } from "../ModeToggle";
import { LogoIcon } from "../Icons";
import { type Session } from "next-auth";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";

interface RouteProps {
  href: string;
  label: string;
}

const routeList: RouteProps[] = [
  {
    href: "#features",
    label: "Features",
  },
  {
    href: "#testimonials",
    label: "Testimonials",
  },
  {
    href: "#pricing",
    label: "Pricing",
  },
  {
    href: "#faq",
    label: "FAQ",
  },
];

export const NavbarMenu = ({ session }: { session: Session | null }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b-[1px] bg-white dark:border-b-slate-700 dark:bg-background">
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="container flex h-14 w-screen justify-between px-4 ">
          <NavigationMenuItem className="flex font-bold">
            <a
              rel="noreferrer noopener"
              href="/"
              className="ml-2 flex items-center justify-center text-xl font-bold"
            >
              <LogoIcon />
              <span className="ml-2">Photo Album</span>
            </a>
          </NavigationMenuItem>

          <NavbarMobile isOpen={isOpen} setIsOpen={setIsOpen} />
          <NavbarDesktop />

          <div className="hidden items-center justify-center gap-2 md:flex">
            <div className="flex items-center justify-center gap-4">
              {session && (
                <Avatar>
                  <AvatarImage alt="" src={session.user?.image ?? undefined} />
                  <AvatarFallback>{session.user?.name}</AvatarFallback>
                </Avatar>
              )}
              <Link href={session ? "/api/auth/signout" : "/api/auth/signin"}>
                <Button> {session ? "Sign out" : "Sign in"}</Button>
              </Link>
            </div>
            <ModeToggle />
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};

const NavbarMobile = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  return (
    <span className="flex md:hidden">
      <ModeToggle />

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger className="px-2">
          <Menu
            className="flex h-5 w-5 md:hidden"
            onClick={() => setIsOpen(true)}
          >
            <a className="sr-only">Menu Icon</a>
          </Menu>
        </SheetTrigger>

        <SheetContent side={"left"} className="w-60">
          <SheetHeader>
            <SheetTitle className="text-xl font-bold">Photo Album</SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col items-center justify-center gap-2">
            {routeList.map(({ href, label }: RouteProps) => (
              <a
                rel="noreferrer noopener"
                key={label}
                href={href}
                onClick={() => setIsOpen(false)}
                className={buttonVariants({ variant: "ghost" })}
              >
                {label}
              </a>
            ))}
            <Button>Sign In</Button>
          </nav>
        </SheetContent>
      </Sheet>
    </span>
  );
};

const NavbarDesktop = () => {
  return (
    <nav className="hidden gap-2 md:flex">
      {routeList.map((route: RouteProps, i) => (
        <a
          rel="noreferrer noopener"
          href={route.href}
          key={i}
          className={`text-[17px] ${buttonVariants({
            variant: "ghost",
          })}`}
        >
          {route.label}
        </a>
      ))}
    </nav>
  );
};