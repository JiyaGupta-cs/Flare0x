"use client";
import React, { useEffect } from "react";
import Navbar from "@/components/shared/Navbar";
import { Toaster } from "@/components/ui/sonner";
import {
  useBackButton,
  useClosingBehavior,
  useViewport,
} from "@telegram-apps/sdk-react";
import { useRouter, usePathname } from "next/navigation";

function Layout({ children }) {
  const bb = useBackButton();
  const close = useClosingBehavior(); // will be undefined or ClosingBehavior.
  const viewport = useViewport(); // will be undefined or InitData.
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    if (bb) {
      bb.hide(); // Hides the back button
      bb.off("click"); // Removes any existing click handler to prevent navigation
    }
  
    if (close) {
      close.enableConfirmation();
    }
  
    if (viewport) {
      viewport.expand();
    }
  }, [bb, close, viewport]);
  

  return (
    <main className="bg-background">
      <Navbar />
      <main className=" mx-3 my-4 ">{children}</main>
      <Toaster richColors />
    </main>
  );
}

export default Layout;
