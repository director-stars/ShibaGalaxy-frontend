import React, { useEffect, useCallback, useState } from 'react'
import styled from 'styled-components'
import { Heading, useWalletModal, Button, useModal, Text } from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useTokenBalance } from 'hooks/useDogesLand'
import { useLaunchPoolAllowance } from 'hooks/useAllowance'
import { useLaunchPoolApprove } from 'hooks/useApprove'
import Page from 'components/layout/Page'
import PageContent from 'components/layout/PageContent'
import { useGetStartTime, useGetDepositedAmount, useGetPeriod,  useGetOldTokenAmount, useGetOldClaimAmount, useWithdrawSHIBGX, useClaim } from 'hooks/useLaunchPool';
// import FlexLayout from 'components/layout/Flex'
import OrderModal from './components/OrderModal'
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

const BlockContext = styled.div`
  max-width: 500px;
  margin: 10px auto;
  display: flex;
  align-items: center;
  width: -webkit-fill-available;
  justify-content: space-around;
  column-gap: 30px;
  color: #fff;
`
const StyledBody = styled.div`
  text-align:center;
  margin-top: 30px;
`
const CycleContent = styled.div`
  display:grid;
  background-color: transparent;
  border-radius: 20px;
  max-width: 800px;
  padding: 40px;
  width: 100%;
  margin: 30px auto;
  border: 1px solid #fff;
`
const BlockTitle = styled.div`
  // display: flex;
  margin: auto;
  // padding: 20px;
  width: 100%;
  // justify-content: space-between;
  // border-bottom: 1px solid #E9EAEB;
  text-align: right;
  color: #fea726;
  font-weight: bold;
  letter-spacing: 1px;
  font-size: 22px;
`
const BlockContent = styled.div`
  // display: flex;
  margin: auto;
  // padding: 20px;
  width: 100%;
  // justify-content: space-between;
  text-align: left;
  color: #fea726;
  font-weight: bold;
  letter-spacing: 1px;
  font-size: 22px;
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
const StyledText = styled(Text)`
  font-size: 1.5rem;
`
const StyledHeading = styled(Heading)`
  font-size: 4.5rem;
  margin: 30px auto;
`
const LauchPool: React.FC = () => {
  const { account, connect, reset } = useWallet()
  useEffect(() => {
    if (!account && window.localStorage.getItem('accountStatus')) {
    connect('injected')
    }
  }, [account, connect])
  const { onPresentConnectModal } = useWalletModal(connect, reset)

  const [requestedApproval, setRequestedApproval] = useState(false)
  const allowance = useLaunchPoolAllowance()
  const { onApprove } = useLaunchPoolApprove()
  // const [onPresentApprove] = useModal(<PurchaseWarningModal />)
  // const oneDogeAmount = window.localStorage.getItem("shibgxBalance");
  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      const txHash = await onApprove()
      // user rejected tx or didn't go thru
      if (!txHash) {
        setRequestedApproval(false)
      }
      // onPresentApprove()
    } catch (e) {
      console.error(e)
    }
  }, [onApprove])

  const [pendingInvest, setPendingInvest] = useState(false)
  const [pendingWithdraw, setPendingWithdraw] = useState(false)
  const [pendingClaim, setPendingClaim] = useState(false)
  const [status, setStatus] = useState(false)

  const startTime = useGetStartTime();
  const depositedAmount = useGetDepositedAmount();
  const period = useGetPeriod();
  // const minimumInvestAmount = useGetMinimumInvestAmount();
  const oldTokenAmount = useGetOldTokenAmount();
  const oldClaimAmount = useGetOldClaimAmount();

  const availableTime = startTime + period;
    // console.log(Date.now());
    // console.log('availableTime', availableTime)
  useEffect(() => {
    setStatus(Date.now() < availableTime * 1000);
  }, [availableTime])

  const tokenBalance = useTokenBalance();

  const [onInvestResult] = useModal(<OrderModal title="Invest SHIBGX" id='invest' tokenBalance={tokenBalance}/>) 
  // const [onWithdrawResult] = useModal(<OrderModal title="Withdraw SHIBGX" id='withdraw'/>) 
  const { onWithdrawSHIBGX } = useWithdrawSHIBGX()
  // const [onClaimResult] = useModal(<OrderModal title="Claim SHIBGX, BNB" id='claim' />)
  const { onClaim } = useClaim()

  return (
      <Page>
        <Hero>
          <StyledHead>
            <StyledHeading as="h1" size="xl" color="contrast">
              LaunchPool
            </StyledHeading>
          </StyledHead>
        </Hero>
        <PageContent>
          <StyledBody>
          <StyledText>If you have Magic Stone, you can hold $SHIBGX here and get BNB as a reward!</StyledText>
            {(oldTokenAmount > 0)?(
            <CycleContent>
              <Heading as="h3" size="xl" mb="24px" color="primary">
                Old Cycle
              </Heading>
              <BlockContext>
                <BlockTitle>Invested Amount : </BlockTitle>
                <BlockContent>{Math.floor(oldTokenAmount / 10 ** 9)} $SHIBGX</BlockContent>
              </BlockContext>
              <BlockContext>
                <BlockTitle>Profit : </BlockTitle>
                <BlockContent>{Math.floor(oldClaimAmount / 10 ** 14) / 10 ** 4} BNB</BlockContent>
              </BlockContext>
              <BlockContext>
                <Button size="sm" mt="20px"
                  variant="secondary" 
                  disabled={pendingClaim}
                  onClick={async () => {
                      setPendingClaim(true)
                      onClaim()
                      setPendingClaim(false)
                  }}>{pendingClaim ? 'Pending Claim' : 'Claim $SHIBGX & BNB'}</Button>
              </BlockContext>
            </CycleContent>
            ):(<></>)}
            <CycleContent>
              <Heading as="h3" size="xl" mb="24px" color="primary">
                Current Cycle
              </Heading>
              <BlockContext>
                <BlockTitle>StartTime :</BlockTitle>
                <BlockContent>{(parseInt(startTime.toString()) === 0)?(<>Cycle will be started soon</>):(new Date(startTime*1000).toLocaleDateString("en-us"))}</BlockContent>
              </BlockContext>
              <BlockContext>
                <BlockTitle>SubScription Period : </BlockTitle>
                <BlockContent>{(parseInt(startTime.toString()) === 0)?(<>_</>):(<>{period/(3600 * 24)} day(s)</>)}</BlockContent>
              </BlockContext>
              <BlockContext>
                <BlockTitle>Invested Amount : </BlockTitle>
                <BlockContent>{(parseInt(startTime.toString()) === 0)?(<>_</>):(<>{Math.floor(depositedAmount / 10 ** 9)} $SHIBGX</>)}</BlockContent>
              </BlockContext>
              <BlockContext>
                { (!allowance.toNumber())?(
                  <Button fullWidth disabled={requestedApproval} size="sm" variant="secondary" onClick={handleApprove}>
                    Approve
                  </Button>
                ):(
                <Button size="sm" mt="20px" variant="secondary"
                  disabled={pendingInvest || !status}
                  onClick={async () => {
                      setPendingInvest(true)
                      onInvestResult()
                      setPendingInvest(false)
                  }}>{pendingInvest ? 'Pending Invest' : 'Invest SHIBGX'}</Button>
                )}
                { (!allowance.toNumber())?(
                  <Button fullWidth disabled={requestedApproval} size="sm" variant="secondary" onClick={handleApprove}>
                    Approve
                  </Button>
                ):(
                <Button size="sm" mt="20px" variant="secondary" 
                  disabled={pendingWithdraw || !status || parseInt(depositedAmount.toString()) === 0}
                  onClick={async () => {
                      setPendingWithdraw(true)
                      onWithdrawSHIBGX()
                      setPendingWithdraw(false)
                  }}>{pendingWithdraw ? 'Pending Withdraw' : 'Withdraw $SHIBGX'}</Button>
                )}
              </BlockContext>
            </CycleContent>
          </StyledBody>
        </PageContent>
      </Page>
  )
}

export default LauchPool
