"use client";

import React, { useState,useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Flame } from "lucide-react";
import { cn } from "@/lib/utils";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Navbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [timerPage,setTimerPage]=useState(false);

  useEffect(() => {
    console.log("Current Pathname:", pathname);  // Debugging line
    const taskTimerRegex = /^\/task-timer/;
    setTimerPage(taskTimerRegex.test(pathname));
  }, [pathname]);

  const menuItems = [
    { href: "/?splash=false", label: "Home" },
    { href: "/contract", label: "Analytics" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-black/95 backdrop-blur-sm shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">

           
    
            <button 


              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={cn(
                "relative z-50 p-2.5 rounded-lg transition-all duration-300",
                "hover:bg-orange-500/20 group",
                isMenuOpen && "bg-orange-500/20",
                timerPage && "hidden"
              )}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-orange-500" />
              ) : (
                <Menu className="h-6 w-6 text-white group-hover:text-orange-500 transition-colors" />
              )}
              <div className={cn(
                "absolute inset-0 rounded-lg bg-gradient-to-r from-orange-500/20 to-red-500/20",
                "opacity-0 transition-opacity duration-300",
                "group-hover:opacity-100",
                isMenuOpen && "opacity-100"
              )} />
            </button>

            {/* Logo */}
            <div className="flex items-center space-x-2">
              <Flame className="h-8 w-8 text-orange-500" />
              <h1 className="font-bold text-2xl">
                <span className="bg-gradient-to-r from-orange-400 via-red-500 to-purple-600 bg-clip-text text-transparent">
                  Flare
                </span>
              </h1>
            </div>
            </div>

            {/* Wallet Connection */}
            <div className="flex items-center">
              {/* <ConnectButton.Custom>
                {({
                  account,
                  chain,
                  openAccountModal,
                  openChainModal,
                  openConnectModal,
                  mounted,
                }) => {
                  const ready = mounted;
                  const connected = ready && account && chain;

                  return (
                    <div
                      {...(!ready && {
                        'aria-hidden': true,
                        'style': {
                          opacity: 0,
                          pointerEvents: 'none',
                          userSelect: 'none',
                        },
                      })}
                    >
                      {(() => {
                        if (!connected) {
                          return (
                            <button
                              onClick={openConnectModal}
                              className="px-4 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium hover:from-orange-600 hover:to-red-600 transition-all duration-300"
                            >
                              Connect Wallet
                            </button>
                          );
                        }

                        return (
                          <div className="flex items-center gap-3">
                            <button
                              onClick={openChainModal}
                              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-orange-500/20 text-orange-500 hover:bg-orange-500/30 transition-colors"
                            >
                              {chain.hasIcon && (
                                <div className="w-5 h-5">
                                  {chain.iconUrl && (
                                    <img
                                      alt={chain.name ?? 'Chain icon'}
                                      src={chain.iconUrl}
                                      className="w-5 h-5"
                                    />
                                  )}
                                </div>
                              )}
                              {chain.name}
                            </button>

                            <button
                              onClick={openAccountModal}
                              className="px-3 py-2 rounded-lg bg-orange-500/20 text-orange-500 hover:bg-orange-500/30 transition-colors"
                            >
                              {account.displayName}
                            </button>
                          </div>
                        );
                      })()}
                    </div>
                  );
                }}
              </ConnectButton.Custom> */}
                 <div className="ml-auto flex items-center ">
          <ConnectButton accountStatus={"avatar"} chainStatus={"icon"} />
        </div>
            </div>




          </div>
        </div>

        {/* Sidebar Menu */}
        <div className={cn(
          "fixed top-0 bottom-0 w-[300px] h-screen bg-gradient-to-b from-gray-900 to-black",
          "transform transition-transform duration-500 ease-out z-40",
          "border-r border-orange-500/10 flex flex-col",
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          {/* Menu Content */}
          <div className="flex-1 flex flex-col pt-20 px-4">
            {/* Navigation Links */}
            <div className="flex-1 space-y-3">
              {menuItems.map((item, index) => (
                <div
                  key={item.href}
                  className={cn(
                    "transform transition-all duration-500",
                    "opacity-0 translate-y-8",
                    isMenuOpen && "opacity-100 translate-y-0",
                  )}
                  style={{ transitionDelay: `${150 + index * 100}ms` }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      "block p-4 rounded-lg",
                      "bg-gradient-to-r hover:from-orange-500/20 hover:to-red-500/20",
                      "transition-all duration-300",
                      "relative overflow-hidden group",
                      pathname === item.href && "bg-orange-500/20"
                    )}
                  >
                    <span className="relative z-10 font-medium text-lg text-white">
                      {item.label}
                    </span>
                    <div className="fire-glow" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Backdrop */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </nav>

      {/* Spacer */}
      <div className="h-[72px]" />

      <style jsx>{`
        .fire-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at center,
            rgba(255, 68, 0, 0) 50%,
            rgba(255, 119, 0, 0.2) 100%
          );
          opacity: 0;
          transition: opacity 0.3s ease-in-out;
        }

        :global(.group:hover) .fire-glow {
          opacity: 1;
        }
      `}</style>
    </>
  );
};

export default Navbar;