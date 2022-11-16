import { ethers } from "ethers";
import { useState } from "react";
import { useAccount, useContractRead } from "wagmi";
import AddFriendsAbi from "../abi/AddFriendsAbi.json";

const useFriendsCount = () => {
  const [friendsCount, setFriendsCount] = useState();
  const { address } = useAccount();
  const { data, isLoading, isError } = useContractRead({
    address: "0x370e7EC0CfB1Ac13D4AAeAFf54374383eA88d303",
    abi: AddFriendsAbi,
    chainId: 5,
    functionName: "friendsCount",
    args: [address],
    onSuccess(data) {
      setFriendsCount(ethers.utils.hexDataLength(data));
    },
  });

  return friendsCount;
};

export default useFriendsCount;
