import React, { useEffect } from 'react'
import { Heading, Text } from '@pancakeswap-libs/uikit'
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
    activeMonster: string
    setActiveMonster: any
    stoneInfo: string
    magicStoneNFTBalance: number
    setMagicStoneNFTBalance: any
    activeStoneId: number
}

const StyledImage = styled.div<{
    imgUrl?: string
}>`
    width:60px;
    min-height: 60px;
    background-image: url(${({ imgUrl }) => imgUrl});
    background-size: cover;
    background-position: center;
`

const StyledHeading = styled(Heading)`
    text-align: center;
    text-transform: capitalize;
`
const StyledCard = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    background-color: ${(props) => props.theme.colors.card};
    padding: 10px 20px;
    border-radius: 30px;
`
// const PriceInfo = styled.div`
//     display: flex;
// `
// const TokenIcon = styled(Image)`
//     width: 24px;
// `
const DogeInfoItem = styled.div`
    display: flex;
    & ${Text}:first-child{
        margin-right: 10px;
    }
`
const Id = styled.div`
    background: linear-gradient(-45deg,#FFC50D,#d63341,#FFC50D);
    animation: dogeid 3s ease infinite;
    padding: 5px 10px;
    font-weight: 400;
    min-width: 80px;
    font-size: 1rem;
    border-radius: 10rem;
    color: #fff;
    height: fit-content;
`
const DogeCard: React.FC<MartketCardProps> = ({id, classInfo, price, owner, level, exp, rare, tribe, activeMonster, setActiveMonster,stoneInfo, magicStoneNFTBalance, setMagicStoneNFTBalance, activeStoneId}) => {
    // const price1 = new BigNumber(price).div(new BigNumber(10).pow(18)).toString()
    const { account, connect } = useWallet()
    useEffect(() => {
        if (!account && window.localStorage.getItem('accountStatus')) {
        connect('injected')
        }
    }, [account, connect])
    let dogeImage;
    let dogeName;
    if(classInfo){
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
        dogeName = classes[parseInt(rare) - 1][classInfo].name;
    }
    else{
        dogeImage = "warm.gif";
        dogeName = "Shiba";
    }
    const tribeName = tribes[tribe].name;
    // const isSale = (price === "0");

    return (
        <div>
            <StyledCard>
                <Id>#{id}</Id>
                
                <StyledImage imgUrl={`/images/doges/${dogeImage}`}/>
                
                
                <StyledHeading size="md" color="contrast">{dogeName}</StyledHeading>
                <DogeInfoItem>
                    <Text>Rare : </Text>
                    <Text>{rare}</Text>
                </DogeInfoItem>
                <DogeInfoItem>
                    <Text>Level :</Text>
                    <Text>{level} / {exp} exp</Text>
                </DogeInfoItem>
                <DogeInfoItem>
                    <Text>Tribe :</Text>
                    <Text>{tribeName}</Text>
                </DogeInfoItem>
                <DogeCardActions dogeId={id} stoneInfo={stoneInfo} activeMonster={activeMonster} setActiveMonster={setActiveMonster} magicStoneNFTBalance={magicStoneNFTBalance} setMagicStoneNFTBalance={setMagicStoneNFTBalance} activeStoneId={activeStoneId}/>
            </StyledCard>
        </div>
    )
}

export default DogeCard;