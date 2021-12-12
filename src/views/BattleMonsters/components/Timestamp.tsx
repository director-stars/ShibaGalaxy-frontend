import React from 'react'
import { Button } from '@pancakeswap-libs/uikit'
import formatLotteryDate from '../helpers/formatLotteryDate'

interface TimestampProps {
  battleTime: number,
  cycle: number
}

const Timestamp: React.FC<TimestampProps> = ({ battleTime, cycle }) => {
  const hours = Math.floor((cycle + battleTime - Date.now()) / 3600 / 1000);
  const minutes = Math.floor((cycle + battleTime - Date.now()) / 60 / 1000);

  return (
    <>
    {(hours > 0)?(
      <Button disabled fullWidth size="sm">Next Fight in {hours} hour(s)</Button>
    ):(
      <Button disabled fullWidth size="sm">Next Fight in {minutes} minute(s)</Button>
    )}
    </>
  )
}

export default Timestamp
