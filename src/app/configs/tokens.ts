import Constants from "@/app/configs/constants"

const Tokens: { [key: number]: Erc20Token[] } = {
  1: [
    {
      symbol: "ETH",
      address: Constants.zeroAddress,
      decimals: 18,
      icon: "/tokens/ethereum.png",
      priceFeed: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
      name: "Ether",
      chainId: 5,
      currentBlockchainNative: true,
      nativeCoin: true
    }
  ],
  56: [
    {
      symbol: "BNB",
      address: Constants.zeroAddress,
      decimals: 18,
      icon: "chains/bnb.png",
      priceFeed: "0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE",
      name: "BNB",
      chainId: 56,
      currentBlockchainNative: true,
      nativeCoin: true
    },
    {
      symbol: "WBNB",
      address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
      decimals: 18,
      icon: "chains/bnb.png",
      priceFeed: "0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE",
      name: "Wrapped BNB",
      chainId: 56,
      nativeCoin: true
    },
    {
      symbol: "USDC",
      address: "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
      decimals: 18,
      icon: "/tokens/usdc.png",
      name: "USD Coin",
      priceFeed: "0x51597f405303C4377E36123cBc172b13269EA163",
      chainId: 56,
      stableCoin: true
    },
    {
      symbol: "USDT",
      address: "0x55d398326f99059ff775485246999027b3197955",
      decimals: 18,
      icon: "/tokens/usdt.png",
      name: "Tether USD",
      priceFeed: "0xB97Ad0E74fa7d920791E90258A6E2085088b4320",
      chainId: 56,
      stableCoin: true,
      stargatePoolId: 2
    },
    {
      symbol: "DAI",
      address: "0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3",
      decimals: 18,
      icon: "/tokens/dai.png",
      name: "Dai Stablecoin",
      priceFeed: "0x132d3C0B1D2cEa0BC552588063bdBb210FDeecfA",
      chainId: 56,
      stableCoin: true
    },
    {
      symbol: "LINK",
      address: "0xca236E327F629f9Fc2c30A4E95775EbF0B89fac8",
      decimals: 18,
      icon: "/tokens/link.png",
      name: "ChainLink Token",
      priceFeed: "0x86E53CF1B870786351Da77A57575e79CB55812CB",
      chainId: 56
    }
  ],
  137: [
    {
      symbol: "MATIC",
      address: Constants.zeroAddress,
      decimals: 18,
      icon: "/tokens/polygon.png",
      priceFeed: "0xAB594600376Ec9fD91F8e885dADF0CE036862dE0",
      name: "MATIC",
      chainId: 137,
      currentBlockchainNative: true,
      nativeCoin: true
    },
    {
      symbol: "WMATIC",
      address: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
      decimals: 18,
      icon: "/tokens/polygon.png",
      priceFeed: "0xAB594600376Ec9fD91F8e885dADF0CE036862dE0",
      name: "Wrapped MATIC",
      chainId: 137,
      nativeCoin: true
    },
    {
      symbol: "WETH",
      address: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
      decimals: 18,
      icon: "/tokens/ethereum.png",
      name: "Wrapped Ether",
      priceFeed: "0xF9680D99D6C9589e2a93a78A04A279e509205945",
      chainId: 137,
      nativeCoin: true
    },
    {
      symbol: "USDC",
      address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
      decimals: 6,
      icon: "/tokens/usdc.png",
      name: "USD Coin",
      priceFeed: "0xfE4A8cc5b5B2366C1B58Bea3858e81843581b2F7",
      chainId: 137,
      stableCoin: true,
      stargatePoolId: 1
    },
    {
      symbol: "USDT",
      address: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
      decimals: 6,
      icon: "/tokens/usdt.png",
      name: "Tether USD",
      priceFeed: "0x0A6513e40db6EB1b165753AD52E80663aeA50545",
      chainId: 137,
      stableCoin: true,
      stargatePoolId: 2
    },
    {
      symbol: "DAI",
      address: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
      decimals: 18,
      icon: "/tokens/dai.png",
      name: "Dai Stablecoin",
      priceFeed: "0x4746DeC9e833A82EC7C2C1356372CcF2cfcD2F3D",
      chainId: 137,
      stableCoin: true
    },
    {
      symbol: "EURS",
      address: "0xE111178A87A3BFf0c8d18DECBa5798827539Ae99",
      decimals: 2,
      icon: "/tokens/eurs.png",
      name: "STATIS EURO",
      priceFeed: "0x73366Fe0AA0Ded304479862808e02506FE556a98",
      chainId: 137
    },
    {
      symbol: "WBTC",
      address: "0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6",
      decimals: 8,
      icon: "/tokens/wbtc.png",
      name: "Wrapped BTC",
      priceFeed: "0xDE31F8bFBD8c84b5360CFACCa3539B938dd78ae6",
      chainId: 137,
      nativeCoin: true
    },
    {
      symbol: "wstETH",
      address: "0x03b54A6e9a984069379fae1a4fC4dBAE93B3bCCD",
      decimals: 18,
      icon: "/tokens/wsteth.png",
      name: "Wrapped stETH",
      priceFeed: "0xF9680D99D6C9589e2a93a78A04A279e509205945",
      chainId: 137
    },
    {
      symbol: "CRV",
      address: "0x172370d5Cd63279eFa6d502DAB29171933a610AF",
      decimals: 18,
      icon: "/tokens/crv.png",
      name: "Curve DAO",
      priceFeed: "0x336584C8E6Dc19637A5b36206B1c79923111b405",
      chainId: 137
    },
    {
      symbol: "LINK",
      address: "0x53E0bca35eC356BD5ddDFebbD1Fc0fD03FaBad39",
      decimals: 18,
      icon: "/tokens/link.png",
      name: "ChainLink Token",
      priceFeed: "0xd9FFdb71EbE7496cC440152d43986Aae0AB76665",
      chainId: 137
    },
    {
      symbol: "AAVE",
      address: "0xD6DF932A45C0f255f85145f286eA0b292B21C90B",
      decimals: 18,
      icon: "/tokens/aave.png",
      name: "AAVE Token",
      priceFeed: "0x72484B12719E23115761D5DA1646945632979bB6",
      chainId: 137
    }
  ],
  43114: [
    {
      symbol: "AVAX",
      address: Constants.zeroAddress,
      decimals: 18,
      icon: "/chains/avax.png",
      priceFeed: "0x0A77230d17318075983913bC2145DB16C7366156",
      name: "Avalanche AVAX",
      chainId: 43114,
      currentBlockchainNative: true,
      nativeCoin: true
    },
    {
      symbol: "WAVAX",
      address: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
      decimals: 18,
      icon: "/chains/avax.png",
      priceFeed: "0x0A77230d17318075983913bC2145DB16C7366156",
      name: "Wrapped AVAX",
      chainId: 43114,
      nativeCoin: true
    },
    {
      symbol: "USDT",
      address: "0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7",
      decimals: 6,
      icon: "/tokens/usdt.png",
      priceFeed: "0xEBE676ee90Fe1112671f19b6B7459bC678B67e8a",
      name: "Tether USD",
      chainId: 43114,
      stableCoin: true
    },
    {
      symbol: "USDC",
      address: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
      decimals: 6,
      icon: "/tokens/usdc.png",
      priceFeed: "0xF096872672F44d6EBA71458D74fe67F9a77a23B9",
      name: "USD Coin",
      chainId: 43114,
      stableCoin: true,
      stargatePoolId: 0
    },
    {
      symbol: "DAI",
      address: "0xd586E7F844cEa2F87f50152665BCbc2C279D8d70",
      decimals: 18,
      icon: "/tokens/dai.png",
      priceFeed: "0x51D7180edA2260cc4F6e4EebB82FEF5c3c2B8300",
      name: "Dai Stablecoin",
      chainId: 43114,
      stableCoin: true
    },
    {
      symbol: "WETH",
      address: "0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB",
      decimals: 18,
      icon: "/chains/ethereum.png",
      priceFeed: "0x976B3D034E162d8bD72D6b9C989d545b839003b0",
      name: "Wrapped Ether",
      chainId: 43114
    },
    {
      symbol: "WBTC",
      address: "0x50b7545627a5162F82A992c33b87aDc75187B218",
      decimals: 8,
      icon: "/tokens/wbtc.png",
      priceFeed: "0x86442E3a98558357d46E6182F4b262f76c4fa26F",
      name: "Wrapped BTC",
      chainId: 43114
    }
  ],
  42161: [
    {
      symbol: "ETH",
      address: Constants.zeroAddress,
      decimals: 18,
      icon: "/tokens/ethereum.png",
      priceFeed: "0x639Fe6ab55C921f74e7fac1ee960C0B6293ba612",
      name: "Ether",
      chainId: 42161,
      currentBlockchainNative: true,
      nativeCoin: true
    },
    {
      symbol: "WETH",
      address: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
      decimals: 18,
      icon: "/tokens/ethereum.png",
      priceFeed: "0x639Fe6ab55C921f74e7fac1ee960C0B6293ba612",
      name: "Wrapped Ether",
      chainId: 42161,
      nativeCoin: true
    },
    {
      symbol: "USDT",
      address: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
      decimals: 6,
      icon: "/tokens/usdt.png",
      priceFeed: "0x3f3f5dF88dC9F13eac63DF89EC16ef6e7E25DdE7",
      name: "Tether USD",
      chainId: 42161,
      stableCoin: true
    },
    {
      symbol: "USDC",
      address: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
      decimals: 6,
      icon: "/tokens/usdc.png",
      priceFeed: "0x50834F3163758fcC1Df9973b6e91f0F0F0434aD3",
      name: "USD Coin",
      chainId: 42161,
      stableCoin: true,
      stargatePoolId: 0
    },
    {
      symbol: "DAI",
      address: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
      decimals: 18,
      icon: "/tokens/dai.png",
      priceFeed: "0xc5C8E77B397E531B8EC06BFb0048328B30E9eCfB",
      name: "Dai Stablecoin",
      chainId: 42161,
      stableCoin: true
    },
    {
      symbol: "WBTC",
      address: "0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f",
      decimals: 8,
      icon: "/tokens/wbtc.png",
      priceFeed: "0x6ce185860a4963106506C203335A2910413708e9",
      name: "Wrapped BTC",
      chainId: 42161
    },
  ]
}

export default Tokens