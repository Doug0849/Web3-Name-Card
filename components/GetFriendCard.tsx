import { useEffect, useState } from "react";
import { Text } from "@chakra-ui/react";
import { useAccount, useContractRead } from "wagmi";
import AddFriendsAbi from "../abi/AddFriendsAbi.json";
import { ensDataType } from "../types/ensType";
import useEnsData from "../hooks/useEnsData";
import Card from "./Card";
import { colorRawType } from "../types/colorRawType";
import useImgColor from "../hooks/useImgColor";

const GetFriendCard = ({ index }: any) => {
  const [friendAddr, setFriendAddr] = useState("");
  const { address } = useAccount();
  const { data, isLoading, isError } = useContractRead({
    address: "0x370e7EC0CfB1Ac13D4AAeAFf54374383eA88d303",
    abi: AddFriendsAbi,
    chainId: 5,
    functionName: "myFriends",
    args: [address, index],
    onSuccess(data) {
      setFriendAddr(data)
    },
  });
  const ensData: ensDataType = useEnsData(friendAddr);
  const imgColor: Array<colorRawType> = useImgColor(ensData.avatarUrl || "");
  const [sortedColors, setSortedColors] = useState<Array<colorRawType>>([]);

  useEffect(() => {
    setSortedColors(sortColors(imgColor));
  }, [imgColor]);

  const convertColor = (clr: colorRawType | undefined) => {
    if (clr) {
      return `rgb(${clr._rgb[0]},${clr._rgb[1]},${clr._rgb[2]})`;
    } else {
      return "";
    }
  };

  const getBrightness = (clr: colorRawType) => {
    if (clr) {
      return clr._rgb[0] * 0.299 + clr._rgb[1] * 0.587 + clr._rgb[2] * 0.114;
    } else {
      return 0;
    }
  };

  const sortColors = (colors: Array<colorRawType>) => {
    if (!colors) return [];
    let clrs = colors
      .map((clr) => ({ clr, brightness: getBrightness(clr) }))
      .sort((a, b) => {
        return a.brightness - b.brightness;
      })
      .map(({ clr }) => clr);
    return clrs;
  };

  return (
    <>
      <Card
        cardData={ensData}
        colors={sortedColors}
        cardBgColor={convertColor(imgColor && imgColor[1])}
      />
    </>
  );
};

export default GetFriendCard;
