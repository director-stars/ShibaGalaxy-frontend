import React, { useEffect, useCallback, useState } from 'react'
import { Heading, Text, useWalletModal, Card, CardBody, CardHeader, CardFooter, Button, Image, useModal } from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useFightCryptoMonster } from 'hooks/useDogesLand'
import { monsters } from 'hooks/useDogeInfo'
import { useCryptoDogeControllerAllowance } from 'hooks/useAllowance'
import { useCryptoDogeControllerApprove } from 'hooks/useApprove'
import ResultModal from './ResultModal'

interface MonsterCardProps {
    id: number
    health: string
    successRate: string
    rewardTokenFrom: string
    rewardTokenTo: string
    rewardExpFrom: string
    rewardExpTo: string
    activeDoge: string
}

const Block = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`
const Label = styled.div`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 14px;
`

const StyledImage = styled.div<{
    imgUrl?: string
}>`
    width:100%;
    min-height: 260px;
    background-image: url(${({ imgUrl }) => imgUrl});
    background-size: cover;
    background-position: center;
`

const StyledHeading = styled(Heading)`
    text-align: center;
    // margin-bottom: 10px;
`
const MonsterInfo = styled.div`
    display: grid;
    line-height: 24px;
    font-size: 1rem;
    margin-bottom: 20px;
`
const PriceInfo = styled.div`
    display: flex;
`
const TokenIcon = styled(Image)`
    width: 24px;
`
const StyledCardHeader = styled(CardHeader)`
    padding: 0px;
    margin: 12px 0px 24px 0px;
`
const StyledCardBody = styled(CardBody)`
    // padding: 0px 24px 24px 24px;
`
const StyledCardFooter = styled(CardBody)`
    padding: 0px 24px 0px 24px;
    background: linear-gradient(180deg,#fea726,#fea726);
    color: #fff;
    border: 2px solid #d63341;
    border-radius: 1.5rem;
    padding: 20px;
    box-shadow: 0 20px 10px 0 rgb(18 16 44 / 50%);
`
const StyledText = styled(Text)`
  color: #fff;
  font-size: 1rem;
`
const MonsterCard: React.FC<MonsterCardProps> = ({id, health, successRate, rewardTokenFrom, rewardTokenTo, rewardExpFrom, rewardExpTo, activeDoge}) => {
    const { account, connect, reset } = useWallet()
    useEffect(() => {
        if (!account && window.localStorage.getItem('accountStatus')) {
        connect('injected')
        }
    }, [account, connect])

    const monsterImage = monsters[id].asset;
    const monsterName = monsters[id].name;

    const [pendingTx, setPendingTx] = useState(false)
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

    const { onPresentConnectModal } = useWalletModal(connect, reset)
    const { onFightMonster } = useFightCryptoMonster()
    const [rewardExp, setRewardExp] = useState("")
    const [rewardToken, setRewardToken] = useState("")
    const [fightNumber, setFightNumber] = useState("")
    const [winNumber, setWinNumber] = useState("")
    const [tx, setTx] = useState('')
    const [error, setError] = useState('')
    
    const oneDogeAmount = window.localStorage.getItem("shibgxBalance");

    

    const handleFight = useCallback(async (monsterId, dogeId) => {
          const fightResult = await onFightMonster(monsterId, dogeId)
          // console.log('fightResult', fightResult);
          // setTx(fightResult.events?fightResult.events.Fight.transactionHash:'')
          // setRewardExp(fightResult.events?fightResult.events.Fight.returnValues._rewardExp.toString():'');
          // setRewardToken(fightResult.events?fightResult.events.Fight.returnValues._rewardTokenAmount.toString():'');
          // setError(fightResult.code);
          // // setBattleResult(temp.toString());
          // if(fightResult.code){
          //   setBattleResult(fightResult.message);
          // }
          // else{
          //   if(fightResult.events.Fight)
          //     setBattleResult(fightResult.events.Fight.returnValues._win);
          //   setBattleResult(fightResult.events.Fight.returnValues._win);
          // }
          setTx(fightResult.events?fightResult.events.Fight.transactionHash:'')
          setRewardExp(fightResult.events?fightResult.events.Fight.returnValues._totalRewardExp.toString():'');
          setRewardToken(fightResult.events?fightResult.events.Fight.returnValues._totalRewardAmount.toString():'');
          setFightNumber(fightResult.events?fightResult.events.Fight.returnValues._fightNumber.toString():'');
          setWinNumber(fightResult.events?fightResult.events.Fight.returnValues._winNumber.toString():'');
          setError(fightResult.message);
              
      }, [onFightMonster])

    // const [onPresentResult] = useModal(<ResultModal title="Battle Result" result={battleResult} rewardExp={rewardExp} tx={tx} rewardToken={rewardToken} error={error}/>) 


    // useEffect(() => {
    //   if (battleResult !== '') {
    //     onPresentResult()
    //   }
    //   setBattleResult('')
    // }, [ battleResult, setBattleResult, onPresentResult, handleFight ])
    const [onPresentResult] = useModal(<ResultModal title="Battle Result" rewardExp={rewardExp} tx={tx} rewardToken={rewardToken} error={error} winNumber={winNumber} fightNumber={fightNumber}/>) 

    useEffect(() => {
      // console.log(fightNumber);
      // (async function() {
      if ((fightNumber !== '' && winNumber !== '' && rewardExp !== '' && rewardToken !== '' && tx !== '') || (error !== '' && error !== undefined)) {
        onPresentResult()
        setTx('');
        setRewardExp('');
        setRewardToken('');
        setFightNumber('');
        setWinNumber('');
        setError('');
      }
    }, [ fightNumber, winNumber, rewardExp, rewardToken, tx, error, onPresentResult ])
      
    const renderDogeCardButtons = () => {
        if (!allowance.toNumber()) {
          return (
            <Button fullWidth disabled={requestedApproval} size="sm" onClick={handleApprove}>
              Approve
            </Button>
          )
        }
        // if(parseInt(oneDogeAmount) < 100000){
        //   return (
        //     <Button fullWidth size="sm" disabled>Not Enough SHIBGX</Button>
        //   )
        // }
        if(!activeDoge){
          return (
            <Button fullWidth size="sm">Select your Shiba</Button>
          )  
        }
        return (
            <Button fullWidth size="sm"
            disabled={pendingTx}
            onClick={async () => {
                setPendingTx(true)
                await handleFight(id, activeDoge)
                setPendingTx(false)
            }}>{pendingTx ? 'Fighting' : 'Fight'}</Button>
        )
    }

    return (
        <div>
            <Card>
                <StyledCardHeader>
                    <StyledImage imgUrl={`/images/monsters/${monsterImage}`}/>
                </StyledCardHeader>
                <StyledCardBody>
                    <StyledHeading size="lg">{monsterName}</StyledHeading>
                </StyledCardBody>
                <StyledCardFooter>
                    <MonsterInfo>
                        <Block><StyledText>Level:</StyledText><StyledText>{(id + 1)}</StyledText></Block>
                        <Block><StyledText>Success Rate:</StyledText><StyledText>~{successRate}%</StyledText></Block>
                        {/* <Block><Label>Token Reward:</Label><PriceInfo>{rewardTokenFrom} ~ {rewardTokenTo}<TokenIcon width={24} height={24} src="/images/egg/9.png"/><Text> SHIBGX</Text></PriceInfo></Block> */}
                        <Block><StyledText>Token Reward:</StyledText><PriceInfo>{rewardTokenFrom} ~ {rewardTokenTo}</PriceInfo></Block>
                        <Block><StyledText>EXP Reward:</StyledText><StyledText>{rewardExpFrom} EXP</StyledText></Block>
                    </MonsterInfo>
                    {account? (renderDogeCardButtons())
                    : (<Button fullWidth size="sm" onClick={onPresentConnectModal}>Connect Wallet</Button>)}
                </StyledCardFooter>
            </Card>
        </div>
    )
}

export default MonsterCard;