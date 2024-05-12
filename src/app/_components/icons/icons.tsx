import Image, { type StaticImageData } from "next/image";
import logoIcon from "@public/logo.svg";
import googleIcon from "@public/google.svg";

export const LogoIcon = () => {
  return (
    <Image
      src={logoIcon as StaticImageData}
      alt="Photo Album Logo"
      width={42}
    />
  );
};

export const GoogleIcon = () => {
  return (
    <Image src={googleIcon as StaticImageData} alt="Google Icon" width={24} />
  );
};
