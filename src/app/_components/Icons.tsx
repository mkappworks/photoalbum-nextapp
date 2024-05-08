/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Image from "next/image";
import logoIcon from "../../../public/logo.svg";
import logoIconDark from "../../../public/logo_dark.svg";

export const LogoIcon = () => {
  return <Image priority src={logoIcon} alt="Photo Album" width={42} />;
};

export const LogoIconDark = () => {
  return <Image priority src={logoIconDark} alt="Photo Album" width={42} />;
};
