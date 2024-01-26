"use client"

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import CustomButton from "./CustomButton";
import { CarDetails } from ".";
import SignIn from "./SignIn";

const Navbar = () => {

  const [isTopOfPage, setIsTopOfPage] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsTopOfPage(true);
      }
      if (window.scrollY !== 0) setIsTopOfPage(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navbarBackground = isTopOfPage ? "" : "bg-gradient-bg shadow-md";
  return (
    <header className={`${navbarBackground} w-full fixed z-40`}>
      <nav className="max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4">
        <Link href="/" className="flex justify-center items-center">
          <Image
            src="/logo.svg"
            alt="Car-logo"
            width={118}
            height={18}
            className="object-contain"
          />
        </Link>
        <CustomButton
          title="Sign In"
          btnType="button"
          containerStyles="text-primary-blue rounded-full bg-white min-w-[140px] hover:bg-primary-blue hover:text-white transition duration-200 ease-in"
          handleClick={() => setIsOpen(true)}
        />
      </nav>
      <SignIn isOpen= {isOpen} closeModal={() => setIsOpen(false)}/>
    </header>
  );
};

export default Navbar;
