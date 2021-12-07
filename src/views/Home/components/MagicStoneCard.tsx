import React from 'react'
import { Heading, Text, Card, CardBody, CardHeader, CardFooter, Image } from '@pancakeswap-libs/uikit'
import styled, { keyframes } from 'styled-components'
import MagicStoneCardActions from './MagicStoneCardActions'

interface MagicStoneCardProps {
    imgUrl: string
    name: string
    price: string
    totalSupply: number
    bnbBalance: number
}

const round = keyframes`
    16.66666% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
`;

const StyledImage =  styled.div<{
    imageUrl?:string
}>`
    margin: auto;
    // position:absolute;
    // opacity:0;
    width:calc(100% - 40px);
    min-height: 260px;
    background-size: contain;
    background-position: center;
    background-image: url(${({imageUrl}) => imageUrl})
`

const ImageSlider = styled.div`
    min-height:260px;

    // & div {
    //     animation: ${round} 3s infinite;
    // }

    // & ${StyledImage}:nth-child(6) {
    //     animation-delay: 3s;
    // }

    // & ${StyledImage}:nth-child(1) {
    //     animation-delay: 2.5s;
    // }

    // & ${StyledImage}:nth-child(2) {
    //     animation-delay: 2s;
    // }
    
    // & ${StyledImage}:nth-child(3) {
    //     animation-delay: 1.5s;
    // }

    // & ${StyledImage}:nth-child(4) {
    //     animation-delay: 1s;
    // }

    // & ${StyledImage}:nth-child(5) {
    //     animation-delay: 0.5s;
    // }
`
const StyledCardHeader = styled(CardHeader)`
    padding: 0px;
    margin-bottom: 10px;
`

const StyledHeading = styled(Heading)`
    text-align: center;
    font-size: 1.75rem;
`
const DogeInfo = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
`
const PriceInfo = styled.div`
    display: flex;
    justify-content: space-between;
`
const TokenIcon = styled(Image)`
    width: 24px;
    margin-right: 10px;
`
const OwnerInfo = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
`
const StyledCard = styled(Card)`
    background-image: url(/images/bg-card.png);
    background-size: contain;
    padding: 40px 20px;
    background-repeat: no-repeat;
    background-position: center;
`
const StyledCardBody = styled(CardBody)`
    padding-bottom: 10px;
`
const MagicStoneCard: React.FC<MagicStoneCardProps> = ({imgUrl, name, price, totalSupply, bnbBalance}) => {
    return (
        <div>
            <StyledCard>
                <StyledCardHeader>
                    <ImageSlider>
                        {/* <StyledImage imageUrl="/images/stones/fire.gif"/>
                        <StyledImage imageUrl="/images/stones/sky.gif"/>
                        <StyledImage imageUrl="/images/stones/electric.gif"/>
                        <StyledImage imageUrl="/images/stones/grass.gif"/>
                        <StyledImage imageUrl="/images/stones/wind.gif"/> */}
                        <StyledImage imageUrl="/images/stones/MagicStone_Yellow.gif"/>
                    </ImageSlider>
                </StyledCardHeader>
                <StyledCardBody>
                    <StyledHeading size="lg" color="secondary">{name}</StyledHeading>
                </StyledCardBody>
                <CardFooter>
                    <DogeInfo>
                        <Text color="cardItemKey" bold>Price</Text>
                        <PriceInfo>
                            <TokenIcon width={24} height={24} src={imgUrl}/>
                            <Text color="cardItemValue" bold>{price}</Text>
                        </PriceInfo>
                    </DogeInfo>
                    {/* <DogeInfo>
                        <Text color="cardItemKey" bold>Created</Text>
                        <Text color="cardItemValue" bold>{totalSupply}</Text>
                    </DogeInfo> */}
                    <OwnerInfo>
                        <Text color="cardItemKey" bold>Payment</Text>
                        <Text color="cardItemValue" bold>BNB</Text>
                    </OwnerInfo>
                    <MagicStoneCardActions 
                        price={price}
                        bnbBalance={bnbBalance}
                    />
                </CardFooter>
            </StyledCard>
        </div>
    )
}

export default MagicStoneCard;