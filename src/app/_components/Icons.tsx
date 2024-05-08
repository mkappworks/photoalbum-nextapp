import Image, { type StaticImageData } from "next/image";
import logoIcon from "../../../public/logo.svg";

export const LogoIcon = () => {
  return (
    <Image src={logoIcon as StaticImageData} alt="Photo Album" width={42} />
  );
};
