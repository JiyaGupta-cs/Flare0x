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

  const formatTimestamp = (timestamp) => {
    // Ensure timestamp is a number before converting
    return new Date(Number(timestamp) * 1000).toLocaleString(undefined, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  };

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
          <div className="text-2xl font-bold text-orange-600 mt-2">
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
                  <td className="text-center">
                    <span className="px-4 py-2 text-center bg-orange-600 relative m-1 bg-opacity-40 rounded-xl text-[#DA810D]">


                      {/* {formatTimestamp(task.endTime)}
                      <br />
                      {formatTimestamp(task.startTime)}
                      <br />
                      {formatTimestamp(task.endTime - task.startTime)}
                      <br /> */}



                      {task.startTime && task.endTime ? (
                        (() => {
                          // Convert BigInt to Number for calculation
                          const startTime = Number(task.startTime);
                          const endTime = Number(task.endTime);

                          // Calculate the total difference in seconds
                          const totalSeconds = Math.floor((endTime - startTime));

                          // Calculate minutes and seconds
                          const minutes = Math.floor(totalSeconds / 60);
                          const seconds = totalSeconds % 60;

                          // Determine the output format
                          if (minutes > 0) {
                            return `${minutes} m ${seconds} s`;
                          } else {
                            return `${seconds} s`; // Only display seconds if minutes are 0
                          }
                        })()
                      ) : (
                        "Failed"
                      )}



                    </span>
                  </td>

                  <td className="text-center">
                    <span
                      className={`px-4 py-2 text-center relative m-1 bg-opacity-40 rounded-xl text-[#DA810D] block ${task.success ? "bg-green-600" : "bg-orange-600"
                        }`}
                    >
                      {task.success ? "Success" : "Fail"}
                    </span>
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
