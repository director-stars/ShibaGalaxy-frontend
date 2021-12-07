import { MenuItemsType, DropdownMenuItemType } from '@pancakeswap-libs/uikit'

const config: MenuItemsType[] = [
  {
    label: 'Starter Pack',
    icon: 'Home',
    href: '/',
  },
  {
    label: 'Marketplace',
    icon: 'Trade',
    href: '/marketplace',
  },
  {
    label: 'My Shibas',
    icon: 'Doge',
    href: '/my-shiba',
  },
  {
    label: 'Battle Bears & Dragons',
    icon: 'Battle',
    href: '/battle-monsters',
  },
  // {
  //   label: 'Top Warriors',
  //   icon: 'Prize',
  //   href: '/top-warriors',
  // },
  {
    label: 'AutoPlay',
    icon: 'Stone',
    href: '/auto-play',
  },
  {
    href: "#",
    label: 'More',
    icon: 'More',
    items: [
      {
        label: 'Battle Bosses',
        href: '/battle-bosses',
        type: DropdownMenuItemType.INTERNAL_LINK,
      },
      {
        label: 'Referrals',
        href: '/referrals',
        type: DropdownMenuItemType.INTERNAL_LINK,
      },
      {
        type: DropdownMenuItemType.DIVIDER,
      },
      {
        label: 'Buy SHIBGX',
        href: 'https://pancakeswap.finance/swap#/swap?outputCurrency=0x827CF973b5da91dAc222A7Cb021529Ab567CCf39&inputCurrency=BNB',
        type: DropdownMenuItemType.EXTERNAL_LINK,
      },
      {
        label: 'How to Play',
        href: 'https://docs.shibagalaxy.io/',
        type: DropdownMenuItemType.EXTERNAL_LINK,
      }
    ],
  }
]

export default config
