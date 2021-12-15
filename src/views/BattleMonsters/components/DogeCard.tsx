import React, { useEffect } from 'react'
import { Heading, Text, useWalletModal, Card, CardBody, CardHeader, CardFooter, Button } from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { classes, tribes } from 'hooks/useDogeInfo'
import DogeCardActions from './DogeCardActions';
import Timestamp from './Timestamp';

interface DogeCardProps {
    classInfo: string
    rare: string
    exp: string
    level: string
    tribe: string
    id: string
    activeDoge: string
    setActiveDoge: any
    farmTime: string
    fightNumber: string
    battleTime: string
    stoneInfo: string
    tokenBalance: number
}

const StyledImage = styled.div<{
    imgUrl?: string
}>`
    width:100%;
    min-height: 260px;
    background-image: url(${({ imgUrl }) => imgUrl});
    background-size: contain;
    background-position: center;
`

const StyledHeading = styled(Heading)`
    text-align: center;
    text-transform: capitalize;
    font-size: 1.75rem;
`
const DogeInfo = styled.div`
    display: flex;
    justify-content: space-between;
    & * {
        display: flex;
        // margin-right: 10px;
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
`
const StyledCard = styled(Card)`
    background-image: url(/images/bg-card.png);
    background-size: contain;
    padding: 40px 20px;
    background-repeat: no-repeat;
    background-position: center;
    height: 580px;
`
const StyledCardHeader = styled(CardHeader)`
    padding: 0px;
    margin: 12px 0px;
`
const StyledCardBody = styled(CardBody)`
    padding: 0px 24px 24px 24px;
`
const DogeCardAction = styled.div`
    margin-top: 10px;
`
const DogeCard: React.FC<DogeCardProps> = ({classInfo, rare, level, exp, tribe, id, activeDoge, setActiveDoge, farmTime, fightNumber, battleTime, stoneInfo, tokenBalance}) => {
    const { account, connect, reset } = useWallet()
    useEffect(() => {
        if (!account && window.localStorage.getItem('accountStatus')) {
        connect('injected')
        }
    }, [account, connect])
    let dogeImage;
    const dogeName = classes[parseInt(rare) - 1][classInfo].name;
    if(classes[parseInt(rare) - 1][classInfo].type === "multi"){
        let dogeNumber = parseInt(tribe) + 1
        if(parseInt(exp) > 350){
            dogeNumber = parseInt(tribe) + 5
        }
        dogeImage = `${classes[parseInt(rare) - 1][classInfo].asset}/${classes[parseInt(rare) - 1][classInfo].asset}_${dogeNumber}.gif`;
    }
    else{
        dogeImage = `${classes[parseInt(rare) - 1][classInfo].asset}/${classes[parseInt(rare) - 1][classInfo].asset}_1.gif`;
    }
    const tribeName = tribes[tribe].name;

    const { onPresentConnectModal } = useWalletModal(connect, reset)
    const cycle = 4 * 3600 * 1000;
    const nextTime = Math.floor(Date.now() / cycle) - Math.floor(parseInt(battleTime) * 1000 / cycle);
    const maxFightNumber = 3;

    useEffect(() => {
        if(parseInt(activeDoge) === parseInt(id) && parseInt(fightNumber) === 0 && nextTime < 1){
            setActiveDoge(0);
        }
    }, [ activeDoge, fightNumber, id, nextTime, setActiveDoge])

    return (
        <div>
            <StyledCard>
                <Id>#{id}</Id>
                <StyledCardHeader>
                    <StyledImage imgUrl={`/images/doges/${dogeImage}`}/>
                </StyledCardHeader>
                <StyledCardBody>
                    <StyledHeading size="lg" color="secondary">{dogeName}</StyledHeading>
                </StyledCardBody>
                <CardFooter>
                    <DogeInfo>
                        <div>
                            <Text color="cardItemKey" bold>Rare : </Text>
                            <Text color="cardItemValue" bold>{rare}</Text>
                        </div>
                        <div>
                            <Text color="cardItemKey" bold>Level : </Text>
                            <Text color="cardItemValue" bold>{level} / {exp} exp</Text>
                        </div>
                    </DogeInfo>
                    <DogeInfo>
                        <div>
                            <Text color="cardItemKey" bold>Tribe : </Text>
                            <Text color="cardItemValue" bold>{tribeName}</Text>
                        </div>
                    </DogeInfo>
                    {((parseInt(fightNumber) > 0 && stoneInfo === "0") || (nextTime >= 1 && stoneInfo === "0"))?(
                        <DogeInfo>
                            <div>
                                <Text color="cardItemKey" bold>Remained Turns Fight :</Text>
                                {nextTime >= 1?(
                                    <Text color="cardItemValue" bold>{maxFightNumber}</Text>
                                ):(
                                    <Text color="cardItemValue" bold>{fightNumber}</Text>
                                )}
                            </div>
                        </DogeInfo>):(<></>)
                    }
                    {(parseInt(fightNumber) > 0 || nextTime >= 1 )?(
                        (<DogeCardAction>
                        
                            {account? (<>
                                {(stoneInfo !== "0")?(
                                    <DogeCardActions dogeId={id} tokenBalance={tokenBalance}/>
                                ):(
                                    <Button fullWidth size="sm" onClick={() => {
                                        setActiveDoge(id);
                                    }}>Use this Shiba</Button>
                                )}
                            </>)
                            : (<Button fullWidth size="sm" onClick={onPresentConnectModal}>Connect Wallet</Button>)}
                            
                        </DogeCardAction>)
                        ): (
                        <DogeCardAction>
                            <Timestamp battleTime={parseInt(battleTime) * 1000} cycle={cycle} />
                        </DogeCardAction>
                        )
                    }
                </CardFooter>
                
            </StyledCard>
        </div>
    )
}

export default DogeCard;