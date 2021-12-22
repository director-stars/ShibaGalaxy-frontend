import React, { useEffect, useCallback, useState } from 'react'
import styled from 'styled-components'
import { Button, ToastContainer, useWalletModal } from '@pancakeswap-libs/uikit'
import { useMagicStoneControllerAllowance } from 'hooks/useAllowance'
import { useMagicStoneControllerApprove } from 'hooks/useApprove'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useBuyMagicStone } from 'hooks/useDogesLand'

const CardActions = styled.div`
  display: flex;
  justify-content: center;
  // margin-top: ${(props) => props.theme.spacing[3]}px;

  ${({ theme }) => theme.mediaQueries.lg} {
    justify-content: space-between;
  }
  margin-top: 50px;
`
interface MagicStoneCardActionProps {
  price: string
  bnbBalance: number
  payment:number
  priceStoneWithToken:string
  tokenBalance: number
}

const MagicStoneCardActions: React.FC<MagicStoneCardActionProps> = ({price, bnbBalance, priceStoneWithToken, payment, tokenBalance}) => {
  const [requestedApproval, setRequestedApproval] = useState(false)
  const [toasts, setToasts] = useState([]);
  const allowance = useMagicStoneControllerAllowance()
  const { onApprove } = useMagicStoneControllerApprove()
  // const [bnbBalance, setBnbBalance] = useState(parseInt(window.localStorage.getItem("bnbBalance")) / 10**18);
  // const dogeNFTBalance = parseInt(window.localStorage.getItem("dogeNFTBalance")) / 10**18;
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

  // const { onGetDogeBalance } = useDogeBalance()
  // const handleGetDogeBalance = useCallback(async () => {
  //   try {
  //     await onGetDogeBalance()
  //     // setBnbBalance(parseInt(window.localStorage.getItem("bnbBalance")) / 10**18);
  //   } catch (e) {
  //     console.error(e)
  //   }
  // }, [onGetDogeBalance])

  const { account, connect, reset } = useWallet()
  useEffect(() => {
    if (!account && window.localStorage.getItem('accountStatus')) {
    connect('injected')
    }
  }, [account, connect])
  
  const { onPresentConnectModal } = useWalletModal(connect, reset)
  const [pendingTx, setPendingTx] = useState(false)

  const [, setRequestedBuy] = useState(false)
  const { onBuyStone } = useBuyMagicStone()

  const handleBuy = useCallback(async () => {
    try {
      setRequestedBuy(true)
      let txHash;
      if(payment === 0)
        txHash = await onBuyStone(payment, price)
      else
        txHash = await onBuyStone(payment, priceStoneWithToken)
      // user rejected tx or didn't go thru
      if (txHash) {
        setRequestedBuy(false)
      }
    } catch (e) {
      console.error(e)
    }
  }, [onBuyStone, setRequestedBuy, payment, price, priceStoneWithToken])

  const handleClick = (description = "") => {
    const now = Date.now();
    const randomToast = {
      id: `id-${now}`,
      title: `Please check auto play.`,
      description,
      type: "success",
    };

    setToasts((prevToasts) => [randomToast, ...prevToasts]);
  };

  const handleRemove = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((prevToast) => prevToast.id !== id));
  };

  const renderStoneCardButtons = () => {
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
      if(parseInt(tokenBalance.toString()) < parseInt(priceStoneWithToken)){
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
        }}>{pendingTx ? 'Pending Buy Stone' : 'Buy Stone'}</Button>
    )
  }

  return (
    <CardActions>
      {account? (renderStoneCardButtons())
        : (<Button fullWidth size="sm" onClick={onPresentConnectModal}>Connect Wallet</Button>)}
    <ToastContainer toasts={toasts} onRemove={handleRemove} />
    </CardActions>
  )
}

export default MagicStoneCardActions
