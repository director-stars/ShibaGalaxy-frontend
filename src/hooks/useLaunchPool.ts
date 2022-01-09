import { useCallback, useState, useEffect } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useLaunchPool } from 'hooks/useContract'
import useRefresh from './useRefresh'
import { 
  getStartTime,
  getDepositedAmount,
  getPeriod,
  getMinimumInvestAmount,
  getOldTokenAmount,
  getOldClaimAmount,
  invest,
  withdraw,
  claim
} from '../utils/launchPoolUtils'

export const useGetStartTime = () => {
  const { account } = useWallet()
  const launchPool = useLaunchPool();
  // console.log(account);
  const [startTime, setStartTime] = useState(0)
  const { fastRefresh } = useRefresh()
  useEffect(() => {
    const fetchBalance = async () => {
      const res = await getStartTime(launchPool, account);
      // console.log('doges:', res)
      setStartTime(res)
    }
    fetchBalance()
  }, [account, fastRefresh, launchPool])

  return startTime
}

export const useGetDepositedAmount = () => {
  const { account } = useWallet()
  const launchPool = useLaunchPool();
  // console.log(account);
  const [depositedAmount, setDepositedAmount] = useState(0)
  const { fastRefresh } = useRefresh()
  useEffect(() => {
    const fetchBalance = async () => {
      const res = await getDepositedAmount(launchPool, account);
      // console.log('doges:', res)
      setDepositedAmount(res)
    }
    fetchBalance()
  }, [account, fastRefresh, launchPool])

  return depositedAmount
}

export const useGetPeriod = () => {
  const { account } = useWallet()
  const launchPool = useLaunchPool();
  // console.log(account);
  const [period, setPeriod] = useState(0)
  const { fastRefresh } = useRefresh()
  useEffect(() => {
    const fetchBalance = async () => {
      const res = await getPeriod(launchPool, account);
      // console.log('doges:', res)
      setPeriod(res)
    }
    fetchBalance()
  }, [account, fastRefresh, launchPool])

  return period
}

// export const useGetMinimumInvestAmount = () => {
//   const { account } = useWallet()
//   const launchPool = useLaunchPool();
//   // console.log(account);
//   const [minimumInvestAmount, setMinimumInvestAmount] = useState([])
//   const { fastRefresh } = useRefresh()
//   useEffect(() => {
//     const fetchBalance = async () => {
//       const res = await getMinimumInvestAmount(launchPool, account);
//       // console.log('doges:', res)
//       setMinimumInvestAmount(res)
//     }
//     fetchBalance()
//   }, [account, fastRefresh, launchPool])

//   return doges
// }

export const useGetOldTokenAmount = () => {
  const { account } = useWallet()
  const launchPool = useLaunchPool();
  // console.log(account);
  const [oldTokenAmount, setOldTokenAmount] = useState(0)
  const { fastRefresh } = useRefresh()
  useEffect(() => {
    const fetchBalance = async () => {
      const res = await getOldTokenAmount(launchPool, account);
      // console.log('doges:', res)
      setOldTokenAmount(res)
    }
    fetchBalance()
  }, [account, fastRefresh, launchPool])

  return oldTokenAmount
}

export const useGetOldClaimAmount = () => {
  const { account } = useWallet()
  const launchPool = useLaunchPool();
  // console.log(account);
  const [oldClaimAmount, setOldClaimAmount] = useState(0)
  const { fastRefresh } = useRefresh()
  useEffect(() => {
    const fetchBalance = async () => {
      const res = await getOldClaimAmount(launchPool, account);
      // console.log('doges:', res)
      setOldClaimAmount(res)
    }
    fetchBalance()
  }, [account, fastRefresh, launchPool])

  return oldClaimAmount
}

export const useInvestSHIBGX = () => {
  const { account } = useWallet()
  const launchPool = useLaunchPool();
  const handleInvestSHIBGX = useCallback(
    async (amount) => {
      try {
        const result = await invest(launchPool, account, amount)
        return result
      } catch (e) {
        return false
      }
    },
    [account, launchPool],
  )
  return { onInvestSHIBGX: handleInvestSHIBGX }
}

export const useWithdrawSHIBGX = () => {
  const { account } = useWallet()
  const launchPool = useLaunchPool();
  const handleWithdrawSHIBGX = useCallback(
    async () => {
      try {
        const result = await withdraw(launchPool, account)
        return result
      } catch (e) {
        return false
      }
    },
    [account, launchPool],
  )
  return { onWithdrawSHIBGX: handleWithdrawSHIBGX }
}

export const useClaim = () => {
  const { account } = useWallet()
  const launchPool = useLaunchPool();
  const handleClaim = useCallback(
    async () => {
      try {
        const result = await claim(launchPool, account)
        return result
      } catch (e) {
        return false
      }
    },
    [account, launchPool],
  )
  return { onClaim: handleClaim }
}