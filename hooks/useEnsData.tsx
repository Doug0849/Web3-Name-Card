import { useEffect, useState } from "react";
import { useProvider, useAccount, useEnsName } from "wagmi";

const useEnsData = (_addrss?: string, _ensName?: string) => {
  const addr: any = _addrss;
  const { data, isError, isLoading } = useEnsName({
    address: addr,
    onError(error) {
      console.log("Error", error);
    },
  });
  const [retEnsData, setRetEnsData] = useState({});
  const provider = useProvider();

  useEffect(() => {
    if (_ensName || addr) {
      setEnsData(_ensName || data);
    }
  }, [_ensName, addr]);

  async function setEnsData(ensName: string) {
    // 若有_ensName就可以帶入setEnsData來宣告變數resolver = provider.getResolver(ensName)，若確定可以取得解析器，則可以再透過解析器取得ENS資料。
    // 各項ENS資料的取得方式不太一樣大部分為使用resolver.getText
    // 只有ethAddress是provider.resolveName(ensName)
    // Avatar為resolver.getAvatar()
    // avatarUrl為 avatar?.url

    const resolver = await provider.getResolver(ensName);
    if (!resolver) {
      setRetEnsData({});
      return;
    }

    const email = await resolver.getText("email");
    const twitter = await resolver.getText("com.twitter");
    const github = await resolver.getText("com.github");
    const discord = await resolver.getText("com.discord");
    const websiteUrl = await resolver.getText("url");
    const ethAddress = await provider.resolveName(ensName);
    const avatar = await resolver.getAvatar();
    const avatarUrl = avatar?.url;
    setRetEnsData({
      email,
      ethAddress,
      twitter,
      github,
      discord,
      ensName,
      avatarUrl,
      websiteUrl,
    });
  }
  return retEnsData;
};

export default useEnsData;
