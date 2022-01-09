/* eslint-disable no-await-in-loop */
import Web3 from 'web3'
import { getWeb3 } from 'utils/web3'

export const getStartTime = async (launchPoolContract, account) => {
  try {
    const startTime = await launchPoolContract.methods.startTime().call();
    return startTime;
  } catch (err) {
    return 0;
  }
}

export const getDepositedAmount = async (launchPoolContract, account) => {
  try {
    const depositedAmount = await launchPoolContract.methods.getDepositedAmount(account).call();
    return depositedAmount;
  } catch (err) {
    return 0;
  }
}

export const getPeriod = async (launchPoolContract, account) => {
  try {
    const period = await launchPoolContract.methods.depositTime().call();
    return period;
  } catch (err) {
    return 0;
  }
}

export const getMinimumInvestAmount = async (launchPoolContract, account) => {
  try {
    const minimumInvestAmount = await launchPoolContract.methods.minimumInvestAmount().call();
    return minimumInvestAmount;
  } catch (err) {
    return 0;
  }
}

export const getOldTokenAmount = async (launchPoolContract, account) => {
  try {
    const oldTokenAmount = await launchPoolContract.methods.getOldTokenAmount(account).call();
    return oldTokenAmount;
  } catch (err) {
    return 0;
  }
}

export const getOldClaimAmount = async (launchPoolContract, account) => {
  try {
    const oldClaimAmount = await launchPoolContract.methods.getOldClaimAmount(account).call();
    return oldClaimAmount;
  } catch (err) {
    return 0;
  }
}

export const invest = async (launchPoolContract, account, value) => {
  try {
    return launchPoolContract.methods
      .deposit(account, Web3.utils.toWei(value, "Gwei"))
      .send({ from: account })
      .on('transactionHash', (tx) => {
        return tx.transactionHash
      })
  } catch (err) {
    console.log(err)
    return console.error('err')
  }
}

export const withdraw = async (launchPoolContract, account) => {
  try {
    return launchPoolContract.methods
      .withdrawTokenForCurrentRound(account)
      .send({ from: account })
      .on('transactionHash', (tx) => {
        return tx.transactionHash
      })
  } catch (err) {
    console.log(err)
    return console.error('err')
  }
}

export const claim = async (launchPoolContract, account) => {
  try {
    return launchPoolContract.methods
      .claimAndWithdrawForOldRound(account)
      .send({ from: account })
      .on('transactionHash', (tx) => {
        return tx.transactionHash
      })
  } catch (err) {
    console.log(err)
    return console.error('err')
  }
}