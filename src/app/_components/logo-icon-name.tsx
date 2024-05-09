import { LogoIcon } from "./home/icons";

export const LogoIconName = () => {
  return (
    <a
      rel="noreferrer noopener"
      href="/"
      className="ml-2 flex items-center justify-center text-xl font-bold"
    >
      <LogoIcon />
      <span className="ml-2">Photo Album</span>
    </a>
  );
};
