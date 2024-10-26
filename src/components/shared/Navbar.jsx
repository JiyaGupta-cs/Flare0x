"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { usePathname } from "next/navigation";
import Image from "next/image";

const Navbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="mx-3 my-4">
      <div className="flex items-end">
        {/* Hamburger menu */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden mr-4 p-2 rounded focus:outline-none"
          aria-label="Toggle menu"
        >
          {/* Enhanced hamburger icon */}
          <span
            className="block w-6 h-0.5 bg-white mb-1 transition-transform duration-300 transform-gpu"
            style={{
              transform: isMenuOpen ? "rotate(45deg) translate(2px, 2px)" : "none",
            }}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-white mb-1 transition-opacity duration-300 ${
              isMenuOpen ? "opacity-0" : "opacity-100"
            }`}
          ></span>
          <span
            className="block w-6 h-0.5 bg-white transition-transform duration-300 transform-gpu"
            style={{
              transform: isMenuOpen ? "rotate(-45deg) translate(3px, -3px)" : "none",
            }}
          ></span>
        </button>

        {/* Logo */}
        <p className="font-black text-2xl text-rabble whitespace-nowrap">
          <span>Flare 🔥</span>
        </p>

        <div className="ml-auto flex items-center">
          <ConnectButton accountStatus={"avatar"} chainStatus={"icon"} />
        </div>
      </div>
      <hr className="bg-black my-2" />

      {/* Desktop menu */}
      <div className="hidden md:flex space-x-4">
        <Link
          href="/"
          className={`${
            pathname === "/" ? "text-rabble" : "text-color hover:text-color/90"
          }`}
        >
          Home
        </Link>
        <Link
          href="/contract"
          className={`${
            pathname === "/contract"
              ? "text-rabble"
              : "text-color hover:text-color/90"
          }`}
        >
          Analytics
        </Link>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="flex flex-col space-y-2 md:hidden mt-2">
          <Link
            href="/"
            className={`${
              pathname === "/" ? "text-rabble" : "text-color hover:text-color/90"
            }`}
          >
            Home
          </Link>
          <Link
            href="/contract"
            className={`${
              pathname === "/contract"
                ? "text-rabble"
                : "text-color hover:text-color/90"
            }`}
          >
            Analytics
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
