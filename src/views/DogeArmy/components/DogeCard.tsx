import React, { useEffect } from 'react'
import BigNumber from 'bignumber.js'
import { Heading, Text, Card, CardBody, CardHeader, CardFooter, Image } from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { classes, tribes } from 'hooks/useDogeInfo'
import DogeCardActions from './DogeCardActions'

interface MartketCardProps {
    id: string
    classInfo: string
    price: string
    owner: string
    level: string
    rare: string
    exp: string
    tribe: string
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
`
const PriceInfo = styled.div`
    display: flex;
`
const TokenIcon = styled(Image)`
    width: 24px;
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
const DogeCard: React.FC<MartketCardProps> = ({id, classInfo, price, owner, level, exp, rare, tribe}) => {
    const price1 = new BigNumber(price).div(new BigNumber(10).pow(18)).toString()
    const { account, connect, reset } = useWallet()
    useEffect(() => {
        if (!account && window.localStorage.getItem('accountStatus')) {
        connect('injected')
        }
    }, [account, connect])
    // console.log('id',id)
    // console.log('rare',rare)
    // console.log('classInfo',classInfo)
    let dogeImage;
    let dogeName;
    if(classInfo){
        dogeImage = classes[parseInt(rare) - 1][classInfo].asset;
        dogeName = classes[parseInt(rare) - 1][classInfo].name;
    }
    else{
        dogeImage = "warm.gif";
        dogeName = "Shiba";
    }
    const tribeName = tribes[tribe].name;
    const isSale = (price !== "0");

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
                        {(price !== "0")?(
                            <DogeInfoItem>
                            <Text color="cardItemKey" bold>Price</Text>
                            <PriceInfo>
                                <TokenIcon width={24} height={24} src="/images/egg/9.png"/>
                                <Text color="cardItemValue" bold>{price1}</Text>
                            </PriceInfo>
                        </DogeInfoItem>
                        ):(<div />)}
                    </DogeInfo>
                    <DogeCardActions dogeId={id} isSale={isSale}/>
                </CardFooter>
            </StyledCard>
        </div>
    )
}

export default DogeCard;