import { Box, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useAccount } from "wagmi";
import useFriendsCount from "../hooks/useFriendsCount";

const FriendsBox = () => {
  const count: number = useFriendsCount();

  return (
    <Box>
      <Text>好友數：{count}</Text>
    </Box>
  );
};
export default FriendsBox;
