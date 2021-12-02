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
      {asset: "Air.gif", name: "Air"},
      {asset: "Ash.gif", name: "Ash"},
      {asset: "Aurora.gif", name: "Aurora"},
      {asset: "BlackHole.gif", name: "BlackHole"},
      {asset: "Bronze.gif", name: "Bronze"},
      {asset: "Ash.gif", name: "Ash"},
      {asset: "Bull.gif", name: "Bull"},
    ],
    [
      {asset: "Cloud.gif", name: "Cloud"},
      {asset: "Darkness.gif", name: "Darkness"},
      {asset: "Earth.gif", name: "Earth"},
      {asset: "Fire.gif", name: "Fire"},
      {asset: "Flower.gif", name: "Flower"},
      {asset: "Fog.gif", name: "Fog"},
    ],
    [
      {asset: "Ghost.gif", name: "Ghost"},
      {asset: "Gold.gif", name: "Gold"},
      {asset: "Health.gif", name: "Health"},
      {asset: "Ice.gif", name: "Ice"},
      {asset: "Jewel.gif", name: "Jewel"},
      {asset: "Lava.gif", name: "Lava"},
    ],
    [
      {asset: "Light.gif", name: "Light"},
      {asset: "Lightning.gif", name: "Lightning"},
      {asset: "Magnet.gif", name: "Magnet"},
      {asset: "Melody.gif", name: "Melody"},
      {asset: "Meteor.gif", name: "Meteor"},
      {asset: "Mystery.gif", name: "Mystery"},
    ],
    [
      {asset: "Pulse.gif", name: "Pulse"},
      {asset: "Rain.gif", name: "Rain"},
      {asset: "Resist.gif", name: "Resist"},
      {asset: "Sand.gif", name: "Sand"},
      {asset: "Shadow.gif", name: "Shadow"},
    ],
    [
      {asset: "Silver.gif", name: "Silver"},
      {asset: "Snow.gif", name: "Snow"},
      {asset: "Star.gif", name: "Star"},
      {asset: "Stone.gif", name: "Stone"},
      {asset: "Water.gif", name: "Water"},
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