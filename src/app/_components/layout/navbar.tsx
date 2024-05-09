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
import { ThemeToggle } from "./theme-toggle/theme-toggle";
import { LogoIcon } from "../home/icons";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { UserDropdownMenu } from "./user-dropdown-menu";

interface RouteProps {
  href: string;
  label: string;
}

const nonSessionRouteList: RouteProps[] = [
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

const sessionRouteList: RouteProps[] = [];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { data: session } = useSession();
  const routeList = session ? sessionRouteList : nonSessionRouteList;

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

          <MobileSidebar
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            routeList={routeList}
          />
          <MainNavBar routeList={routeList} />

          <div className="hidden items-center justify-center gap-2 md:flex">
            <div className="flex items-center justify-center gap-4">
              {session ? (
                <UserDropdownMenu />
              ) : (
                <Link href="/api/auth/signin">
                  <Button>Sign in</Button>
                </Link>
              )}
              <ThemeToggle />
            </div>
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};

const MobileSidebar = ({
  isOpen,
  setIsOpen,
  routeList,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  routeList: RouteProps[];
}) => {
  return (
    <span className="flex md:hidden">
      <ThemeToggle />

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

const MainNavBar = ({ routeList }: { routeList: RouteProps[] }) => {
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