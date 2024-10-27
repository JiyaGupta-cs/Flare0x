"use client";

// import { CreateTask} from "@/containers/contract/WriteContract";
import { ReadContract } from "@/containers/contract/ReadContract";

import { useAccount } from "wagmi";
import { useEffect } from "react";

function ContractExample() {

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.open = (function (open) {
        return function (url, _, features) {
          return open.call(window, url, "_blank", features);
        };
      })(window.open);
    }
  }, []);
  
  
  const { isConnected } = useAccount();
  return (
    <div className="">
      {isConnected ? (
        <>
          <ReadContract />
          {/* <CreateTask/> */}
        </>
      ) : (
        <div className=" flex flex-col gap-4 items-center justify-center text-center text-2xl ">
          Please Connect the Wallet
        </div>
      )}
    </div>
  );
}

export default ContractExample;
