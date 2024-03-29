import React, { useEffect, useCallback, useState } from 'react'
import styled from 'styled-components'
import { Button, ToastContainer, useWalletModal } from '@pancakeswap-libs/uikit'
import { useCryptoDogeControllerAllowance } from 'hooks/useAllowance'
import { useCryptoDogeControllerApprove } from 'hooks/useApprove'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useBuyCryptoDoge } from 'hooks/useDogesLand'
import useRefresh from 'hooks/useRefresh'

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
  payment:number
  priceShibaWithToken:string
  tokenBalance: number
  bnbBalance: number
  shibaNftBalance: number
}

const ChestCardActions: React.FC<ChestCardActionProps> = ({price, bnbBalance, shibaNftBalance, payment, priceShibaWithToken, tokenBalance}) => {
  const [toasts, setToasts] = useState([]);
  const { fastRefresh } = useRefresh()

  // console.log('payment: ', payment);

  const { account, connect, reset } = useWallet()
  useEffect(() => {
    if (!account && window.localStorage.getItem('accountStatus')) {
    connect('injected')
    }
    // setBnbBalance(parseFloat(window.localStorage.getItem("bnbBalance")))
    // setDogeNFTBalance(parseFloat(window.localStorage.getItem("dogeNFTBalance")))
    // console.log('effect')
  }, [account, connect, fastRefresh])
  
  const { onPresentConnectModal } = useWalletModal(connect, reset)
  const [pendingTx, setPendingTx] = useState(false)

  const [, setRequestedBuy] = useState(false)
  const { onBuyDoge } = useBuyCryptoDoge()

  const handleBuy = useCallback(async () => {
    try {
      setRequestedBuy(true)
      let txHash;
      if(payment === 0)
        txHash = await onBuyDoge(payment, price)
      else
        txHash = await onBuyDoge(payment, priceShibaWithToken)
      // user rejected tx or didn't go thru
      if (txHash) {
        setRequestedBuy(false)
      }
    } catch (e) {
      console.error(e)
    }
  }, [onBuyDoge, setRequestedBuy, payment, price, priceShibaWithToken])
  
  // const { onGetDogeBalance } = useDogeBalance()
  // const handleGetDogeBalance = useCallback(async () => {
  //   try {
  //     await onGetDogeBalance()
  //     // setShibgxBalance(parseInt(window.localStorage.getItem("shibgxBalance")));
  //     // setDogeNFTBalance(parseInt(window.localStorage.getItem("dogeNFTBalance")));
  //   } catch (e) {
  //     console.error(e)
  //   }
  // }, [onGetDogeBalance])

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

  const [requestedApproval, setRequestedApproval] = useState(false)
  const allowance = useCryptoDogeControllerAllowance()
  const { onApprove } = useCryptoDogeControllerApprove()

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      const txHash = await onApprove()
      // user rejected tx or didn't go thru
      if (!txHash) {
        setRequestedApproval(false)
      }
      // onPresentApprove()
    } catch (e) {
      console.error(e)
    }
  }, [onApprove])

  // console.log('shibgxBalance: ', shibgxBalance)

  const renderDogeCardButtons = () => {
    if(parseInt(shibaNftBalance.toString()) > 4){
      return (
          <Button fullWidth disabled size="sm">
            You have enough shibas
          </Button>
      ) 
    }
    if(payment === 0){
      if(parseFloat(bnbBalance.toString()) / 10**18 < parseFloat(price)){
        return (
            <Button fullWidth disabled size="sm">
              Not enough BNB
            </Button>
        ) 
      }
    }
    else if(payment === 1){
      if (!allowance.toNumber()) {
        return (
          <Button fullWidth disabled={requestedApproval} size="sm" onClick={handleApprove}>
            Approve
          </Button>
        )
      }
      if(parseInt(tokenBalance.toString()) < parseInt(priceShibaWithToken)){
        return (
            <Button fullWidth disabled size="sm">
              Not enough $SHIBGX
            </Button>
        ) 
      }
    }
    
    return (
        <Button fullWidth size="sm"
        disabled={pendingTx}
        onClick={async () => {
            setPendingTx(true)
            await handleBuy()
            // await handleGetDogeBalance()
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
