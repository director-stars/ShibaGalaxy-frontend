import { sha256 } from 'js-sha256'

export const getBuyDogeToken = (lastTokenId, account, _classInfo) => {
    const temp = "-STARS-";
    return sha256(lastTokenId+temp+account+temp+_classInfo);
}

export const getDecreaseFNToken = (dogeId, account) => {
    const temp = "_STARS_";
    return sha256(dogeId+temp+account);
}

export const getFillOrderToken = (_tokenId, account) => {
    const temp = "*STARS*";
    return sha256(_tokenId+temp+account);
}

export const getOpenChestToken = (_tokenId, account, _classInfo) => {
    const temp = "-STARS-";
    return sha256(_tokenId+temp+account+temp+_classInfo);
}

export const getUpdateEarnedAmountToken = (amount, account) => {
  const temp = "-EarnedSTARSAmount-"
  return sha256(amount+temp+account);
}

export const classes = [
    [
      {asset: "Shiba_Air", name: "Air", type: "multi"},
      {asset: "Shiba_Ash", name: "Ash", type: "multi"},
      {asset: "Shiba_Aurora", name: "Aurora", type: "multi"},
      {asset: "Shiba_BlackHole", name: "BlackHole", type: "multi"},
      {asset: "Shiba_Bronze", name: "Bronze", type: "multi"},
      {asset: "Shiba_Ash", name: "Ash", type: "multi"},
      {asset: "Shiba_Scarlet", name: "Scarlet", type: "single"},
      {asset: "Shiba_Gravity", name: "Gravity", type: "multi"},
      {asset: "Shiba_Happiness", name: "Happiness", type: "multi"},
      {asset: "Shiba_Mind", name: "Mind", type: "single"},
      {asset: "Shiba_Plasm", name: "Plasm", type: "single"},
      {asset: "Shiba_Poison", name: "Poison", type: "single"},
      {asset: "Shiba_Ritual", name: "Ritual", type: "single"},
      {asset: "Shiba_Sadness", name: "Sadness", type: "single"},
      {asset: "Shiba_Slasher", name: "Slasher", type: "single"},
      {asset: "Shiba_Soul", name: "Soul", type: "single"},
      {asset: "Shiba_Willpower", name: "Willpower", type: "single"},
    ],
    [
      {asset: "Shiba_Cloud", name: "Cloud", type: "multi"},
      {asset: "Shiba_Darkness", name: "Darkness", type: "multi"},
      {asset: "Shiba_Earth", name: "Earth", type: "multi"},
      {asset: "Shiba_Fire", name: "Fire", type: "multi"},
      {asset: "Shiba_Flower", name: "Flower", type: "multi"},
      {asset: "Shiba_Fog", name: "Fog", type: "multi"},
      {asset: "Shiba_Fear", name: "Fear", type: "multi"},
      {asset: "Shiba_Fiesta", name: "Fiesta", type: "multi"},
      {asset: "Shiba_Force", name: "Force", type: "multi"},
      {asset: "Shiba_Forest", name: "Forest", type: "multi"},
    ],
    [
      {asset: "Shiba_Ghost", name: "Ghost", type: "multi"},
      {asset: "Shiba_Gold", name: "Gold", type: "multi"},
      {asset: "Shiba_Health", name: "Health", type: "multi"},
      {asset: "Shiba_Ice", name: "Ice", type: "multi"},
      {asset: "Shiba_Jewel", name: "Jewel", type: "multi"},
      {asset: "Shiba_Lava", name: "Lava", type: "multi"},
      {asset: "Shiba_Explosion", name: "Explosion", type: "multi"},
    ],
    [
      {asset: "Shiba_Light", name: "Light", type: "single"},
      {asset: "Shiba_Lightning", name: "Lightning", type: "single"},
      {asset: "Shiba_Magnet", name: "Magnet", type: "single"},
      {asset: "Shiba_Melody", name: "Melody", type: "single"},
      {asset: "Shiba_Meteor", name: "Meteor", type: "single"},
      {asset: "Shiba_Mystery", name: "Mystery", type: "single"},
      {asset: "Shiba_Anger", name: "Anger", type: "multi"},
    ],
    [
      {asset: "Shiba_Pulse", name: "Pulse", type: "single"},
      {asset: "Shiba_Rain", name: "Rain", type: "single"},
      {asset: "Shiba_Resist", name: "Resist", type: "single"},
      {asset: "Shiba_Sand", name: "Sand", type: "single"},
      {asset: "Shiba_Shadow", name: "Shadow", type: "single"},
    ],
    [
      {asset: "Shiba_Silver", name: "Silver", type: "single"},
      {asset: "Shiba_Snow", name: "Snow", type: "single"},
      {asset: "Shiba_Star", name: "Star", type: "single"},
      {asset: "Shiba_Stone", name: "Stone", type: "single"},
      {asset: "Shiba_Water", name: "Water", type: "single"},
    ]
  ]
  
  export const tribes = [
    {asset: "Chest_Red.gif", name:"Fire"},
    {asset: "Chest_BabyBlue.gif", name:"Sky"},
    {asset: "Chest_Purple.gif", name:"Electric"},
    {asset: "Chest_Green.gif", name:"Grass"},
    {asset: "Chest_Yellow.gif", name:"Wind"},
    {asset: "Chest_Blue.gif", name:"Water"},
  ]
  
  export const monsters = [
    {asset: "Bear_1.gif", name:"Balo"},
    {asset: "Bear_2.gif", name:"Killer pander"},
    {asset: "Dragon_1.gif", name:"Drago"},
    {asset: "Dragon_2.gif", name:"Smaug"},
  ]