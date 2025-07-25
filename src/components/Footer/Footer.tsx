import { FC } from "react";
import Image from "next/image";
import { footerClasses } from "./classes";
import { CustomLink } from "../CustomLink/CustomLink";

const Footer: FC = () => {
  return (
    <footer className={footerClasses.container}>
      <div className={footerClasses.wrapper}>
        <div className={footerClasses.content}>
          <CustomLink href="/" className={footerClasses.logoContainer}>
            <Image
              src="/apply-digital-logo.svg"
              alt="Apply Digital"
              width={120}
              height={40}
              className={footerClasses.logo}
            />
          </CustomLink>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
