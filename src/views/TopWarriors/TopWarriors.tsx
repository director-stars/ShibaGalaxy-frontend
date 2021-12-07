import React, { useEffect, useCallback, useState } from 'react'
import styled from 'styled-components'
import { Heading, useWalletModal, Button, Text } from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useClaimList } from 'hooks/useDogesLand'
import Page from 'components/layout/Page'
import PageContent from 'components/layout/PageContent'
import FlexLayout from 'components/layout/Flex'
// import GetReferralLinkCard from './components/GetReferralLinkCard'

const StyledHead = styled.div`
  // background: rgba(0,0,0,.5);
  // border-radius: 50px;
`

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

const Banner = styled.div`
  align-items: center;
  background-image: url('${process.env.PUBLIC_URL}/images/pet.gif');
  background-repeat: no-repeat;
  background-position: top center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  margin-bottom: 32px;
  padding-top: 200px;
  text-align: center;

  ${({ theme }) => theme.mediaQueries.lg} {
    background-image: url('${process.env.PUBLIC_URL}/images/pet.gif'), url('${process.env.PUBLIC_URL}/images/enemy.gif');
    background-position: left center, right center;
    height: 202px;
    padding-top: 0;
  }
`

const StyledCard = styled.div`
  // max-width: 500px;
  margin: 50px auto;
`
const StyledBody = styled.div`
  text-align:center;
  margin-top: 30px;
`
const ReferralList = styled.div`
  display:grid;
  background-color: #fff;
  border-radius: 20px;
  max-width: 800px;
  padding: 10px;
  width: 100%;
  margin: 60px auto;
`
const ReferralHeader = styled.div`
  display: flex;
  margin: auto;
  padding: 20px;
  width: 100%;
  justify-content: space-between;
  border-bottom: 1px solid #E9EAEB;
`
const ReferralInfo = styled.div`
  display: flex;
  margin: auto;
  padding: 20px;
  width: 100%;
  justify-content: space-between;
`
const Address = styled.div`
  font-family: monospace;
  font-weight: bold;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 180px;
  ${({ theme }) => theme.mediaQueries.md} {
    max-width: 100%;
  }
  // color: #d63341;
`
const EarnedAmount = styled.div`
  font-family: monospace;
  font-weight: bold;
  // color: #d63341;
`
const StyledHeading = styled(Heading)`
  font-size: 4.5rem;
`
const TopWarriors: React.FC = () => {
  const { account, connect, reset } = useWallet()
  useEffect(() => {
    if (!account && window.localStorage.getItem('accountStatus')) {
    connect('injected')
    }
  }, [account, connect])
  const { onPresentConnectModal } = useWalletModal(connect, reset)
  const list = useClaimList();

  const claimList = useCallback(
    (lists) => {
      if(lists.length === 0)
        return <ReferralInfo>There is no warriors</ReferralInfo>
      return lists.map((item, index) => {
        return <ReferralInfo key={item.address}>
          <Address>{index+1}</Address>
          <Address>{item.address}</Address>
          <EarnedAmount>{item.amount}</EarnedAmount>
        </ReferralInfo>
      })
    },[])
  return (
      <Page>
        <Hero>
          <StyledHead>
            <StyledHeading as="h1" size="xl" mb="24px" color="contrast">
              Top Warriors
            </StyledHeading>
          </StyledHead>
        </Hero>
        <PageContent>
          <StyledBody>
            {/* <Heading size="xl" mb="40px" color="contrast">
              Ranked Warriors.
            </Heading> */}
            <ReferralList>
              <ReferralHeader>
                <Address>Ranking</Address>
                <Address>Warriors</Address>
                <EarnedAmount>Earned Amount</EarnedAmount>
              </ReferralHeader>
              {claimList(list)}
            </ReferralList>
          </StyledBody>
        </PageContent>
      </Page>
  )
}

export default TopWarriors
