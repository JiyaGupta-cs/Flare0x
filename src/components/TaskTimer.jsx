'use client';
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useSearchParams, useRouter } from 'next/navigation'; 
import { useWriteContract } from "wagmi";
import { forestAbi } from "@/constants/abi"; 
import { forestAddress } from "@/constants/index"; 
import Candle from "./Candle";
import "./TaskTimer.css"; // Import your CSS file for animations

export function TaskTimer() {
  const searchParams = useSearchParams(); 
  const router = useRouter(); 
  const label = searchParams.get('label'); 
  const duration = searchParams.get('duration'); 
  
  const [timeLeft, setTimeLeft] = useState(duration ? parseInt(duration) : 0);
  const [isTaskComplete, setIsTaskComplete] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // New state for success message
  const { writeContract } = useWriteContract();
  
  const [animateSeconds, setAnimateSeconds] = useState(false);
  const [showGiveUpModal, setShowGiveUpModal] = useState(false);
  const [showTaskbar, setShowTaskbar] = useState(true);

  useEffect(() => {
    if (timeLeft > 0) {
      setShowTaskbar(false);
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            completeTask();
            return 0; 
          }
          
          setAnimateSeconds(true);
          setTimeout(() => {
            setAnimateSeconds(false);
          }, 500); 
          
          return prev - 1;
        });
      }, 1000);
      return () => {
        clearInterval(timer);
        setShowTaskbar(true);
      };
    }
  }, [timeLeft]);

  const completeTask = async () => {
    try {
      await writeContract({
        address: forestAddress,
        abi: forestAbi,
        functionName: "completeTask",
        args: [0], 
      });
      setIsTaskComplete(true);
      setShowSuccessMessage(true); // Display success message on task completion
    } catch (error) {
      console.error("Error completing task:", error);
      alert("Error completing the task. Please try again.");
    }
  };

  const handleGiveUp = () => {
    setShowGiveUpModal(true);
  };

  const confirmGiveUp = () => {
    setTimeLeft(0);
    setIsTaskComplete(true);
    setShowGiveUpModal(false);
    alert("You have given up on the task."); 
    router.push("/"); 
  };

  const cancelGiveUp = () => {
    setShowGiveUpModal(false);
  };

  if (!label || !duration) {
    return <div>Loading...</div>; 
  }

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex flex-col items-center justify-center mt-10 relative">
      {showTaskbar && (
        <div className="taskbar">
          {/* Your taskbar content goes here */}
        </div>
      )}

      <div className="absolute top-0.5 left-4 flex items-center">
        <Button onClick={() => router.back()} className="text-white bg-gray-800 p-2 rounded-lg">
          Back
        </Button>
      </div>

      <div className="timer-animation">
        <div className="tree">
          <Candle meltTime={10000}/>
        </div>
        <div className="bg-orange-600 mt-[-3rem] mb-[1.2rem] relative z-10 bg-opacity-20 flex flex-col rounded-xl p-2 text-center">
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
            <span>sec</span>
          </div>
        </div>
      </div>

      <Button onClick={handleGiveUp} variant="outline" className="mt-4 w-[160px] text-[#FFFFFF]">
        Give Up
      </Button>
      
      {isTaskComplete && timeLeft === 0 && !showSuccessMessage && (
        <p className="text-red-500 p-2">You Gave Up!</p>
      )}

      {/* Success message for task completion */}
      {showSuccessMessage && (
        <p className="text-green-500 p-2">Congratulations! Your NFTs are minting!</p>
      )}

      {showGiveUpModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-xl text-center animation-slide-in">
            <p className="text-lg mb-4">Really do you want to give up?</p>
            <div className="flex justify-center gap-4">
              <Button onClick={confirmGiveUp} variant="primary">
                Yes
              </Button>
              <Button onClick={cancelGiveUp} variant="secondary">
                No
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
