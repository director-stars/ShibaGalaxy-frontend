import React from 'react'
import styled from 'styled-components'
import { Image, Button } from '@pancakeswap-libs/uikit'
import Input, { InputProps } from '../Input'

const TokenIcon = styled(Image)`
    width: 24px;
`

interface TokenInputProps extends InputProps {
  max: number | string
  symbol: string
  availableSymbol: string
  onSelectMax?: () => void
}

const TicketInput: React.FC<TokenInputProps> = ({ max, symbol, availableSymbol, onChange, onSelectMax, value }) => {

  return (
    <StyledTokenInput>
      <Input
        endAdornment={
          <StyledTokenAdornmentWrapper>
            {/* <StyledTokenSymbol>{symbol}</StyledTokenSymbol> */}
            <StyledSpacer />
            <div>
              <TokenIcon width={24} height={24} src="/images/egg/9.png"/>
            </div>
            <StyledSpacer />
            <div>
              <Button size="sm" mr="-20px" onClick={onSelectMax}>
                Max
              </Button>
            </div>
          </StyledTokenAdornmentWrapper>
        }
        onChange={onChange}
        placeholder="100, 000"
        value={value}
      />
      <StyledMaxText>{Math.floor(parseInt(max.toString())/10**9)} $SHIBGX{availableSymbol} Available</StyledMaxText>
    </StyledTokenInput>
  )
}

const StyledTokenInput = styled.div``
const StyledSpacer = styled.div`
  width: ${(props) => props.theme.spacing[2]}px;
`

const StyledTokenAdornmentWrapper = styled.div`
  align-items: center;
  display: flex;
`

const StyledMaxText = styled.div`
  align-items: center;
  color: ${(props) => props.theme.colors.primary};
  display: flex;
  font-size: 14px;
  font-weight: 700;
  height: 44px;
  justify-content: flex-end;
`

const StyledTokenSymbol = styled.span`
  color: ${(props) => props.theme.colors.primary};
  font-weight: 700;
`

export default TicketInput
