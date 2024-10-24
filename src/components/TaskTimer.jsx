'use client';
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useSearchParams, useRouter } from 'next/navigation'; // Import useRouter
import { useWriteContract } from "wagmi";
import { forestAbi } from "@/constants/abi"; // Your ABI
import { forestAddress } from "@/constants/index"; // Your contract address
import Candle from "./Candle";

export function TaskTimer() {
  const searchParams = useSearchParams(); // Get search parameters
  const router = useRouter(); // Initialize useRouter
  const label = searchParams.get('label'); // Get 'label' parameter
  const duration = searchParams.get('duration'); // Get 'duration' parameter
  
  const [timeLeft, setTimeLeft] = useState(duration ? parseInt(duration) : 0);
  const [isTaskComplete, setIsTaskComplete] = useState(false);
  const { writeContract } = useWriteContract();

  // Effect to manage timer countdown
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            completeTask();
            return 0; // Ensures timeLeft does not go below zero
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer); // Cleanup on unmount
    }
  }, [timeLeft]);

  // Function to complete the task and reward tokens
  const completeTask = async () => {
    try {
      await writeContract({
        address: forestAddress,
        abi: forestAbi,
        functionName: "completeTask",
        args: [0], // Adjust the task ID as needed
      });
      setIsTaskComplete(true);
    } catch (error) {
      console.error("Error completing task:", error);
      alert("Error completing the task. Please try again.");
    }
  };

  // Function to handle giving up on the task
  const handleGiveUp = () => {
    setTimeLeft(0); // Stop the timer
    setIsTaskComplete(true); // Mark task as complete
    alert("You have given up on the task."); // Alert the user
    router.push("/"); // Redirect to home or desired route after giving up
  };

  // If parameters are not available yet, return null or a loading state
  if (!label || !duration) {
    return <div>Loading...</div>; // You can customize this loading state
  }

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <div className="timer-animation">
        {/* Tree growing animation placeholder */}
        <div className="tree">
          <Candle meltTime={10000}/>
        </div>
        <p className="text-lg text-white">
          {label} - Time Left: {Math.floor(timeLeft / 60)}:{" "}
          {String(timeLeft % 60).padStart(2, "0")}
        </p>
      </div>
      <Button onClick={handleGiveUp} variant="outline" className="mt-4">
        Give Up
      </Button>
      {isTaskComplete && <p className="text-green-500">Task Completed! Tokens Rewarded.</p>}
    </div>
  );
}
