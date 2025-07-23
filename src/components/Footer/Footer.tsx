import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { footerClasses } from "./classes";

const Footer: FC = () => {
  return (
    <footer className={footerClasses.container}>
      <div className={footerClasses.wrapper}>
        <div className={footerClasses.content}>
          <Link href="/" className={footerClasses.logoContainer}>
            <Image
              src="/apply-digital-logo.svg"
              alt="Apply Digital"
              width={120}
              height={40}
              className={footerClasses.logo}
            />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
