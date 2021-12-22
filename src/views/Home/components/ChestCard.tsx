import React, {useState, useEffect} from 'react'
import { Heading, Text, Card, CardBody, CardHeader, CardFooter, Image } from '@pancakeswap-libs/uikit'
import styled, { keyframes } from 'styled-components'
import CustomSelect from 'components/Select'
import ChestCardActions from './ChestCardActions'

interface ChestCardProps {
    name: string
    price: string
    totalSupply: number
    bnbBalance: number
    shibaNftBalance: number
    priceShibaWithToken: string
    tokenBalance: number
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
    & img {
        width: auto;
    }
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
interface Payment {
    token: string;
    id: number;
    image: string;
    price: string;
}  

const ChestCard: React.FC<ChestCardProps> = ({name, price, totalSupply, bnbBalance, shibaNftBalance, priceShibaWithToken, tokenBalance}) => {
    const [imgUrl, setImgUrl] = useState("/images/egg/bnb.png");
    const [tokenAmount, setTokenAmount] = useState(price.toString());
    const payments: Payment[] = [
        {
            id: 0,
            token: "BNB",
            image: "/images/egg/bnb.png",
            price: price.toString()
        },
        {
            id: 1,
            token: "$SHIBGX",
            image: "/images/egg/9.png",
            price: `${Math.ceil(parseInt(priceShibaWithToken) / (10**9))}`
        }
    ];
    const [payment, setPayment] = useState(payments[0]);
    useEffect(() => {
        setImgUrl(payment.image);
        setTokenAmount(payment.price);
      }, [payment])
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
                <StyledCardBody>
                    <StyledHeading size="lg" color="secondary">{name}</StyledHeading>
                </StyledCardBody>
                <CardFooter>
                    <DogeInfo>
                        <Text color="cardItemKey" bold>Price</Text>
                        <PriceInfo>
                            <TokenIcon width={24} height={24} src={imgUrl}/>
                            <Text color="cardItemValue" bold>{tokenAmount}</Text>
                        </PriceInfo>
                    </DogeInfo>
                    {/* <DogeInfo>
                        <Text color="cardItemKey" bold>Created</Text>
                        <Text color="cardItemValue" bold>{totalSupply}</Text>
                    </DogeInfo> */}
                    <OwnerInfo>
                        <Text color="cardItemKey" bold>Payment</Text>
                        {/* <Text color="cardItemValue" bold>BNB</Text> */}
                        <CustomSelect
                            value={payment}
                            onChange={setPayment}
                            options={payments}
                            mapOptionToLabel={(p: Payment) => p.token}
                            mapOptionToValue={(p: Payment) => p.id}
                        />
                    </OwnerInfo>
                    <ChestCardActions 
                        price={price}
                        bnbBalance={bnbBalance}
                        priceShibaWithToken={priceShibaWithToken}
                        tokenBalance={tokenBalance}
                        payment={payment.id}
                        shibaNftBalance={shibaNftBalance}
                    />
                </CardFooter>
            </StyledCard>
        </div>
    )
}

export default ChestCard;