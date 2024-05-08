import { getServerAuthSession } from "~/server/auth";
import { NavbarMenu } from "./NavbarMenu";

export const Navbar = async () => {
  const session = await getServerAuthSession();

  return <NavbarMenu session={session} />;
};
