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
    background-size: cover;
    background-position: center;
`

const StyledHeading = styled(Heading)`
    text-align: center;
    text-transform: capitalize;
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
    background: linear-gradient(-45deg,#e8c456,#aa8929,#fdd325);
    animation: dogeid 3s ease infinite;
    padding: 5px 10px;
    font-weight: 400;
    min-width: 80px;
    font-size: 1rem;
    border-radius: 10rem;
    margin: 10px;
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
        dogeName = "Doge";
    }
    const tribeName = tribes[tribe].name;
    const isSale = (price !== "0");

    return (
        <div>
            <Card>
                <Id>#{id}</Id>
                <CardHeader>
                    <StyledImage imgUrl={`/images/doges/${dogeImage}`}/>
                </CardHeader>
                <CardBody>
                    <StyledHeading size="lg" color="primary">{dogeName}</StyledHeading>
                </CardBody>
                <CardFooter>
                    <DogeInfo>
                        <DogeInfoItem>
                            <Text>Rare : </Text>
                            <Text>{rare}</Text>
                        </DogeInfoItem>
                        <DogeInfoItem>
                            <Text>Level :</Text>
                            <Text>{level} / {exp} exp</Text>
                        </DogeInfoItem>
                    </DogeInfo>
                    <DogeInfo>
                        <DogeInfoItem>
                            <Text>Tribe :</Text>
                            <Text>{tribeName}</Text>
                        </DogeInfoItem>
                        {(price !== "0")?(
                            <DogeInfoItem>
                            <Text>Price</Text>
                            <PriceInfo>
                                <TokenIcon width={24} height={24} src="/images/egg/9.png"/>
                                <Text>{price1}</Text>
                            </PriceInfo>
                        </DogeInfoItem>
                        ):(<div />)}
                    </DogeInfo>
                    <DogeCardActions dogeId={id} isSale={isSale}/>
                </CardFooter>
            </Card>
        </div>
    )
}

export default DogeCard;