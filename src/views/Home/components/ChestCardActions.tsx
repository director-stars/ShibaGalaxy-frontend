import React, { useEffect, useCallback, useState } from 'react'
import styled from 'styled-components'
import { Button, ToastContainer, useWalletModal } from '@pancakeswap-libs/uikit'
import { useCryptoDogeControllerAllowance } from 'hooks/useAllowance'
import { useCryptoDogeControllerApprove } from 'hooks/useApprove'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useBuyCryptoDoge, useDogeBalance } from 'hooks/useDogesLand'

const CardActions = styled.div`
  display: flex;
  justify-content: center;
  // margin-top: ${(props) => props.theme.spacing[3]}px;

  ${({ theme }) => theme.mediaQueries.lg} {
    justify-content: space-between;
  }
  margin-top: 50px;
`
interface ChestCardActionProps {
  price: string
}

const ChestCardActions: React.FC<ChestCardActionProps> = ({price}) => {
  // const [requestedApproval, setRequestedApproval] = useState(false)
  const [toasts, setToasts] = useState([]);
  // const allowance = useCryptoDogeControllerAllowance()
  // const { onApprove } = useCryptoDogeControllerApprove()
  // console.log(parseInt(window.localStorage.getItem("shibgxBalance")))
  // const [shibgxBalance, setShibgxBalance] = useState(parseInt(window.localStorage.getItem("shibgxBalance")));  
  // const [dogeNFTBalance, setDogeNFTBalance] = useState(parseInt(window.localStorage.getItem("dogeNFTBalance")));
  // setShibgxBalance(parseInt(window.localStorage.getItem("shibgxBalance")));
  // setDogeNFTBalance(parseInt(window.localStorage.getItem("dogeNFTBalance")));
  // console.log('shibgxBalance', shibgxBalance)
  // const handleApprove = useCallback(async () => {
  //   try {
  //     setRequestedApproval(true)
  //     const txHash = await onApprove()
  //     // user rejected tx or didn't go thru
  //     if (!txHash) {
  //       setRequestedApproval(false)
  //     }
  //     // onPresentApprove()
  //   } catch (e) {
  //     console.error(e)
  //   }
  // }, [onApprove])

  const { account, connect, reset } = useWallet()
  // useEffect(() => {
  //   console.log(parseInt(window.localStorage.getItem("shibgxBalance")))
  //   console.log(console.log('in useEffect', shibgxBalance))
  // }, [shibgxBalance])
  useEffect(() => {
    if (!account && window.localStorage.getItem('accountStatus')) {
    connect('injected')
    }
  }, [account, connect])
  
  const { onPresentConnectModal } = useWalletModal(connect, reset)
  const [pendingTx, setPendingTx] = useState(false)

  const [, setRequestedBuy] = useState(false)
  const { onBuyDoge } = useBuyCryptoDoge()

  const handleBuy = useCallback(async () => {
    try {
      setRequestedBuy(true)
      const txHash = await onBuyDoge(price)
      // user rejected tx or didn't go thru
      if (txHash) {
        setRequestedBuy(false)
      }
    } catch (e) {
      console.error(e)
    }
  }, [onBuyDoge, setRequestedBuy, price])
  
  const { onGetDogeBalance } = useDogeBalance()
  const handleGetDogeBalance = useCallback(async () => {
    try {
      await onGetDogeBalance()
      // setShibgxBalance(parseInt(window.localStorage.getItem("shibgxBalance")));
      // setDogeNFTBalance(parseInt(window.localStorage.getItem("dogeNFTBalance")));
    } catch (e) {
      console.error(e)
    }
  }, [onGetDogeBalance])

  const handleClick = (description = "") => {
    const now = Date.now();
    const randomToast = {
      id: `id-${now}`,
      title: `Please check your shibas.`,
      description,
      type: "success",
    };

    setToasts((prevToasts) => [randomToast, ...prevToasts]);
  };

  const handleRemove = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((prevToast) => prevToast.id !== id));
  };

  // console.log('shibgxBalance: ', shibgxBalance)

  const renderDogeCardButtons = () => {
    if(parseInt(window.localStorage.getItem("dogeNFTBalance")) > 4){
      return (
          <Button fullWidth disabled size="sm">
            You have enough shibas
          </Button>
      ) 
    }
    if(parseFloat(window.localStorage.getItem("bnbBalance")) / 10**18 < parseFloat(price)){
      return (
          <Button fullWidth disabled size="sm">
            Not enough BNB
          </Button>
      ) 
    }
    // if (!allowance.toNumber()) {
    //   return (
    //     <Button fullWidth disabled={requestedApproval} size="sm" onClick={handleApprove}>
    //       Approve
    //     </Button>
    //   )
    // }
    
    return (
        <Button fullWidth size="sm"
        disabled={pendingTx}
        onClick={async () => {
            setPendingTx(true)
            await handleBuy()
            await handleGetDogeBalance()
            setPendingTx(false)
            window.scrollTo(0, 0);
            handleClick()
        }}>{pendingTx ? 'Pending Buy Shiba' : 'Buy Shiba'}</Button>
    )
  }

  return (
    <CardActions>
      {account? (renderDogeCardButtons())
        : (<Button fullWidth size="sm" onClick={onPresentConnectModal}>Connect Wallet</Button>)}
    <ToastContainer toasts={toasts} onRemove={handleRemove} />
    </CardActions>
  )
}

export default ChestCardActions
