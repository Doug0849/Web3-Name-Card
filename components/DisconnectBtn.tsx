/* eslint-disable react-hooks/rules-of-hooks */
import { Button } from "@chakra-ui/react";
import { useDisconnect } from "wagmi";

function disconnectBtn() {
  const { disconnect } = useDisconnect();

  return (
    <Button mt="10px" backgroundColor="1D73E9" onClick={() => disconnect()}>
      Disconnect
    </Button>
  );
};

export default disconnectBtn;
