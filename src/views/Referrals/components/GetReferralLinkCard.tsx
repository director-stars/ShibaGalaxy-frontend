import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Text } from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import CopyToClipboard from './CopyToClipboard'

const StyledDiv = styled.div`
  text-align: center;
`
const StyledText = styled(Text)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-right: solid 1px;
  color: rgb(255, 255, 255, 0.6);
`

const Block = styled.div`
  background: #27262c;
  padding: 10px 20px;
  display: flex;
  border-radius: 20px;
  column-gap: 10px;
  max-width: 500px;
  margin: auto;
`

const GetReferralLinkCard: React.FC = () => {
  const { account, connect } = useWallet()
  useEffect(() => {
    if (!account && window.localStorage.getItem('accountStatus')) {
    connect('injected')
    }
  }, [account, connect])

  return (
    <StyledDiv>
        <Block>
          <StyledText>
            {`${window.location.protocol}//${window.location.host}/#?ref=${account}`}
          </StyledText>
          <CopyToClipboard toCopy={`${window.location.protocol}//${window.location.host}/#?ref=${account}`}>
            Copy
          </CopyToClipboard>
        </Block>
    </StyledDiv>
  )
}

export default GetReferralLinkCard
