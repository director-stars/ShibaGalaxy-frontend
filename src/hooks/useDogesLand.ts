import { useCallback, useState, useEffect } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useCryptoDogeController, useCryptoDogeNFT, useMarketController, useOneDoge, useMagicStoneController, useAirDropContract, useMagicStoneNFT } from 'hooks/useContract'
import useRefresh from './useRefresh'
import {
  getBuyDogeToken,
  getDecreaseFNToken,
  getFillOrderToken,
  getOpenChestToken,
  getUpdateEarnedAmountToken,
} from './useDogeInfo'
import { 
  getMyFightDoges, 
  getMonsters, 
  buyDoge, 
  getLastTokenId, 
  dbCreateDoge, 
  dbUpdateOwner,
  fightMonster, 
  getRewardTokenInfo, 
  claimReward, 
  orderDoge,
  getDogeOfSaleByOwner,
  getDogeOfSale,
  getDogeByOwner,
  openChest,
  cancelOrder,
  fillOrder,
  getStoneNFTBalance,
  getBnbBalance,
  getShibaNFTBalance,
  getTokenBalance,
  buyStone,
  unsetAutoFight,
  setAutoFight,
  getResultOfAutoFight,
  getStoneByOwner,
  getNextClaimTime,
  getAirDropInfo,
  claimAirDrop,
  dbGetReferralHistory,
  getShibaSupply,
  getStoneSupply,
  dbUpdateEarnedAmount,
  dbGetClaimList
} from '../utils/dogelandUtils'

// export const useBattleBosses = () => {
//   const [bosses, setBosses] = useState([])
//   const { fastRefresh } = useRefresh()

//   useEffect(() => {
//     const fetchBalance = async () => {
//       const res = await getBattleBosses()
//       setBosses(res)
//     }
//     fetchBalance()
//   }, [fastRefresh])

//   return bosses
// }

export const useMyFightDoges = () => {
  const { account } = useWallet()
  const marketController = useMarketController();
  // console.log(account);
  const [doges, setDoges] = useState([])
  const { fastRefresh } = useRefresh()
  useEffect(() => {
    const fetchBalance = async () => {
      const res = await getMyFightDoges(marketController, account);
      // console.log('doges:', res)
      setDoges(res)
    }
    fetchBalance()
  }, [account, fastRefresh, marketController])

  return doges
}

export const useMonsters = () => {
  const [monsters, setMonsters] = useState([])
  const { fastRefresh } = useRefresh()
  const cryptoDogeControllerContract = useCryptoDogeController()

  useEffect(() => {
    const fetchBalance = async () => {
      const res = await getMonsters(cryptoDogeControllerContract);
      setMonsters(res)
    }
    fetchBalance()
  }, [fastRefresh, cryptoDogeControllerContract])

  return monsters
}

export const useNextClaimTime = () => {
  const [nextClaimTime, setNextClaimTime] = useState()
  const { fastRefresh } = useRefresh()
  const cryptoDogeControllerContract = useCryptoDogeController();
  const { account } = useWallet()
  useEffect(() => {
    const fetchBalance = async () => {
      const res = await getNextClaimTime(cryptoDogeControllerContract, account);
      setNextClaimTime(res)
    }
    fetchBalance()
  }, [fastRefresh, cryptoDogeControllerContract, account])

  return nextClaimTime;
}

export const useBuyCryptoDoge = () => {
  const { account } = useWallet()
  const cryptoDogeControllerContract = useCryptoDogeController()
  // const cryptoDogeNFTContract = useCryptoDogeNFT();
  // const oneDogeContract = useOneDoge();
  const handleBuy = useCallback(
    async (price) => {
      try {
        // const firstPurchaseTime = await cryptoDogeNFTContract.methods.firstPurchaseTime(account).call();
        const txHash = await buyDoge(cryptoDogeControllerContract, account, price)
        // const lastTokenId = await getLastTokenId(cryptoDogeNFTContract, account);
        // const _classInfo = "0";
        // const token = getBuyDogeToken(lastTokenId, account, _classInfo);
        // await dbCreateDoge(lastTokenId, firstPurchaseTime, account, 0, token);
        // await getBalance(cryptoDogeNFTContract, oneDogeContract, account, );
        return txHash
      } catch (e) {
        return false
      }
    },
    // [account, cryptoDogeControllerContract, cryptoDogeNFTContract, oneDogeContract],
    [account, cryptoDogeControllerContract],
  )

  return { onBuyDoge: handleBuy }
}

export const useBuyMagicStone = () => {
  const { account } = useWallet()
  const magicStoneControllerContract = useMagicStoneController()
  // const cryptoDogeNFTContract = useCryptoDogeNFT();

  const handleBuy = useCallback(
    async (price) => {
      try {
        const txHash = await buyStone(magicStoneControllerContract, account, price)
        // const lastTokenId = await getLastTokenId(cryptoDogeNFTContract, account);
        // const dogeInfo = await getDogeInfo(cryptoDogeNFTContract, lastTokenId);
        return txHash
      } catch (e) {
        return false
      }
    },
    [account, magicStoneControllerContract],
  )

  return { onBuyStone: handleBuy }
}

export const useFightCryptoMonster = () => {
  const { account } = useWallet()
  const cryptoDogeNFTContract = useCryptoDogeNFT()
  const cryptoDogeControllerContract = useCryptoDogeController()
  const handleFight = useCallback(
    async (monsterId, dogeId) => {
      try {
        let token = getDecreaseFNToken(dogeId, account);
        const fightResult = await fightMonster(cryptoDogeControllerContract, account, monsterId, dogeId, token)
        const amount = await getRewardTokenInfo(cryptoDogeNFTContract, account);
        token = getUpdateEarnedAmountToken(amount / 10**18, account);
        await dbUpdateEarnedAmount(account, amount / 10**18, token);
        return fightResult
      } catch (e) {
        return false
      }
    },
    [account, cryptoDogeControllerContract, cryptoDogeNFTContract],
  )

  return { onFightMonster: handleFight }
}

export const useRewardTokenInfo = () => {
  const { account } = useWallet()
  const cryptoDogeNFTContract = useCryptoDogeNFT()
  const [rewardAmount, setRewardAmount] = useState([])
  const { fastRefresh } = useRefresh()
  useEffect(() => {
    const fetchBalance = async () => {
      const res = await getRewardTokenInfo(cryptoDogeNFTContract, account);
      setRewardAmount(res)
    }
    fetchBalance()
  }, [account, fastRefresh, cryptoDogeNFTContract])

  return rewardAmount
}

export const useClaimReward = () => {
  const { account } = useWallet()
  const cryptoDogeControllerContract = useCryptoDogeController()
  const handleClaimReward = useCallback(
    async () => {
      try {
        const claimResult = await claimReward(cryptoDogeControllerContract, account)
        return claimResult
      } catch (e) {
        return false
      }
    },
    [account, cryptoDogeControllerContract],
  )

  return { onClaimReward: handleClaimReward }
}

export const useOrderCryptoDoge = () => {
  const { account } = useWallet()
  const cryptoDogeNFTContract = useCryptoDogeNFT()
  const handleOrderDoge = useCallback(
    async (_tokenId, _price) => {
      try {
        const result = await orderDoge(cryptoDogeNFTContract, account, _tokenId, _price)
        return result
      } catch (e) {
        return false
      }
    },
    [account, cryptoDogeNFTContract],
  )
  return { onOrderDoge: handleOrderDoge }
}

export const useCancelOrder = () => {
  const { account } = useWallet()
  const cryptoDogeNFTContract = useCryptoDogeNFT()
  const handleCancelOrder = useCallback(
    async (_tokenId) => {
      try {
        const result = await cancelOrder(cryptoDogeNFTContract, account, _tokenId)
        return result
      } catch (e) {
        return false
      }
    },
    [account, cryptoDogeNFTContract],
  )
  return { onCancelOrder: handleCancelOrder }
}

export const useFillOrder = () => {
  const { account } = useWallet()
  const cryptoDogeNFTContract = useCryptoDogeNFT()
  const oneDogeContract = useOneDoge();
  const handleFillOrder = useCallback(
    async (_tokenId) => {
      try {
        const firstPurchaseTime = await cryptoDogeNFTContract.methods.firstPurchaseTime(account).call();
        const result = await fillOrder(cryptoDogeNFTContract, account, _tokenId)
        const token = getFillOrderToken(_tokenId, account);
        await dbUpdateOwner(_tokenId, firstPurchaseTime, account, token);
        // await getBalance(cryptoDogeNFTContract, oneDogeContract, account, );
        return result
      } catch (e) {
        return false
      }
    },
    [account, cryptoDogeNFTContract],
  )
  return { onFillOrder: handleFillOrder }
}

export const useOpenChest = () => {
  const { account } = useWallet()
  const cryptoDogeControllerContract = useCryptoDogeController()
  const handleOpenChest = useCallback(
    async (_tokenId) => {
      try {
        const result = await openChest(cryptoDogeControllerContract, account, _tokenId)
        // const _classInfo = result.events.DNASet.returnValues._classInfo;
        // const token = getOpenChestToken(_tokenId, account, _classInfo);
        // await dbCreateDoge(_tokenId, account, _classInfo, token);
        return result
      } catch (e) {
        return false
      }
    },
    [account, cryptoDogeControllerContract],
  )

  return { onOpenChest: handleOpenChest }
}

export const useMySaleDoges = () => {
  const { account } = useWallet()
  const marketController = useMarketController();
  // console.log(account);
  const [doges, setDoges] = useState([])
  const { fastRefresh } = useRefresh()
  useEffect(() => {
    const fetchBalance = async () => {
      const saleDoges = await getDogeOfSaleByOwner(marketController, account);
      setDoges(saleDoges)
    }
    fetchBalance()
  }, [account, fastRefresh, marketController])

  return doges
}

export const useMyUnSaleDoges = () => {
  const { account } = useWallet()
  const marketController = useMarketController();
  const [doges, setDoges] = useState([])
  const { fastRefresh } = useRefresh()
  useEffect(() => {
    const fetchBalance = async () => {
      const unsaleDoges = await getDogeByOwner(marketController, account)
      setDoges(unsaleDoges)
    }
    fetchBalance()
  }, [account, fastRefresh, marketController])

  return doges
}

export const useSaleDoges = () => {
  // const { account } = useWallet()
  // console.log(account);
  const [doges, setDoges] = useState([])
  const { fastRefresh } = useRefresh()
  const marketController = useMarketController();
  
  useEffect(() => {
    const fetchSaleDoges = async () => {
      const saleDoges = await getDogeOfSale(marketController);
      // console.log('saleDoges:', saleDoges)
      setDoges(saleDoges)
    }
    fetchSaleDoges()
  }, [fastRefresh, marketController])

  return doges
}

export const useGetBnbBalance = () => {
  const { account } = useWallet()
  const [balance, setBalance] = useState(0)
  const { fastRefresh } = useRefresh()
  useEffect(() => {
    const fetchBalance = async () => {
      const result = await getBnbBalance(account);
      setBalance(result);
    }
    fetchBalance()
  }, [fastRefresh, account])
  return balance;
}

export const useTokenBalance = () => {
  const { account } = useWallet()
  const oneDogeContract = useOneDoge();
  const [balance, setBalance] = useState(0)
  const { fastRefresh } = useRefresh()
  useEffect(() => {
    const fetchBalance = async () => {
      const result = await getTokenBalance( oneDogeContract, account );
      setBalance(result);
    }
    fetchBalance()
  }, [fastRefresh, oneDogeContract, account])
  return balance;
}

export const useShibaNFTBalance = () => {
  const { account } = useWallet()
  const cryptoDogeNFTContract = useCryptoDogeNFT();
  const [balance, setBalance] = useState(0)
  const { fastRefresh } = useRefresh()
  useEffect(() => {
    const fetchBalance = async () => {
      const result = await getShibaNFTBalance( cryptoDogeNFTContract, account );
      setBalance(result);
    }
    fetchBalance()
  }, [fastRefresh, cryptoDogeNFTContract, account])
  return balance;
}

export const useStoneNFTBalance = () => {
  const { account } = useWallet()
  const stoneNFTContract = useMagicStoneNFT();
  const [balance, setBalance] = useState(0)
  const { fastRefresh } = useRefresh()
  useEffect(() => {
    const fetchBalance = async () => {
      const result = await getStoneNFTBalance( stoneNFTContract, account );
      setBalance(result);
    }
    fetchBalance()
  }, [fastRefresh, stoneNFTContract, account])
  return balance;
}

export const useMyStone = () => {
  const { account } = useWallet()
  const marketController = useMarketController();
  const [stones, setStones] = useState([])
  const { fastRefresh } = useRefresh()
  useEffect(() => {
    const fetchBalance = async () => {
      const myStones = await getStoneByOwner(marketController, account)
      // console.log('useDogesLand', myStones)
      setStones(myStones)
    }
    fetchBalance()
  }, [account, fastRefresh, marketController])

  return stones
}

export const useUnsetAutoFight = () => {
  const { account } = useWallet()
  // const { fastRefresh } = useRefresh()
  const magicStoneControllerContract = useMagicStoneController()
  const handleUnsetAutoFight = useCallback(
    async (_tokenId) => {
      try {
        const result = await unsetAutoFight(magicStoneControllerContract, account, _tokenId)
        return result
      } catch (e) {
        return false
      }
    },
    [account, magicStoneControllerContract],
  )
  return { onUnsetAutoFight: handleUnsetAutoFight }
}

export const useSetAutoFight = () => {
  const { account } = useWallet()
  const magicStoneControllerContract = useMagicStoneController()
  const handleSetAutoFight = useCallback(
    async (_tokenId, _stoneId, _monsterId) => {
      try {
        const result = await setAutoFight(magicStoneControllerContract, account, _tokenId, _stoneId, _monsterId)
        return result
      } catch (e) {
        return false
      }
    },
    [account, magicStoneControllerContract],
  )
  return { onSetAutoFight: handleSetAutoFight }
}

export const useGetResultOfAutoFight = () => {
  const { account } = useWallet()
  const magicStoneControllerContract = useMagicStoneController()
  const handleGetResultOfAutoFight = useCallback(
    async (_tokenId) => {
      try {
        const result = await getResultOfAutoFight(magicStoneControllerContract, account, _tokenId)
        return result
      } catch (e) {
        return false
      }
    },
    [account, magicStoneControllerContract],
  )
  return { onGetResultOfAutoFight: handleGetResultOfAutoFight }
}

export const useAirDropInfo = () => {
  const { account } = useWallet()
  const [airDropInfo, setAirDropInfo] = useState(false)
  const airDropContract = useAirDropContract();
  const { fastRefresh } = useRefresh()
  useEffect(() => {
    const fetchBalance = async () => {
      const info = await getAirDropInfo(airDropContract, account)
      // console.log('useDogesLand', myStones)
      setAirDropInfo(info)
    }
    fetchBalance()
  }, [account, fastRefresh, airDropContract])

  return airDropInfo
}

export const useClaimAirDrop = () => {
  const { account } = useWallet()
  const airDropContract = useAirDropContract();
  const handleClaimAirDrop = useCallback(
    async () => {
      try {
        const result = await claimAirDrop(airDropContract, account)
        return result
      } catch (e) {
        return false
      }
    },
    [account, airDropContract],
  )
  return { onClaimAirDrop: handleClaimAirDrop }
}
export const useReferralHistory = () => {
  const [history, setHistory] = useState([])

  useEffect(() => {
    const getHistory = async () => {
      const referralHistory = await dbGetReferralHistory();
      setHistory(referralHistory);
    }
    getHistory();
  },[]);
  return history;
}

export const useGetTotalShibaSupply = () => {
  const [shibaSupply, setShibaSupply] = useState(0);
  const cryptoDogeNFTContract = useCryptoDogeNFT();
  useEffect(() => {
    const fetchShibaSupply = async () => {
      const supply = await getShibaSupply(cryptoDogeNFTContract);
      setShibaSupply(supply);
    }
    fetchShibaSupply();
  },[cryptoDogeNFTContract]);
  return shibaSupply;
}

export const useGetTotalStoneSupply = () => {
  const [stoneSupply, setStoneSupply] = useState(0)
  const magicStoneNFTContract = useMagicStoneNFT();
  useEffect(() => {
    const fetchStoneSupply = async () => {
      const supply = await getStoneSupply(magicStoneNFTContract);
      setStoneSupply(supply);
    }
    fetchStoneSupply();
  },[magicStoneNFTContract]);
  return stoneSupply;
}

export const useClaimList = () => {
  const [list, setList] = useState([])

  useEffect(() => {
    const getList = async () => {
      const claimList = await dbGetClaimList();
      setList(claimList);
    }
    getList();
  },[]);
  return list;
}