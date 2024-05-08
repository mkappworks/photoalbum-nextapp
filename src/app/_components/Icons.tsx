/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Image from "next/image";
import logoIcon from "../../../public/logo.svg";

export const LogoIcon = () => {
  return <Image priority src={logoIcon} alt="Photo Album" width={42} />;
};
