"use client";
import { useReadContract, useAccount } from "wagmi"; // Import required hooks
import { forestAbi } from "@/constants/abi"; // Your contract ABI
import { forestAddress } from "@/constants/index"; // Your contract address

function formatNumber(number) {
  if (number >= 1e12) {
    return (number / 1e12).toFixed(0) + 'T'; // Trillions
  } else if (number >= 1e9) {
    return (number / 1e9).toFixed(0) + 'B'; // Billions
  } else if (number >= 1e6) {
    return (number / 1e6).toFixed(0) + 'M'; // Millions
  } else if (number >= 1e3) {
    return (number / 1e3).toFixed(0) + 'K'; // Thousands
  } else {
    return number.toString();
  }
}

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

  // Log the task history to the console
  console.log("Task History:", taskHistory);

  return (
    <div className="text-left my-8 px-8">
      {/* Display Token Balance */}
      {isBalanceLoading ? (
        <div>Loading Balance...</div>
      ) : balanceError ? (
        <div className="text-red-500">Error fetching balance: {balanceError.message}</div>
      ) : (
        <div className="text-2xl bg-orange-600 flex  gap-2 items-center justify-center bg-opacity-40 rounded-xl p-4 text-[#DA810D] mb-4">
          <span className="text-sm flex flex-col md:flex-row flex-wrap">
            <span>Token</span>
            <span>Balance:</span>
             
             </span>
          <span className="text-rabble text-lg flex-wrap bg-orange-600 flex sm:gap-0 items-center justify-center bg-opacity-30 rounded-xl p-2">
          <span> {formatNumber(parseFloat(tokenBalance?.toString()))}</span>  
            <span>Flares 🔥</span> 
          </span>
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
            <thead className="text-xs text-gray-700 uppercase dark:text-gray-400 my-3">
              <tr>
                <th scope="col" className="px-6 py-7 m-1 my-3 text-center bg-orange-600 relative bg-opacity-40 flex flex-col rounded-xl p-4 text-[#DA810D] dark:bg-gray-800">Task</th>
                <th scope="col" className="px-6 py-7 m-1 my-3 text-center bg-orange-600 bg-opacity-40 rounded-xl text-[#DA810D]">Duration (s)</th>
                <th scope="col" className="px-6 py-7 m-1 my-3 text-center bg-orange-600 relative bg-opacity-40 flex flex-col rounded-xl p-4 text-[#DA810D] dark:bg-gray-800">Stat</th>
              </tr>
            </thead>
            <tbody>
              {taskHistory?.map((task, index) => (
                <tr key={index} className="my-10">
                  <th scope="row" className="px-6 py-4 m-1 font-medium whitespace-nowrap bg-orange-600 relative bg-opacity-20 flex flex-col rounded-xl p-4 text-[#DA810D] dark:text-white dark:bg-gray-800 text-center">
                    {task.label}
                  </th>
                  <td className="px-6 py-4 text-center bg-orange-600 relative m-1 bg-opacity-40 rounded-xl text-[#DA810D]">{task.duration.toString()}</td>
                  <td className="px-6 py-4 text-center bg-orange-600 relative bg-opacity-20 m-1 flex flex-col rounded-xl p-4 text-[#DA810D] dark:bg-gray-800">{task.completed ? "Success" : "Fail"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
