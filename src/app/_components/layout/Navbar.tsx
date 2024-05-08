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

import { buttonVariants } from "../ui/button";
import { Menu } from "lucide-react";
import { ModeToggle } from "../ModeToggle";
import { LogoIcon, LogoIconDark } from "../Icons";
import { useTheme } from "next-themes";

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

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { theme } = useTheme();

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
              {theme !== "light" ? <LogoIconDark /> : <LogoIcon />}
              <span className="ml-2">Photo Album</span>
            </a>
          </NavigationMenuItem>

          <NavbarMobile isOpen={isOpen} setIsOpen={setIsOpen} />
          <NavbarDesktop />

          <div className="hidden gap-2 md:flex">
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

        <SheetContent side={"left"}>
          <SheetHeader>
            <SheetTitle className="text-xl font-bold">Shadcn/React</SheetTitle>
          </SheetHeader>
          <nav className="mt-4 flex flex-col items-center justify-center gap-2">
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
