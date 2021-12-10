import React, { useEffect, useCallback, useState } from 'react'
import BigNumber from 'bignumber.js'
import { Heading, Text, useWalletModal, Card, CardBody, CardHeader, CardFooter, Button, Image } from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useFillOrder } from 'hooks/useDogesLand'
import { classes, tribes } from 'hooks/useDogeInfo'
import { useCryptoDogeNFTAllowance } from 'hooks/useAllowance'
import { useCryptoDogeNFTApprove } from 'hooks/useApprove'

interface MartketCardProps {
    id: string
    classInfo: string
    price: string
    owner: string
    level: string
    rare: string
    exp: string
    tribe: string
    tokenBalance: number
    shibaNftBalance: number
}

const StyledHeading = styled(Heading)`
    text-align: center;
    text-transform: capitalize;
    letter-spacing: 1px;
`
const DogeInfo = styled.div`
    display: flex;
    justify-content: space-between;
`
const PriceInfo = styled.div`
    display: flex;
`
const TokenIcon = styled(Image)`
    width: 24px;
`
const OwnerInfo = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
`
const StyledImage = styled.div<{
    imgUrl?: string
}>`
    width:100%;
    min-height: 380px;
    background-image: url(${({ imgUrl }) => imgUrl});
    background-size: contain;
    background-position: top;
    background-repeat: no-repeat;
`
const DogeInfoItem = styled.div`
    display: flex;
    & ${Text}:first-child{
        margin-right: 10px;
    }
`
const Id = styled.div`
    position: absolute;
    background: linear-gradient(-45deg,#FFC50D,#d63341,#FFC50D);
    animation: dogeid 3s ease infinite;
    padding: 5px 10px;
    font-weight: 400;
    min-width: 80px;
    font-size: 1rem;
    border-radius: 10rem;
    margin: -10px 10px 10px 10px;
    text-align: center;
`
const StyledCard = styled(Card)`
    // background-image: url(/images/bg-card.png);
    background-size: contain;
    padding-top: 40px;
    background-repeat: no-repeat;
    background-position: center;
    height: 680px;
`
const StyledCardHeader = styled(CardHeader)`
    padding: 0px;
    margin: 12px 0px;
    background-image: url(/images/shibas_platform_only.png);
    background-size: cover;
    background-position: center;
    background-position-y: 170px;
    background-repeat: no-repeat;
`
const StyledCardBody = styled(CardBody)`
    background-image: url(/images/card-market__body.png);
    background-size: contain;
    background-repeat: no-repeat;
    position: relative;
    z-index: 2;
    width: 80%;
    margin: auto;
    height: 50px;
    padding: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
`
const StyledCardFooter = styled(CardFooter)`
    margin-top: -25px;
    padding-top: 40px;
    background-image: url(/images/card-market__footer.png);
    background-size: contain;
    background-repeat: no-repeat;
    position: relative;
    z-index: 1;
    height: 210px;
`
const MarketCard: React.FC<MartketCardProps> = ({id, classInfo, price, owner, level, exp, rare, tribe, tokenBalance, shibaNftBalance}) => {
    const price1 = new BigNumber(price).div(new BigNumber(10).pow(9)).toString()
    const ownerAddress = `${owner.substring(0, 4)}...${owner.substring(owner.length - 4)}`;
    let dogeImage;
    let dogeName;
    if(classInfo){
        dogeImage = classes[parseInt(rare) - 1][classInfo].asset;
        dogeName = classes[parseInt(rare) - 1][classInfo].name;
    }
    else{
        dogeImage = "Bull.gif";
        dogeName = "Shiba";
    }
    
    const tribeName = tribes[tribe].name;
    const { account, connect, reset } = useWallet()
    useEffect(() => {
        if (!account && window.localStorage.getItem('accountStatus')) {
        connect('injected')
        }
    }, [account, connect])

    const [pendingTx, setPendingTx] = useState(false)

    const { onFillOrder } = useFillOrder();

    const handleFillOrder = useCallback(async (dogeId) => {
        try {
            setPendingTx(true)
          const txHash = await onFillOrder(dogeId)
          // user rejected tx or didn't go thru
          if (!txHash) {
            setPendingTx(false)
          }
        } catch (e) {
          console.error(e)
        }
      }, [onFillOrder])

    const { onPresentConnectModal } = useWalletModal(connect, reset)

    const [requestedApproval, setRequestedApproval] = useState(false)
    const allowance = useCryptoDogeNFTAllowance()
    const { onApprove } = useCryptoDogeNFTApprove()
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
      const renderDogeCardButtons = () => {
        if (!allowance.toNumber()) {
          return (
            <Button fullWidth disabled={requestedApproval} size="sm" onClick={handleApprove}>
              Approve
            </Button>
          )
        }
        if(shibaNftBalance > 4){
            return (
                <Button fullWidth disabled size="sm">
                  You have enough Shibas
                </Button>
            ) 
        }
        if(tokenBalance < parseInt(price)){
            return (
                <Button fullWidth disabled size="sm">
                  Not enough SHIBGX
                </Button>
            ) 
        }        
        return (
            <Button fullWidth size="sm"
            disabled={pendingTx}
            onClick={async () => {
                setPendingTx(true)
                await handleFillOrder(id)
                // await handleGetDogeBalance();
                setPendingTx(false)
            }}>{pendingTx ? 'Pending Buy Shiba' : 'Buy Shiba'}</Button>
        )
      }

    return (
        <StyledCard>
            <Id>#{id}</Id>
            <StyledCardHeader>
                <StyledImage imgUrl={`/images/doges/${dogeImage}`}/>
            </StyledCardHeader>
            <StyledCardBody>
                <StyledHeading size="lg" color="secondary">{dogeName}</StyledHeading>
            </StyledCardBody>
            <StyledCardFooter>
                <DogeInfo>
                    <DogeInfoItem>
                        <Text color="cardItemKey" bold>Rare : </Text>
                        <Text color="cardItemValue" bold>{rare}</Text>
                    </DogeInfoItem>
                    <DogeInfoItem>
                        <Text color="cardItemKey" bold>Level :</Text>
                        <Text color="cardItemValue" bold>{level} / {exp} exp</Text>
                    </DogeInfoItem>
                </DogeInfo>
                <DogeInfo>
                    <DogeInfoItem>
                        <Text color="cardItemKey" bold>Tribe :</Text>
                        <Text color="cardItemValue" bold>{tribeName}</Text>
                    </DogeInfoItem>
                    <DogeInfoItem>
                        <Text color="cardItemKey" bold>Price</Text>
                        <PriceInfo>
                            <TokenIcon width={24} height={24} src="/images/egg/9.png"/>
                            <Text color="cardItemValue" bold>{price1}</Text>
                        </PriceInfo>
                    </DogeInfoItem>
                </DogeInfo>
                <OwnerInfo>
                    <Text color="cardItemKey" bold>Owner</Text>
                    <Text color="cardItemValue" bold>{ownerAddress}</Text>
                </OwnerInfo>
                {account? (renderDogeCardButtons())
                : (<Button fullWidth size="sm" onClick={onPresentConnectModal}>Connect Wallet</Button>)}
            </StyledCardFooter>
        </StyledCard>
    )
}

export default MarketCard;