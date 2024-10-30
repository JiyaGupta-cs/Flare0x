'use client';
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useSearchParams, useRouter } from 'next/navigation'; 
import { useWriteContract } from "wagmi";
import { forestAbi } from "@/constants/abi"; 
import { forestAddress } from "@/constants/index"; 
import Candle from "./Candle";
import "./TaskTimer.css"; // Import your CSS file for animations
import Music from "./Music";
import Modal from "@/components/Modal"; // Import the Modal component

export function TaskTimer() {
  const searchParams = useSearchParams(); 
  const router = useRouter(); 
  const label = searchParams.get('label'); 
  const duration = searchParams.get('duration'); 
  
  const [timeLeft, setTimeLeft] = useState(duration ? parseInt(duration) : 0);
  const [isTaskComplete, setIsTaskComplete] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const { writeContract } = useWriteContract();
  
  // State to control the animation
  const [animateSeconds, setAnimateSeconds] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            completeTask();
            return 0; 
          }
          
          // Set animation state for seconds card
          setAnimateSeconds(true);
          setTimeout(() => {
            setAnimateSeconds(false); // Reset animation class
          }, 500); // Match this duration with your CSS animation duration
          
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer); 
    }
  }, [timeLeft]);

  const completeTask = async () => {
    try {
      await writeContract({
        address: forestAddress,
        abi: forestAbi,
        functionName: "completeLastTask",
        args: [], 
      });
      setIsTaskComplete(true);
      setModalMessage("Task Completed! Tokens Rewarded.");
      setIsModalOpen(true);
      console.info("Task completed successfully!");

      // Redirect to the homepage after a short delay to show the modal
      setTimeout(() => {
        router.push("/?splash=false");
      }, 3000);
    } catch (error) {
      console.error("Error completing task:", error);
      alert("Error completing the task. Please try again.");
    }
  };
  
  const handleGiveUp = async () => {
    setTimeLeft(0); 
    
    try {
      await writeContract({
        address: forestAddress,
        abi: forestAbi,
        functionName: "giveUpLastTask",
        args: [],
      });
      console.info("You have given up on the last task.");
    } catch (error) {
      console.error("Error giving up on task:", error);
      alert("Error giving up on the task. Please try again.");
    }

    router.push("/?splash=false"); 
  };

  if (!label || !duration) {
    return <div>Loading...</div>; 
  }

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <div className="timer-animation">
        <div className="tree">
          <Candle meltTime={10000}/>
        </div>
        <Music/>

        <div className="bg-orange-600 mt-[-4rem] mb-[0.5rem] relative z-10 bg-opacity-20 flex flex-col rounded-xl p-2 text-center">
          <p className="text-sm text-white">{label}</p>
        </div>

        <div className="time-container bg-orange-600 relative z-10 bg-opacity-20 flex flex-col rounded-xl p-4 text-[#DA810D] ">
          <div className="flex items-center justify-center">
            <div className="time-card minutes">
              <p>{String(minutes).padStart(2, "0")}</p>
            </div>
            <div className="separator text-[#DA810D]"><span>:</span></div>
            <div className={`time-card seconds ${animateSeconds ? 'revolve' : ''}`}>
              <p>{String(seconds).padStart(2, "0")}</p>
            </div>
          </div>
          <div className="flex gap-10 text-lg">
            <span>mins</span>
            <span className="">sec</span>
          </div>
        </div>
      </div>
      <Button onClick={handleGiveUp} variant="outline" className="mt-3 w-[160px] border-hidden text-[#FFFFFF]">
        Give Up
      </Button>

      {/* Modal for task completion message */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Task Completed!"
        message={modalMessage}
        isSuccess={isTaskComplete}
      />
    </div>
  );
}
