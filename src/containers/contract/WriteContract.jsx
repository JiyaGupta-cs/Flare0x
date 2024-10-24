"use client";
import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { toast } from "sonner";

import { forestAbi } from "@/constants/abi";  // Replace with your actual ABI
import { forestAddress } from "@/constants/index";  // Replace with your actual contract address

export function CreateTask() {
  const { data: hash, isPending, writeContract } = useWriteContract();

  async function submit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const taskLabel = formData.get("taskLabel");
    const timeInMinutes = formData.get("timeInMinutes");

    console.log({ taskLabel, timeInMinutes });
    
    writeContract({
      address: forestAddress,
      abi: forestAbi,
      functionName: "createTask",  // Contract function for creating a task
      args: [taskLabel, BigInt(timeInMinutes)],  // Pass task label and time in minutes as arguments
    });
  }

  const {
    isLoading: isConfirming,
    error,
    isSuccess: isConfirmed,
  } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    if (isConfirmed) {
      toast.success("Task Created Successfully");
    }
    if (error) {
      toast.error("Transaction Failed");
    }
  }, [isConfirmed, error]);

  return (
    <form onSubmit={submit}>
      <p className="text-sm text-gray-500">
        Create a new task with a timer
      </p>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          name="taskLabel"
          placeholder="Task Label"
          type="text"
          required
          className="bg-black text-white rounded-full"
        />
        <Input
          name="timeInMinutes"
          placeholder="Time in minutes"
          type="number"
          required
          className="bg-black text-white rounded-full"
        />
        <Button
          disabled={isPending || isConfirming}
          type="submit"
          variant={"rabble"}
          size={"one-third"}
        >
          {isPending ? "Confirming..." : "Create Task"}
        </Button>
      </div>
    </form>
  );
}
