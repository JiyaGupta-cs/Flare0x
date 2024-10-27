"use client";
import { useReadContract, useAccount } from "wagmi"; // Import required hooks
import { forestAbi } from "@/constants/abi"; // Your contract ABI
import { forestAddress } from "@/constants/index"; // Your contract address
import { useEffect } from "react";




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

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.open = (function (open) {
        return function (url, _, features) {
          return open.call(window, url, "_blank", features);
        };
      })(window.open);
    }
  }, []);

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
    <div className="text-left my-8 px-8 bg-black text-white">
      {/* Display Token Balance */}
      {isBalanceLoading ? (
        <div className="text-center text-gray-500">Loading Balance...</div>
      ) : balanceError ? (
        <div className="text-center text-red-500">Error fetching balance: {balanceError.message}</div>
      ) : (
        <div className="flex flex-col items-center bg-gray-800 rounded-lg p-6 shadow-md mb-6">
          <div className="text-lg font-semibold text-orange-400">Token Balance</div>
          <div className="text-3xl font-bold text-orange-600 mt-2">
            {formatNumber(parseFloat(tokenBalance?.toString()))} Flares 🔥
          </div>
        </div>
      )}

      {/* Display Task History */}
      {isHistoryLoading ? (
        <div className="text-center text-gray-500">Loading Task History...</div>
      ) : historyError ? (
        <div className="text-center text-red-500">Error fetching task history: {historyError.message}</div>
      ) : (
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="bg-gray-800 text-orange-400 uppercase text-xs">
              <tr>
                <th scope="col" className="px-6 py-3 text-center">Task</th>
                <th scope="col" className="px-6 py-3 text-center">Duration (s)</th>
                <th scope="col" className="px-6 py-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {taskHistory?.map((task, index) => (
                <tr key={index} className="bg-gray-900 border-b border-gray-700 hover:bg-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-orange-400 text-center">
                    {task.label}
                  </th>
                  <td className="px-6 py-4 text-center">
                    {task.duration.toString()}
                  </td>
                  <td className={`px-6 py-4 text-center ${task.completed ? 'text-green-400' : 'text-red-400'}`}>
                    {task.completed ? "Success" : "Fail"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
