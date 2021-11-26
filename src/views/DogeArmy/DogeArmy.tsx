import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Heading, Text, ButtonMenu, ButtonMenuItem } from '@pancakeswap-libs/uikit'
import Page from 'components/layout/Page'
import PageContent from 'components/layout/PageContent'
import { useMySaleDoges, useMyUnSaleDoges } from 'hooks/useDogesLand'
import FlexLayout from 'components/layout/Flex'
import DogeCard from './components/DogeCard'
import ChestCard from './components/ChestCard'

// interface DogeArmyProps {
//   url?: string
//   title?: string
// }

const Hero = styled.div`
  background: linear-gradient(90deg, rgba(255, 0, 0, 0), rgb(214, 51, 65) 45%, rgba(255, 0, 0, 0));
  line-height: 1.5;
  align-items: center;
  background-repeat: no-repeat;
  background-position: top center;
  justify-content: center;
  flex-direction: column;
  margin: 30px auto;
  padding: 20px;
  text-align: center;

  ${({ theme }) => theme.mediaQueries.lg} {
    background-position: left center, right center;
  }
`
const StyledHead = styled.div`
`
const MyDoges = styled.div`
  text-align: center;
  overflow: hidden;
  align-content: center;
  margin-bottom: 50px;
`

const DogeItem = styled.div`
  max-width: 23.5%;
  padding: 16px;
  margin: auto;
`

const Row = styled.div`
  margin-bottom: 32px;

  & > button + button {
    margin-left: 16px;
  }
`;
const StyledHeading = styled(Heading)`
  font-size: 4.5rem;
`
const StyledText = styled(Text)`
  font-size: 1.5rem;
`
const DogeArmy: React.FC = () => {
  // const { url, title } = props
  const [isSaleDoges, setIsSaleDoges] = useState(true);
  const [isUnSaleDoges, setIsUnSaleDoges] = useState(true);
  // const chevronWidth = 40;
  let saleDoges = useMySaleDoges();
  // console.log('saleDoges', saleDoges)
  if(saleDoges === undefined) saleDoges = [];
  // console.log('saleDoges',saleDoges)
  let unSaleDoges = useMyUnSaleDoges();
  if(unSaleDoges === undefined) unSaleDoges = [];
  // console.log('unSaleDoges', unSaleDoges)
  // console.log('doges', doges)
  const dogeList = useCallback(
    (dogesToDisplay, removed: boolean) => {
      return dogesToDisplay.map((doge) => (
        <DogeItem>
          {(doge._rare !== "0")?(
          <DogeCard
            id={doge._tokenId}
            classInfo={doge._classInfo}
            price={doge._salePrice}
            owner={doge._owner}
            level={doge._level}
            rare={doge._rare}
            exp={doge._exp}
            tribe={doge._tribe}
          />
          ):(
          <ChestCard 
            id={doge._tokenId}
            tribe={doge._tribe}
          />
          )}
        </DogeItem>
      ))
    },
    [],
  )
  const [index, setIndex] = useState(0);
  const handleClick = (newIndex) => {
    setIndex(newIndex)
    switch(newIndex){
      case 0:
        setIsSaleDoges(true);
        setIsUnSaleDoges(true);
        break;
      case 1:
        setIsSaleDoges(false);
        setIsUnSaleDoges(true);
        break;
      case 2:
        setIsSaleDoges(true);
        setIsUnSaleDoges(false);
        break;
      default:
        setIsSaleDoges(true);
        setIsUnSaleDoges(true);
        break;
    }
  };
  return (
    <Page>
      <Hero>
        <StyledHead>
          <StyledHeading as="h1" size="xxl" mb="24px" color="contrast">
            You have {saleDoges.length + unSaleDoges.length} shiba(s)!
          </StyledHeading>
        </StyledHead>
        <StyledText>To start defending shibagalaxy, buy a shiba from the starter pack or from the marketplace.</StyledText>
      </Hero>
      <PageContent>
        <MyDoges>
          <Row>
            <ButtonMenu size="sm" activeIndex={index} onClick={handleClick}>
              <ButtonMenuItem>ALL</ButtonMenuItem>
              <ButtonMenuItem>Available</ButtonMenuItem>
              <ButtonMenuItem>In Order</ButtonMenuItem>
            </ButtonMenu>
          </Row>
          <FlexLayout>
          {((typeof saleDoges === typeof []) && isSaleDoges)?dogeList(saleDoges, true):(<></>)}
          {((typeof unSaleDoges === typeof []) && isUnSaleDoges)?dogeList(unSaleDoges, true):(<></>)}
          </FlexLayout>
        </MyDoges>
      </PageContent>
    </Page>
  )
}

export default DogeArmy