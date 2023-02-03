import Onboard, { chains } from "@web3-onboard/core";
import injectedModule from "@web3-onboard/injected-wallets";

const injected = injectedModule();

const wallets = [injected];

const chains = [
    {
        id: 1,
        token: "ETH",
        label: "Ethereum Mainnet",
        rpcUrl: "https://mainnet.infura.io/v3/${INFURA_ID}",
    },
    {
        id: 137,
        token: "MATIC",
        label: "Matic Mainnet",
        rpcUrl: "https://matic-mainnet.chainstacklabs.com",
    },
];

const appMetadata = {
    name: "My App",
    icon: "<SVG_ICON_STRING>",
    logo: "<SVG_LOGO_STRING>",
    description: "My app using Onboard",
    recommendedInjectedWallets: [
        { name: "Coinbase", url: "https://wallet.coinbase.com/" },
        { name: "MetaMask", url: "https://metamask.io" },
    ],
};

export const onboard = Onboard({
    wallets,
    chains,
    appMetadata,
});
