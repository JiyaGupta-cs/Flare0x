"use client";
import { useReadContract, useAccount } from "wagmi"; // Import required hooks
import { forestAbi } from "@/constants/abi"; // Your contract ABI
import { forestAddress } from "@/constants/index"; // Your contract address

export function ReadContract() {
  const { address: userAddress } = useAccount(); // Get the connected user's address

  // Reading the task history of the current user
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
    enabled: !!userAddress, // Only run if userAddress is available
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
    enabled: !!userAddress, // Only run if userAddress is available
  });

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
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Uncomment if you want to include the Create Task Button */}
      {/* <div className="mt-4">
        <button onClick={handleCreateTask} className="btn">
          Create Task
        </button>
      </div> */}
    </div>
  );
}
