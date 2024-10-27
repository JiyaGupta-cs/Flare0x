"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { toast } from "sonner";
import { useRouter } from "next/navigation"; // Import useRouter
import { forestAbi } from "@/constants/abi"; // Replace with your actual ABI
import { forestAddress } from "@/constants/index"; // Replace with your actual contract address
import Modal from "@/components/Modal"; // Import the Modal component
import './Button.css'
export function CreateTask() {
  const router = useRouter();
  const { data: hash, isPending, writeContract } = useWriteContract();

  // State for modal visibility and message
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // State to store task details for redirection
  const [taskLabel, setTaskLabel] = useState("");
  const [timeInMinutes, setTimeInMinutes] = useState(0);

  async function submit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const label = formData.get("taskLabel");
    const time = formData.get("timeInMinutes");

    console.log({ label, time });

    // Set state variables for later use
    setTaskLabel(label);
    setTimeInMinutes(time);

    // Write to contract to create a task
    try {
      await writeContract({
        address: forestAddress,
        abi: forestAbi,
        functionName: "createTask",
        args: [label, BigInt(time * 60)],
      });
    } catch (error) {
      toast.error("Error sending transaction. Please try again.");
      setModalMessage("Error sending transaction. Please try again.");
      setIsSuccess(false);
      setIsModalOpen(true);
      return; // Early return on error
    }
  }

  const {
    isLoading: isConfirming,
    error,
  } = useWaitForTransactionReceipt({ hash });

  useEffect(() => {
    if (error) {
      setModalMessage("Transaction Failed");
      setIsSuccess(false);
      setIsModalOpen(true);
    } else if (hash) {
      setModalMessage("Transaction Successful");
      setIsSuccess(true);
      setIsModalOpen(true);
      // Redirect to the timer page after the transaction is confirmed
      // setTimeout(() => {
      //   router.push(`/task-timer?label=${encodeURIComponent(taskLabel)}&duration=${timeInMinutes * 60}`);
      // }, 3000); // Redirect after 3 seconds to allow user to see success message
    }
  }, [error, hash, taskLabel, timeInMinutes]); // Include taskLabel and timeInMinutes in dependencies

  return (
    <>
      <form onSubmit={submit} className="flex flex-col justify-center items-center">
        <p className="text-3xl font-black my-8 text-center text-[#e68b00]">Focus Until The Candles Dies !!!</p>
        <div className="flex flex-col gap-8 justify-center w-full max-w-sm items-center">
          <Input
            name="taskLabel"
            placeholder="Task Label"
            type="text"
            required
            className="
            bg-[#222630] px-4 py-6 outline-none w-full text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040]
            "
          />
          <Input
            name="timeInMinutes"
            placeholder="Time in minutes"
            type="number"
            required
            className="
            bg-[#222630] px-4 py-6 outline-none w-full text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040]
            "
          />



          {/* <Button
            disabled={isPending || isConfirming}
            type="submit"
            variant={"rabble"}
            size={"one-third"}
            className='w-full p-2'
          >


            {isPending ? "Confirming..." : "Create Task"}


          </Button> */}


          <button 
          disabled={isPending || isConfirming}
            type="submit" class="fbtn text-white">

<p className="text-white z-10"> {isPending ? "Confirming..." : "Create Task"}</p>
          

            <div id="container-stars">
              <div id="stars"></div>
            </div>

            <div id="glow">
              <div class="circle"></div>
              <div class="circle"></div>
            </div>
          </button>



        </div>
      </form>

      {/* Modal for success/error messages */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={isSuccess ? "Success!" : "Error"}
        message={modalMessage}
        isSuccess={isSuccess}
      />
    </>
  );
}
