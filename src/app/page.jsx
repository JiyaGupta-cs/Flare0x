"use client";

import {
  useMainButton,
  useViewport,
} from "@telegram-apps/sdk-react";
import { CreateTask } from "@/containers/contract/WriteContract";

export default function Home() {
  const mainBtn = useMainButton();
  mainBtn.on("click", () => {
    mainBtn.showLoader();
    mainBtn.setText("Action Performing");
    setTimeout(() => {
      console.log("Main Button Clicked");
      mainBtn.hideLoader();
      mainBtn.setText("New Text");
      mainBtn.hide();
    }, 2000);
  });

  return (
    <main className="">
      
      <div>
           <CreateTask/>
        </div>
    </main>
  );
}
