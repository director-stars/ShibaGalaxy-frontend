import React from 'react'
import styled from 'styled-components'
import { Heading, Text } from '@pancakeswap-libs/uikit'
import Page from 'components/layout/Page'
import FlexLayout from 'components/layout/Flex'
import ChestCard from './components/ChestCard'
import MagicStoneCard from './components/MagicStoneCard'

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
const StyledFlexLayout = styled(FlexLayout)`
  column-gap: 100px;
`

const StyledHead = styled.div`
  
`
const StyledHeading = styled(Heading)`
  font-size: 4.5rem;
`
const Styledspan = styled.span`
  color: #000;
`
const StyledText = styled(Text)`
  font-size: 1.5rem;
`

const Home: React.FC = () => {
  function validateInputAddresses(address) {
    return (/^(0x){1}[0-9a-fA-F]{40}$/i.test(address));
  }
  const windowUrl = window.location.href;
  // const params = new URLSearchParams(windowUrl);
  if (windowUrl.indexOf("ref=")>=-1)
  {
    const paras=windowUrl.split('=');
    const ref=paras[1];
    if (ref && validateInputAddresses(ref))
    {
      window.localStorage.setItem("referer",ref);
      // console.log( window.localStorage.getItem("referer"));
    }
  }

  // const { onGetDogeBalance } = useDogeBalance()

  return (
    <Page>
      <Hero>
        <StyledHead>
          <StyledHeading as="h1" size="xxl" mb="24px" color="contrast">
            Starter Pack
          </StyledHeading>
        </StyledHead>
        <StyledText>Want to help defend the <Styledspan>shibagalaxy?</Styledspan></StyledText>
        <StyledText>Choose a shiba warrior and start fighting angry bears, for reward and glory!!!</StyledText>
      </Hero>
      <div>
        <StyledFlexLayout>
            <MagicStoneCard 
              imgUrl="/images/egg/bnb.png"
              name="Magic Stone"
              price="0.2"
            />
            <ChestCard 
              imgUrl="/images/egg/9.png"
              name="Random Shiba"
              price="5000"
            />
        </StyledFlexLayout>
      </div>
    </Page>
  )
}

export default Home
