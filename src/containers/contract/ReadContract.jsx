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
    <div className="text-left my-8 px-8">
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
        <div className="relative overflow-x-auto shadow-md rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 
                                 bg-orange-600 relative z-10 bg-opacity-40 flex flex-col rounded-xl p-4 text-[#DA810D]

                 dark:bg-gray-800">Task</th>
                <th scope="col" className="px-6 py-3
               bg-orange-600  z-10 bg-opacity-40  rounded-xl text-[#DA810D]

                ">Duration (seconds)</th>
                <th scope="col" className="px-6 py-3
                                   bg-orange-600 relative z-10 bg-opacity-40 flex flex-col rounded-xl p-4 text-[#DA810D]
                  dark:bg-gray-800">Completed</th>
              </tr>
            </thead>
            <tbody>
              {taskHistory?.map((task, index) => (
                <tr key={index} className=" ">
                  <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap
                   bg-orange-600 relative z-10 bg-opacity-20 flex flex-col rounded-xl p-4 text-[#DA810D]
                   dark:text-white dark:bg-gray-800">
                    {task.label}
                  </th>
                  <td className="px-6 py-4
                                    bg-orange-600 relative z-10 bg-opacity-20  rounded-xl text-[#DA810D]

                  ">{task.duration}</td>
                  <td className="px-6 py-4 
                  bg-orange-600 relative z-10 bg-opacity-20 flex flex-col rounded-xl p-4 text-[#DA810D]
                  dark:bg-gray-800">{task.completed ? "Yes" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
