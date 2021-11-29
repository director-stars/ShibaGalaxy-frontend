import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Heading, Text, Checkbox, Input } from '@pancakeswap-libs/uikit'
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
  // max-width: 23.5%;
  padding: 16px;
  margin: auto;
`
const StyledHeading = styled(Heading)`
  font-size: 4.5rem;
`
const StyledText = styled(Text)`
  font-size: 1.5rem;
`
const BlockDiv = styled.div`
  margin: 10px 0px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 250px;
`
const FilterBlock = styled.div`
  background-color: #3333336e;
  padding: 20px;
  border-radius: 20px;
  width: 300px;
  min-width: 300px;
  height: fit-content;
`
const BlockTitle = styled(Text)`
  margin-top: 30px;
  font-weight: bold;
  letter-spacing: 1px;
`
const CheckBoxBlock = styled.div`
  display: flex;
`
const StyledSpan = styled.span`
  color: #fff;
  margin: 0px 20px 0px 5px;
  line-height: 32px;
  font-size: 20px;
`
const MarketBlock = styled.div`
  display: flex;
`
const MarketPlace: React.FC = () => {
  const [selectedDoges, setSelectedDoges] = useState([])
  const [searchValue, setSearchValue] = useState<string>('')
  
  const [chRare1, setChRare1] = useState(false)
  const [chRare2, setChRare2] = useState(false)
  const [chRare3, setChRare3] = useState(false)
  const [chRare4, setChRare4] = useState(false)
  const [chRare5, setChRare5] = useState(false)
  const [chRare6, setChRare6] = useState(false)

  const [chLevel1, setChLevel1] = useState(false)
  const [chLevel2, setChLevel2] = useState(false)
  const [chLevel3, setChLevel3] = useState(false)
  const [chLevel4, setChLevel4] = useState(false)
  const [chLevel5, setChLevel5] = useState(false)
  const [chLevel6, setChLevel6] = useState(false)

  const [chFire, setChFire] = useState(false)
  const [chSky, setChSky] = useState(false)
  const [chGrass, setChGrass] = useState(false)
  const [chElectric, setChElectric] = useState(false)
  const doges = useSaleDoges()
  // console.log(doges)
  const handleInput = useCallback((e) => {
    setSearchValue(e.target.value)
  }, [])

  const toggleCheckRare1 = useCallback(() => setChRare1((uc) => !uc),[])
  const toggleCheckRare2 = useCallback(() => setChRare2((uc) => !uc),[])
  const toggleCheckRare3 = useCallback(() => setChRare3((uc) => !uc),[])
  const toggleCheckRare4 = useCallback(() => setChRare4((uc) => !uc),[])
  const toggleCheckRare5 = useCallback(() => setChRare5((uc) => !uc),[])
  const toggleCheckRare6 = useCallback(() => setChRare6((uc) => !uc),[])

  const toggleCheckLevel1 = useCallback(() => setChLevel1((uc) => !uc),[])
  const toggleCheckLevel2 = useCallback(() => setChLevel2((uc) => !uc),[])
  const toggleCheckLevel3 = useCallback(() => setChLevel3((uc) => !uc),[])
  const toggleCheckLevel4 = useCallback(() => setChLevel4((uc) => !uc),[])
  const toggleCheckLevel5 = useCallback(() => setChLevel5((uc) => !uc),[])
  const toggleCheckLevel6 = useCallback(() => setChLevel6((uc) => !uc),[])

  const toggleCheckFire = useCallback(() => setChFire((uc) => !uc),[])
  const toggleCheckSky = useCallback(() => setChSky((uc) => !uc),[])
  const toggleCheckGrass = useCallback(() => setChGrass((uc) => !uc),[])
  const toggleCheckElectric = useCallback(() => setChElectric((uc) => !uc),[])
  useEffect(() => {
    setSelectedDoges(doges.filter(
        (doge) => {
          let cr1 =  chRare1 ? doge._rare === '1' : true
          let cr2 =  chRare2 ? doge._rare === '2' : true
          let cr3 =  chRare3 ? doge._rare === '3' : true
          let cr4 =  chRare4 ? doge._rare === '4' : true
          let cr5 =  chRare5 ? doge._rare === '5' : true
          let cr6 =  chRare6 ? doge._rare === '6' : true
          if(chRare1 || chRare2 || chRare3 || chRare4 || chRare5 || chRare6){
            cr1 =  chRare1 ? doge._rare === '1' : false
            cr2 =  chRare2 ? doge._rare === '2' : false
            cr3 =  chRare3 ? doge._rare === '3' : false
            cr4 =  chRare4 ? doge._rare === '4' : false
            cr5 =  chRare5 ? doge._rare === '5' : false
            cr6 =  chRare6 ? doge._rare === '6' : false
          }

          let cl1 =  chLevel1 ? doge._level === '1' : true
          let cl2 =  chLevel2 ? doge._level === '2' : true
          let cl3 =  chLevel3 ? doge._level === '3' : true
          let cl4 =  chLevel4 ? doge._level === '4' : true
          let cl5 =  chLevel5 ? doge._level === '5' : true
          let cl6 =  chLevel6 ? doge._level === '6' : true
          if(chLevel1 || chLevel2 || chLevel3 || chLevel4 || chLevel5 || chLevel6){
            cl1 =  chLevel1 ? doge._level === '1' : false
            cl2 =  chLevel2 ? doge._level === '2' : false
            cl3 =  chLevel3 ? doge._level === '3' : false
            cl4 =  chLevel4 ? doge._level === '4' : false
            cl5 =  chLevel5 ? doge._level === '5' : false
            cl6 =  chLevel6 ? doge._level === '6' : false
          }

          let ct1 =  chFire ? doge._tribe === '0' : true
          let ct2 =  chSky ? doge._tribe === '1' : true
          let ct3 =  chGrass ? doge._tribe === '2' : true
          let ct4 =  chElectric ? doge._tribe === '3' : true
          if(chFire || chSky || chGrass || chElectric){
            ct1 =  chFire ? doge._tribe === '0' : false
            ct2 =  chSky ? doge._tribe === '1' : false
            ct3 =  chGrass ? doge._tribe === '2' : false
            ct4 =  chElectric ? doge._tribe === '3' : false
          }
          return doge._name.toLowerCase().includes(searchValue.toLowerCase()) && (cr1 || cr2 || cr3 || cr4 || cr5 || cr6) && (cl1 || cl2 || cl3 || cl4 || cl5 || cl6) && (ct1 || ct2 || ct3 || ct4)
        }
      )
    );
  }, [doges, searchValue, chRare1, chRare2, chRare3, chRare4, chRare5, chRare6, chLevel1, chLevel2, chLevel3, chLevel4, chLevel5, chLevel6, chFire, chSky, chGrass, chElectric])
  const dogeList = useCallback(
    (dogesToDisplay, removed: boolean) => {
      return dogesToDisplay.map((doge, index) => {
        console.log(index)
        return <MarketItem key={doge._tokenId}>
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
      })
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
        <MarketBlock>
        <FilterBlock>
          <Input type="text" scale="md" placeholder="Search Your Shibas" value={searchValue} onChange={handleInput}/>
          <BlockTitle color="primary">Rare</BlockTitle>
          <BlockDiv>
            <CheckBoxBlock>
              <Checkbox scale="sm" checked={chRare1} onChange={toggleCheckRare1}/>
              <StyledSpan>1</StyledSpan>
            </CheckBoxBlock>
            <CheckBoxBlock>
              <Checkbox scale="sm" checked={chRare2} onChange={toggleCheckRare2}/>
              <StyledSpan>2</StyledSpan>
            </CheckBoxBlock>
            <CheckBoxBlock>
              <Checkbox scale="sm" checked={chRare3} onChange={toggleCheckRare3}/>
              <StyledSpan>3</StyledSpan>
            </CheckBoxBlock>
            <CheckBoxBlock>
              <Checkbox scale="sm" checked={chRare4} onChange={toggleCheckRare4}/>
              <StyledSpan>4</StyledSpan>
            </CheckBoxBlock>
            <CheckBoxBlock>
              <Checkbox scale="sm" checked={chRare5} onChange={toggleCheckRare5}/>
              <StyledSpan>5</StyledSpan>
            </CheckBoxBlock>
            <CheckBoxBlock>
              <Checkbox scale="sm" checked={chRare6} onChange={toggleCheckRare6}/>
              <StyledSpan>6</StyledSpan>
            </CheckBoxBlock>
          </BlockDiv>
          <BlockTitle color="primary">Level</BlockTitle>
          <BlockDiv>
          <CheckBoxBlock>
              <Checkbox scale="sm" checked={chLevel1} onChange={toggleCheckLevel1}/>
              <StyledSpan>1</StyledSpan>
            </CheckBoxBlock>
            <CheckBoxBlock>
              <Checkbox scale="sm" checked={chLevel2} onChange={toggleCheckLevel2}/>
              <StyledSpan>2</StyledSpan>
            </CheckBoxBlock>
            <CheckBoxBlock>
              <Checkbox scale="sm" checked={chLevel3} onChange={toggleCheckLevel3}/>
              <StyledSpan>3</StyledSpan>
            </CheckBoxBlock>
            <CheckBoxBlock>
              <Checkbox scale="sm" checked={chLevel4} onChange={toggleCheckLevel4}/>
              <StyledSpan>4</StyledSpan>
            </CheckBoxBlock>
            <CheckBoxBlock>
              <Checkbox scale="sm" checked={chLevel5} onChange={toggleCheckLevel5}/>
              <StyledSpan>5</StyledSpan>
            </CheckBoxBlock>
            <CheckBoxBlock>
              <Checkbox scale="sm" checked={chLevel6} onChange={toggleCheckLevel6}/>
              <StyledSpan>6</StyledSpan>
            </CheckBoxBlock>
          </BlockDiv>
          <BlockTitle color="primary">Tribe</BlockTitle>
          <BlockDiv>
            <CheckBoxBlock>
              <Checkbox scale="sm" checked={chFire} onChange={toggleCheckFire}/>
              <StyledSpan>Fire</StyledSpan>
            </CheckBoxBlock>
            <CheckBoxBlock>
              <Checkbox scale="sm" checked={chSky} onChange={toggleCheckSky}/>
              <StyledSpan>Sky</StyledSpan>
            </CheckBoxBlock>
            <CheckBoxBlock>
              <Checkbox scale="sm" checked={chGrass} onChange={toggleCheckGrass}/>
              <StyledSpan>Grass</StyledSpan>
            </CheckBoxBlock>
            <CheckBoxBlock>
              <Checkbox scale="sm" checked={chElectric} onChange={toggleCheckElectric}/>
              <StyledSpan>Electic</StyledSpan>
            </CheckBoxBlock>
          </BlockDiv>
        </FilterBlock>
        <FlexLayout>
          {(typeof selectedDoges === typeof [])?dogeList(selectedDoges, true):(<div />)}
        </FlexLayout>
        </MarketBlock>
      </PageContent>
    </Page>
  )
}

export default MarketPlace
