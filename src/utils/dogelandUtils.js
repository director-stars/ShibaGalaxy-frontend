/* eslint-disable no-await-in-loop */
import Web3 from 'web3'
import { getWeb3 } from 'utils/web3'
import { classes } from 'hooks/useDogeInfo'

let referer="0x0000000000000000000000000000000000000000" ;
function checkReferer(){
  if (window.localStorage.getItem("referer"))
  {   
    referer= window.localStorage.getItem("referer");
  }
}

const API_URL = process.env.REACT_APP_API_URL;
const oldShibaIds = [1,2,3,4,6,7,11,12,13,14,15,16,17,19,20,22,23,24,25,26,27,28,29];
export const getBattleBosses = async () => {
  const res = await fetch(`${API_URL}/battle-bosses`, {
      method: "GET",
  });
  const response = await res.json();
  return response
}

export const getMyFightDoges = async (MarketControllerContract, account) => {
  try {    
    const unSaleDoges = await MarketControllerContract.methods.getShibaByOwner().call({
      from: account
    });

    const dogeIds = [];
    for (let i = 0; i < unSaleDoges.length; i ++) {
      dogeIds.push(unSaleDoges[i]._tokenId);
    }

    const fightDoges = [];
    let doge = {};
    for (let i = 0; i < unSaleDoges.length; i ++) {
      doge = {};
      
      doge._rare = unSaleDoges[i]._rare;
      doge._level = unSaleDoges[i]._level;
      doge._exp = unSaleDoges[i]._exp;
      doge._tribe = unSaleDoges[i]._tribe;
      doge._tokenId = unSaleDoges[i]._tokenId;
      doge._farmTime = unSaleDoges[i]._farmTime;
      doge._battleTime = unSaleDoges[i]._battleTime;
      doge._isEvolved = unSaleDoges[i]._isEvolved;
      doge.fightNumber = unSaleDoges[i]._fightNumber;
      doge._stoneInfo = unSaleDoges[i]._stoneInfo;
      doge._classInfo = unSaleDoges[i]._classInfo;
      if(oldShibaIds.includes(parseInt(doge._tokenId))){
        doge._classInfo = "0";
      }
      if(unSaleDoges[i]._isEvolved)
        fightDoges.push(doge);
    }
    return fightDoges;
  } catch (err) {
    return [];
  }
}

// export const dbCreateDoge = async (tokenId, firstPurchaseTime ,account, classInfo, token) => {
//   checkReferer();
//   const refererAddress = (firstPurchaseTime === "0")?referer:"0x0000000000000000000000000000000000000000";
//   const res = await fetch(`${API_URL}/crypto-doges-create`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//           tokenId,
//           owner: account,
//           classInfo,
//           fightNumber: 3,
//           referee: refererAddress,
//           token
//       })
//   });
//   const response = await res.json();
//   return response
// }

// export const dbUpdateOwner = async (_tokenId, firstPurchaseTime, account, token) => {
//   checkReferer();
//   const refererAddress = (firstPurchaseTime === "0")?referer:"0x0000000000000000000000000000000000000000";
//   const res = await fetch(`${API_URL}/crypto-doges-update`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//           tokenId: _tokenId,
//           owner: account,
//           referee: refererAddress,
//           token
//       })
//   });
//   const response = await res.json();
//   return response
// }

export const getMonsters = async (cryptoDogeControllerContract) => {
  try {
    const monsters = Array(4);
    monsters[0] = await cryptoDogeControllerContract.methods.monsters(0).call();
    monsters[1] = await cryptoDogeControllerContract.methods.monsters(1).call();
    monsters[2] = await cryptoDogeControllerContract.methods.monsters(2).call();
    monsters[3] = await cryptoDogeControllerContract.methods.monsters(3).call();
    monsters[0].id = 0;
    monsters[1].id = 1;
    monsters[2].id = 2;
    monsters[3].id = 3;
    return monsters
  } catch (err) {
    return [];
  }
}

export const getNextClaimTime = async (cryptoDogeControllerContract, account) => {
  try {
    const nextClaimTime = await cryptoDogeControllerContract.methods.nextClaimTime(account).call();
    return nextClaimTime;
  } catch (err) {
    return 0;
  }
}

export const buyDoge = async (cryptoDogeControllerContract, account, price, payment) => {
  checkReferer();
  const tribe = Math.floor(Math.random() * 4);
  try {
    if(payment === 0)
      return cryptoDogeControllerContract.methods
        .buyShiba([tribe], referer, true)
        .send({ from: account, value: Web3.utils.toWei(price)})
        .on('transactionHash', (tx) => {
          return tx.transactionHash
        })
    return cryptoDogeControllerContract.methods
      .buyShiba([tribe], referer, false)
      .send({ from: account })
      .on('transactionHash', (tx) => {
        return tx.transactionHash
      })
  } catch (err) {
    return console.error('err')
  }
}

export const buyStone = async (magicStoneControllerContract, account, price, payment) => {
  try {
    if(payment === 0)
      return magicStoneControllerContract.methods
        .buyStone(true)
        .send({ from: account, value: Web3.utils.toWei(price)})
        .on('transactionHash', (tx) => {
          return tx.transactionHash
        })
    return magicStoneControllerContract.methods
      .buyStone(false)
      .send({ from: account})
      .on('transactionHash', (tx) => {
        return tx.transactionHash
      })
  } catch (err) {
    return console.error('err')
  }
}

export const openChest = async (cryptoDogeControllerContract, account, tokenId) => {
  try {
    return cryptoDogeControllerContract.methods
      .setDNA(tokenId)
      .send({ from: account })
      .on('transactionHash', (tx) => {
        return tx.transactionHash
      })
  } catch (err) {
    return console.error('err')
  }
}

export const getLastTokenId = async (cryptoDogeNFTContract, account) => {
  try {
    const nftNumbers = await cryptoDogeNFTContract.methods
    .balanceOf(account).call();
    return await cryptoDogeNFTContract.methods
    .tokenOfOwnerByIndex(account, parseInt(nftNumbers.toString())-1).call()
  } catch (err) {
    return console.error('err')
  }
}

export const getDogeInfo = async(cryptoDogeNFTContract, tokenId) => {
  try{
    return await cryptoDogeNFTContract.methods.getShiba(tokenId).call();
  } catch (err) {
    return console.error('err')
  }
}

export const fightMonster = async (cryptoDogeControllerContract, account, monsterId, tokenId) => {
  try {
    const result = await cryptoDogeControllerContract.methods.fight(tokenId, account, monsterId).send({ 
      from: account,
      gasPrice: 10000000000,
      gas: 300000,
    });
    return result;
  } catch (err) {
    return err;
  }
}

export const getRewardTokenInfo = async (cryptoDogeNFTContract, account) => {
  try {
    const result = await cryptoDogeNFTContract.methods.getClaimTokenAmount(account).call();
    return result;
  } catch (err) {
    return 0;
  }
}

export const claimReward = async (cryptoDogeControllerContract, account) => {
  try {
    return cryptoDogeControllerContract.methods
      .claimToken()
      .send({ from: account })
      .on('transactionHash', (tx) => {
        return tx.transactionHash
      })
  } catch (err) {
    return console.error('err')
  }
}

export const orderDoge = async (cryptoDogeNFTContract, account, tokenId, price) => {

  try {
    return cryptoDogeNFTContract.methods
      .placeOrder(tokenId, Web3.utils.toWei(price, "Gwei"))
      .send({ from: account })
      .on('transactionHash', (tx) => {
        return tx.transactionHash
      })
  } catch (err) {
    console.log(err)
    return console.error('err')
  }
}

export const cancelOrder = async (cryptoDogeNFTContract, account, tokenId) => {
  try {
    return cryptoDogeNFTContract.methods
      .cancelOrder(tokenId)
      .send({ from: account })
      .on('transactionHash', (tx) => {
        return tx.transactionHash
      })
  } catch (err) {
    return console.error('err')
  }
}

export const fillOrder = async (cryptoDogeNFTContract, account, tokenId) => {
  checkReferer();
  try {
    return cryptoDogeNFTContract.methods
      .fillOrder(tokenId, referer)
      .send({ from: account })
      .on('transactionHash', (tx) => {
        return tx.transactionHash
      })
  } catch (err) {
    return console.error('err')
  }
}

export const getDogeOfSaleByOwner = async(MarketControllerContract, account) => {
  try {

    const unSaleDoges = await MarketControllerContract.methods.getShibaOfSaleByOwner().call({
      from: account
    });

    const dogeIds = [];
    for (let i = 0; i < unSaleDoges.length; i ++) {
      dogeIds.push(unSaleDoges[i]._tokenId);
    }

    const fightDoges = [];
    let doge = {};
    for (let i = 0; i < unSaleDoges.length; i ++) {
      doge = {};
      
      doge._rare = unSaleDoges[i]._rare;
      doge._level = unSaleDoges[i]._level;
      doge._exp = unSaleDoges[i]._exp;
      doge._tribe = unSaleDoges[i]._tribe;
      doge._tokenId = unSaleDoges[i]._tokenId;
      doge._salePrice = unSaleDoges[i]._salePrice;
      doge._isEvolved = unSaleDoges[i]._isEvolved;
      doge._stoneInfo = unSaleDoges[i]._stoneInfo;
      doge._classInfo = unSaleDoges[i]._classInfo;
      if(oldShibaIds.includes(parseInt(doge._tokenId))){
        doge._classInfo = "0";
      }
      if(unSaleDoges[i]._isEvolved)
        fightDoges.push(doge);
    }
    return fightDoges;
  } catch (err) {
    return []
  }
}

export const getDogeOfSale = async(MarketControllerContract) => {
  try {
    
    // const res = await fetch(`${API_URL}/crypto-doges`, {
    //   method: "GET",
    // });

    const unSaleDoges = await MarketControllerContract.methods.getShibaOfSale().call();

    const fightDoges = [];
    // const dogesExtraInfo = await res.json();
    // console.log(dogesExtraInfo)
    let doge = {};
    for (let i = 0; i < unSaleDoges.length; i ++) {
      doge = {};
      
      doge._rare = unSaleDoges[i]._rare;
      doge._level = unSaleDoges[i]._level;
      doge._exp = unSaleDoges[i]._exp;
      doge._tribe = unSaleDoges[i]._tribe;
      doge._tokenId = unSaleDoges[i]._tokenId;
      doge._isEvolved = unSaleDoges[i]._isEvolved;
      doge._owner = unSaleDoges[i]._owner;
      doge._salePrice = unSaleDoges[i]._salePrice;
      doge._stoneInfo = unSaleDoges[i]._stoneInfo;
      doge._stoneInfo = '';
      doge._classInfo = unSaleDoges[i]._classInfo;
      // for (let j = 0; j < dogesExtraInfo.length; j ++){
      //   if(unSaleDoges[i]._tokenId === dogesExtraInfo[j].Doge_ID){
      //     doge._classInfo = dogesExtraInfo[j].classInfo; 
      //   }
      // }
      if(oldShibaIds.includes(parseInt(doge._tokenId))){
        doge._classInfo = "0";
      }
      doge._name = classes[parseInt(doge._rare) - 1][doge._classInfo].name;
      if(unSaleDoges[i]._isEvolved)
        fightDoges.push(doge);
    }
    return fightDoges;
  } catch (err) {
    return []
  }
}

export const getDogeByOwner = async(MarketControllerContract, account) => {
  try {
    const unSaleDoges = await MarketControllerContract.methods.getShibaByOwner().call({
      from: account
    });
    const dogeIds = [];
    for (let i = 0; i < unSaleDoges.length; i ++) {
      dogeIds.push(unSaleDoges[i]._tokenId);
    }

    const fightDoges = [];
    let doge = {};
    for (let i = 0; i < unSaleDoges.length; i ++) {
      doge = {};
      
      doge._rare = unSaleDoges[i]._rare;
      doge._level = unSaleDoges[i]._level;
      doge._exp = unSaleDoges[i]._exp;
      doge._tribe = unSaleDoges[i]._tribe;
      doge._tokenId = unSaleDoges[i]._tokenId;
      doge._farmTime = unSaleDoges[i]._farmTime;
      doge._battleTime = unSaleDoges[i]._battleTime;
      doge._isEvolved = unSaleDoges[i]._isEvolved;
      doge.fightNumber = 0;
      doge._stoneInfo = unSaleDoges[i]._stoneInfo;
      doge._salePrice = unSaleDoges[i]._salePrice;
      doge._classInfo = unSaleDoges[i]._classInfo;
      if(oldShibaIds.includes(parseInt(doge._tokenId))){
        doge._classInfo = "0";
      }
      fightDoges.push(doge);
    }
    return fightDoges;
  } catch (err) {
    return []
  }
}

export const getBnbBalance = async(account) => {
  try {
    if(account){
      const bnb = await getWeb3().eth.getBalance(account);
      return parseInt(bnb);
    }
    return 0;
  } catch (err) {
    return 0;
  }
}

export const getShibaNFTBalance = async(cryptoDogeNFTContract, account) => {
  try {
    if(account){
      const balance = await cryptoDogeNFTContract.methods.balanceOf(account).call();
      const order = await cryptoDogeNFTContract.methods.orders(account).call();
      const result = parseInt(balance) + parseInt(order);
      return result;
    }
    return 0;
  } catch (err) {
    return 0;
  }
}

export const getTokenBalance = async(oneDogeContract, account) => {
  try {
    if(account){
      const balance = await oneDogeContract.methods.balanceOf(account).call();
      return balance;
    }
    return 0;
  } catch (err) {
    return 0;
  }
}

export const getStoneNFTBalance = async(stoneNFTContract, account) => {
  try {
    if(account){
      const balance = await stoneNFTContract.methods.balanceOf(account).call();
      return balance;
    }
    return 0;
  } catch (err) {
    return 0;
  }
}

export const getStoneByOwner = async(MarketControllerContract, account) => {
  try {
    const result = await MarketControllerContract.methods.getStoneByOwner().call({
      from: account
    });
    return result;
  } catch (err) {
    return []
  }
}

export const unsetAutoFight = async(magicStoneControllerContract, account, tokenId) => {
  try {
    return magicStoneControllerContract.methods
    .unsetAutoFight(tokenId)
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
  } catch (err) {
    return console.error('err')
  }
}

export const setAutoFight = async(magicStoneControllerContract, account, tokenId, _stoneId, monsterId) => {
  try {
    return magicStoneControllerContract.methods
    .setAutoFight(tokenId, _stoneId, monsterId)
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
  } catch (err) {
    return console.error('err')
  }
}

export const getResultOfAutoFight = async(magicStoneControllerContract, account, tokenId) => {
  try {
    const result = await magicStoneControllerContract.methods.getAutoFightResults(tokenId).send({ from: account });
    return result;
  } catch (err) {
    return err;
  }
}

export const getAirDropInfo = async(airDropContract, account) => {
  try {
    const exist = await airDropContract.methods.contributors(account).call();
    const withdrawDate = await airDropContract.methods.withdrawDate(account).call();
    const result = exist && (withdrawDate === '0');
    return result;
  } catch (err) {
    return false;
  }
}

export const claimAirDrop = async(airDropContract, account) => {
  try {
    const result = await airDropContract.methods.airDrop(account).send({ from : account });
    return result;
  } catch (err) {
    return false;
  }
}

// export const dbGetReferralHistory = async() => {
//   const curr = new Date();
//   const first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
//   const firstday = new Date(curr.setDate(first));
//   const res = await fetch(`${API_URL}/crypto-doges-referral-history?purchaseTime_gte=${firstday.valueOf()}`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     }
//   });
//   const response = await res.json();
//   return response;
// }

export const getShibaSupply = async(cryptoDogeNFTContract) => {
  const supply = await cryptoDogeNFTContract.methods.totalSupply().call();
  return supply;
}

export const getStoneSupply = async(magicStoneNFTContract) => {
  const supply = await magicStoneNFTContract.methods.totalSupply().call();
  return supply;
}

// export const dbUpdateEarnedAmount = async(account, amount, token) => {
//   await fetch(`${API_URL}/earned-amounts/update`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//           address: account,
//           amount,
//           token
//       })
//   });
// }

// export const dbGetClaimList = async() => {
//   const res = await fetch(`${API_URL}/earned-amounts`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     }
//   });
//   const response = await res.json();
//   return response;
// }

export const getShibaPrice = async (cryptoDogeControllerContract) => {
  try {
    const amount = await cryptoDogeControllerContract.methods.getTokenAmountForShiba().call();
    return amount;
  } catch (err) {
    return '0';
  }
}

export const getStonePrice = async (magicStoneControllerContract) => {
  try {
    const amount = await magicStoneControllerContract.methods.getTokenAmountForStone().call();
    return amount;
  } catch (err) {
    return '0';
  }
}