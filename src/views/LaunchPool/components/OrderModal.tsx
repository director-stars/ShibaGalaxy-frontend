import React, { useState, useEffect, useCallback } from 'react'
import { Button, Modal, Text } from '@pancakeswap-libs/uikit'
import { useInvestSHIBGX, useWithdrawSHIBGX, useClaim } from 'hooks/useLaunchPool'
import TicketInput from 'components/TicketInput'
import styled from 'styled-components'

const StyledDiv = styled.div`
  color: #fff;
  font-size: 18px;
  // text-align: center;
  line-height: 22px;
  & a {
    width: 100%;
    justify-content: center;
  }
  max-width: 500px;
`
const SellInfo = styled.div`
  color: #fff;
  font-size: 18px;
  margin-top: 20px;
  line-height: 40px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  column-gap: 20px;
`
const InputField = styled.div`
  display: grid;
  max-width: 300px;
`
const StyledText = styled.div`
  font-size: 14px;
  text-align: right;
  line-height: 16px;
  margin-top: 20px;
  max-width: 200px;
  margin-left: auto;
`
interface ResultModalProps {
    title?: string
    onDismiss?: () => void
    id?: string
    // startTime?: number
    // period?: number
    // depositedAmount?: number
    tokenBalance?: number
    stoneBalance?: number
}

const OrderModal: React.FC<ResultModalProps> = ({ onDismiss, title="result", id = '', tokenBalance = 0, stoneBalance = 0 }) => {
  // console.log('stoneBalance: ', stoneBalance)
    const [val, setVal] = useState('');
    // const [receiveTokenAmount, setReceiveTokenAmount] = useState(0);
    const [pendingTx, setPendingTx] = useState(false)
    // const [status, setStatus] = useState(false)
    const { onInvestSHIBGX } = useInvestSHIBGX()
    const { onWithdrawSHIBGX } = useWithdrawSHIBGX()
    const { onClaim } = useClaim()
    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
      setVal(e.currentTarget.value)
      // setReceiveTokenAmount(Math.round(parseInt(e.currentTarget.value)*0.95*100)/100);
    }
    const handleSelectMax = useCallback(() => {
      // if (Number(maxTickets) > permittedMaxTickets) {
      //   setVal(tokenBalance.toString())
      // } else {
        setVal(Math.floor(tokenBalance / 10 ** 9).toString())
      // }
    }, [tokenBalance])
    // console.log('val: ', parseInt(val))
    // const availableTime = startTime + period;
    // console.log(Date.now());
    // console.log('availableTime', availableTime)
    // useEffect(() => {
    //   setStatus(Date.now() < availableTime * 1000);
    // }, [availableTime])
    // const status = Date.now() < availableTime * 1000;
    // console.log('status', status)
    const string = "You don't have Magic Stone.";
    return (
        <Modal title={title} onDismiss={onDismiss}>
          {(id === "invest")?(<>
          {(parseInt(stoneBalance.toString()) === 0)?(<Text color="red"> {string}</Text>):(<></>)}
          
          <SellInfo>
            Amount
            <InputField>
              <TicketInput
                value={val}
                onChange={handleChange}
                onSelectMax={handleSelectMax}
                max={tokenBalance}
                symbol="SHIBGX"
                availableSymbol="SHIBGX"
              />
            </InputField>
          </SellInfo>
          <Button fullWidth
            disabled={pendingTx || parseInt(val) === 0 || val === ''}
            onClick={async () => {
              setPendingTx(true)
              const txHash = await onInvestSHIBGX(val)
              setPendingTx(false)
              onDismiss()
            }}
          >
            {pendingTx ? 'Pending Investing' : 'Invest'}
          </Button>
          </>):(
          <>
          <Button fullWidth
            disabled={pendingTx}
            onClick={async () => {
              setPendingTx(true)
              if(id==='withdraw')
                await onWithdrawSHIBGX()
              else 
                await onClaim()
              setPendingTx(false)
              onDismiss()
            }}
          >
            {(id==='withdraw')?(<>{pendingTx ? 'Pending Withdrawing' : 'Withdraw'}</>):(<>{pendingTx ? 'Pending Claiming' : 'Claim'}</>)}
          </Button>
          </>)}
        </Modal>
      )
}

export default OrderModal