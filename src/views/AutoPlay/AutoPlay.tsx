import React, { useEffect, useState, useCallback } from 'react'
import styled from 'styled-components'
import { Heading } from '@pancakeswap-libs/uikit'
import Page from 'components/layout/Page'
import PageContent from 'components/layout/PageContent'
import { useMonsters, useMyFightDoges, useMyStone } from 'hooks/useDogesLand'
import FlexLayout from 'components/layout/Flex'
import DogeCard from './components/DogeCard'
import StoneCard from './components/StoneCard'
import MonsterCard from './components/MonsterCard'

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
  // display:flex;
  // column-gap: 20px;
`
const StyledHeading = styled(Heading)`
  font-size: 4.5rem;
`
const MyDoges = styled.div`
  text-align: center;
  overflow: hidden;
  align-content: center;
`
const Monsters = styled.div`
  text-align: center;
`
const StyledFlexLayout = styled(FlexLayout)`
  & > * {
    min-width: 280px;
    max-width: 20%;
    margin: 0 2%;
    margin-bottom: 20px;
  }
`
// const StyledDiv = styled.div`
//   column-gap: 20px;
//   display: inline-flex;
//   margin-bottom: 20px;
// `

// const Row = styled.div`
//   margin-bottom: 32px;

//   & > button + button {
//     margin-left: 16px;
//   }
// `;

// const StyledHeading = styled(Heading)`
//   letter-spacing: 2px;
//   text-align: center;
//   font-weight: 400px;
// `

const AutoPlay: React.FC = () => {
  // const { url, title } = props
  // const chevronWidth = 40;
  const stones = useMyStone();
  const stoneSize = stones.length;
  const monsters = useMonsters();
  const [activeMonsterId, setActiveMonsterId] = useState('');
  // const [magicStoneNFTBalance, setMagicStoneNFTBalance] = useState(parseInt(window.localStorage.getItem("magicStoneNFTBalance")));
  const [magicStoneNFTBalance, setMagicStoneNFTBalance] = useState(0);
  const [activeStoneId, setActiveStoneId] = useState(0);
  let availableStone = 0;
  let availableStoneId = 0;
  // console.log(stones)
  for(let i = 0; i < stoneSize; i ++){
    // setActiveStoneId(0);
    if(stones[i]._dogeId === "0") {
      availableStone ++;
      availableStoneId = stones[i]._tokenId;
      // setActiveStoneId(stones[i]._tokenId);
    }
  }
  if(availableStone !== 0 && availableStoneId !== activeStoneId)
    setActiveStoneId(availableStoneId);
  useEffect(() => {
    if(stoneSize !== 0){
      setMagicStoneNFTBalance(availableStone);
      window.localStorage.setItem("magicStoneNFTBalance", availableStone.toString())
    }
  }, [ availableStone, stoneSize ])



  let doges = useMyFightDoges();
  if(doges === undefined) doges = [];
  const monsterList = useCallback(
    (monstersToDisplay, removed: boolean) => {
      return monstersToDisplay.map((monster) => (
        <MonsterCard 
            id={monster.id}
            health={monster._hp}
            successRate={monster._successRate}
            rewardTokenFrom={monster._rewardTokenFrom}
            rewardTokenTo={monster._rewardTokenTo}
            rewardExpFrom={monster._rewardExpFrom}
            rewardExpTo={monster._rewardExpTo}
            activeMonster={activeMonsterId}
            setActiveMonster={setActiveMonsterId}
          />
      ))
    },
    [activeMonsterId]
  )
  const dogeList = useCallback(
    (dogesToDisplay, removed: boolean) => {
      return dogesToDisplay.map((doge) => (
        <DogeCard
          id={doge._tokenId}
          classInfo={doge._classInfo}
          price={doge._salePrice}
          owner={doge._owner}
          level={doge._level}
          rare={doge._rare}
          exp={doge._exp}
          tribe={doge._tribe}
          stoneInfo={doge._stoneInfo}
          activeMonster={activeMonsterId}
          setActiveMonster={setActiveMonsterId}
          magicStoneNFTBalance={magicStoneNFTBalance}
          setMagicStoneNFTBalance={setMagicStoneNFTBalance}
          activeStoneId={activeStoneId}
        />
      ))
    },
    [activeMonsterId, magicStoneNFTBalance, activeStoneId, setMagicStoneNFTBalance],
  )
  return (
    <Page>
      <Hero>
        <StyledHead>
          <StyledHeading as="h1" size="xxl" mb="24px" color="contrast">
            Auto Play
          </StyledHeading>
        </StyledHead>
      </Hero>
      <PageContent>
        <FlexLayout>
          {/* <StoneCard magicStoneNFTBalance={magicStoneNFTBalance}/> */}
          <StoneCard magicStoneNFTBalance={stoneSize}/>
        </FlexLayout>
        {/* <Monsters>
          <StyledFlexLayout>
            {(typeof monsters === typeof [])?monsterList(monsters, true):(<></>)}
          </StyledFlexLayout>
        </Monsters>
        <MyDoges>
          {(typeof doges === typeof [])?dogeList(doges, true):(<></>)}
        </MyDoges> */}
        {/* <Hero>
          <StyledHead>
            <Heading as="h1" size="xxl" mb="24px" color="contrast">
              Coming
            </Heading>
            <Heading as="h1" size="xxl" mb="24px" color="primary">
              Soon
            </Heading>
          </StyledHead>
        </Hero> */}
        <Heading as="h1" size="xl" mb="24px" color="contrast">
          With Autoplay mode , your Shibas can fight Bears & Dragons while you’re away or asleep. All you need to get started is a magic stone
        </Heading>
      </PageContent>
    </Page>
  )
}

export default AutoPlay