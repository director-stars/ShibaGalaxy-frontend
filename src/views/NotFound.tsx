import React from 'react'
import styled from 'styled-components'
import { Button, Heading } from '@pancakeswap-libs/uikit'
import Page from 'components/layout/Page'
import PageContent from 'components/layout/PageContent'
import useI18n from 'hooks/useI18n'

const StyledNotFound = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 64px);
  justify-content: center;
`
const StyledHead = styled(Heading)`
  margin-bottom: 30px;
  display:flex;
  column-gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
`

const NotFound = () => {
  const TranslateString = useI18n()

  return (
    <Page>
      <StyledNotFound>
        {/* <LogoIcon width="64px" mb="8px" /> */}
        <StyledHead size="xxl">
          <Heading as="h1" size="xxl" mb="24px" color="contrast">
            Coming
          </Heading>
          <Heading as="h1" size="xxl" mb="24px" color="primary">
            Soon!
          </Heading>
        </StyledHead>
        <PageContent>
        {/* <Text mb="16px">{TranslateString(999, 'Oops, page not found.')}</Text> */}
          <Button as="a" href="/" size="sm">
            {TranslateString(999, 'Back Home')}
          </Button>
        </PageContent>
      </StyledNotFound>
    </Page>
  )
}

export default NotFound
