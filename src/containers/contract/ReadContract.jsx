"use client";
import { useReadContract, useWriteContract } from "wagmi"; // Import required hooks
import { forestAbi } from "@/constants/abi"; // Your contract ABI
import { forestAddress } from "@/constants/index"; // Your contract address

export function ReadContract() {
  // Reading the task history of the current user
  const userAddress = "0x7B4a63dBF8d494e438D3fC06839fE48006F3d449"; // Replace with the actual user's address
  const {
    data: taskHistory,
    status: historyStatus,
    isLoading: isHistoryLoading,
    error: historyError,
  } = useReadContract({
    abi: forestAbi,
    address: forestAddress,
    functionName: "getTaskHistory",
    args: [userAddress], // Pass the user's address as an argument
  });

  // Reading the token balance of the current user
  const {
    data: tokenBalance,
    status: balanceStatus,
    isLoading: isBalanceLoading,
    error: balanceError,
  } = useReadContract({
    abi: forestAbi,
    address: forestAddress,
    functionName: "getTokenBalance",
    args: [userAddress], // Pass the user's address as an argument
  });

  // Writing functions for creating and completing tasks
  // const { write: createTask } = useWriteContract({
  //   abi: forestAbi,
  //   address: forestAddress,
  //   functionName: "createTask",
  // });

  // const { write: completeTask } = useWriteContract({
  //   abi: forestAbi,
  //   address: forestAddress,
  //   functionName: "completeTask",
  // });

  // const handleCreateTask = async () => {
  //   const label = "New Task"; // Replace with actual task label
  //   const duration = 60; // Replace with desired duration in seconds
  //   const tx = await createTask({ args: [label, duration] });
  //   console.log(tx); // Handle transaction response
  // };

  // const handleCompleteTask = async (taskId) => {
  //   const tx = await completeTask({ args: [taskId] });
  //   console.log(tx); // Handle transaction response
  // };

  return (
    <div className="text-left my-8">
      {/* Display Token Balance */}
      {isBalanceLoading ? (
        <div>Loading Balance...</div>
      ) : balanceError ? (
        <div className="text-red-500">Error fetching balance: {balanceError.message}</div>
      ) : (
        <div className="text-2xl">
          Token Balance: <span className="text-rabble">{tokenBalance?.toString()}</span>
        </div>
      )}

      {/* Display Task History */}
      {isHistoryLoading ? (
        <div>Loading Task History...</div>
      ) : historyError ? (
        <div className="text-red-500">Error fetching task history: {historyError.message}</div>
      ) : (
        <div>
          <h2 className="text-xl">Task History:</h2>
          <ul>
            {taskHistory?.map((task, index) => (
              <li key={index}>
                <div>
                  Task: {task.label} - Duration: {task.duration} seconds - Completed: {task.completed ? "Yes" : "No"}
                </div>
                {task.completed && (
                  <button onClick={() => handleCompleteTask(index)} className="btn">
                    Complete Task
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Create Task Button */}
      {/* <div className="mt-4">
        <button onClick={handleCreateTask} className="btn">
          Create Task
        </button>
      </div> */}
    </div>
  );
}
