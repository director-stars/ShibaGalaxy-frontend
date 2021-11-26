import React, { useCallback } from 'react'
import styled from 'styled-components'
import { Heading, Text } from '@pancakeswap-libs/uikit'
import Page from 'components/layout/Page'
import PageContent from 'components/layout/PageContent'
import FlexLayout from 'components/layout/Flex'
import { useSaleDoges } from 'hooks/useDogesLand'
import MarketCard from './components/MarketCard'

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

const MarketItem = styled.div`
  max-width: 23.5%;
  padding: 16px;
  margin: auto;
`
const StyledHeading = styled(Heading)`
  font-size: 4.5rem;
`
const StyledText = styled(Text)`
  font-size: 1.5rem;
`
const MarketPlace: React.FC = () => {
  const doges = useSaleDoges()
  // console.log(doges)
  const dogeList = useCallback(
    (dogesToDisplay, removed: boolean) => {
      return dogesToDisplay.map((doge) => (
        <MarketItem>
          <MarketCard
            id={doge._tokenId}
            classInfo={doge._classInfo}
            price={doge._salePrice}
            owner={doge._owner}
            level={doge._level}
            rare={doge._rare}
            exp={doge._exp}
            tribe={doge._tribe}
          />
        </MarketItem>
      ))
    }
    ,
    [],
  )

  return (
    <Page>
      <Hero>
        <StyledHead>
          <StyledHeading as="h1" size="xxl" mb="24px" color="contrast">
            Market Place
          </StyledHeading>
        </StyledHead>
        <StyledText>Choose your young doge here, then train and build your 1doge army!</StyledText>
      </Hero>
      <PageContent>
        <FlexLayout>
          {(typeof doges === typeof [])?dogeList(doges, true):(<div />)}
        </FlexLayout>
      </PageContent>
    </Page>
  )
}

export default MarketPlace
