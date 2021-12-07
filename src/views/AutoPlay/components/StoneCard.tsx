import React, { useEffect } from 'react'
import { Heading, Card, CardBody, CardRibbon } from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'

interface StoneCardProps {
    magicStoneNFTBalance: number
}

const StyledImage = styled.div<{
    imgUrl?: string
}>`
    width:60px;
    height: 60px;
    background-image: url(${({ imgUrl }) => imgUrl});
    background-size: cover;
    background-position: center;
`

const StyledHeading = styled(Heading)`
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const StyledCardBody = styled(CardBody)`
    display: flex;
    column-gap: 20px;
`

const StyledCard = styled(Card)`
    min-width: 400px;
    background-color: #fea726;
    border-radius: 30px;
`
const StoneCard: React.FC<StoneCardProps> = ({magicStoneNFTBalance}) => {
    const { account, connect } = useWallet()
    useEffect(() => {
        if (!account && window.localStorage.getItem('accountStatus')) {
        connect('injected')
        }
    }, [account, connect])

    return (
        <StyledCard ribbon={<CardRibbon text="Magic Stone" />}>
            <StyledCardBody>
                <StyledImage imgUrl="/images/stones/MagicStone_Yellow.gif"/>
                <StyledHeading size="lg" color="contrast">{magicStoneNFTBalance} available stone(s)</StyledHeading>
            </StyledCardBody>
        </StyledCard>
    )
}

export default StoneCard;