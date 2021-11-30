import React from 'react'
import { Heading, Text, Card, CardBody, CardHeader, CardFooter, Image } from '@pancakeswap-libs/uikit'
import styled, { keyframes } from 'styled-components'
import ChestCardActions from './ChestCardActions'

interface ChestCardProps {
    imgUrl: string
    name: string
    price: string
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
    position:absolute;
    margin-left: 20px;
    width: calc(100% - 80px);
    min-height: 260px;
    background-size: contain;
    background-position: center;
    background-image: url(${({imageUrl}) => imageUrl})
`

const ImageSlider = styled.div`
    min-height:260px;

    & div {
        animation: ${round} 3s infinite;
    }

    & ${StyledImage}:nth-child(6) {
        animation-delay: 3s;
    }

    & ${StyledImage}:nth-child(1) {
        animation-delay: 2.5s;
    }

    & ${StyledImage}:nth-child(2) {
        animation-delay: 2s;
    }
    
    & ${StyledImage}:nth-child(3) {
        animation-delay: 1.5s;
    }

    & ${StyledImage}:nth-child(4) {
        animation-delay: 1s;
    }

    & ${StyledImage}:nth-child(5) {
        animation-delay: 0.5s;
    }
`
const StyledCardHeader = styled(CardHeader)`
    padding: 0px;
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

const ChestCard: React.FC<ChestCardProps> = ({imgUrl, name, price}) => {
    return (
        <div>
            <StyledCard>
                <StyledCardHeader>
                    <ImageSlider>
                        <StyledImage imageUrl="/images/chests/Chest_BabyBlue.gif"/>
                        <StyledImage imageUrl="/images/chests/Chest_Blue.gif"/>
                        <StyledImage imageUrl="/images/chests/Chest_Green.gif"/>
                        <StyledImage imageUrl="/images/chests/Chest_Purple.gif"/>
                        <StyledImage imageUrl="/images/chests/Chest_Red.gif"/>
                        <StyledImage imageUrl="/images/chests/Chest_Yellow.gif"/>
                    </ImageSlider>
                </StyledCardHeader>
                <CardBody>
                    <StyledHeading size="lg" color="secondary">{name}</StyledHeading>
                </CardBody>
                <CardFooter>
                    <DogeInfo>
                        <Text color="cardItemKey" bold>Price</Text>
                        <PriceInfo>
                            <TokenIcon width={24} height={24} src={imgUrl}/>
                            <Text color="cardItemValue" bold>{price}</Text>
                        </PriceInfo>
                    </DogeInfo>
                    <OwnerInfo>
                        <Text color="cardItemKey" bold>Payment</Text>
                        <Text color="cardItemValue" bold>BNB</Text>
                    </OwnerInfo>
                    <ChestCardActions 
                        price={price}
                    />
                </CardFooter>
            </StyledCard>
        </div>
    )
}

export default ChestCard;