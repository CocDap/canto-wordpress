import { ethers } from "ethers";
import React, { useEffect } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { abi } from "./abi";
import { abi as nftContractAbi } from "./nftContractAbi";

export const CHAIN_ID = "0x539";
export const CHAIN_NAME = "Localnet";

export const useWeb3Store = create()(
	persist(
		(set, get) => ({
			isConnected: false,
			keepDisconnect: false,
			isInit: false,
			walletAddress: null,
			setIsConnected: (isConnected) => set({ isConnected }),
			connect: async () => {
				// TODO: handle if user hasn't installed metamask
				// check if window.ethereum exists
				if (!window.ethereum) {
				}

				const provider = new ethers.providers.Web3Provider(window.ethereum);

				await provider.send("eth_requestAccounts", []);

				const signer = provider.getSigner();

				set({
					isConnected: true,
					keepDisconnect: false,
					walletAddress: await signer.getAddress(),
					cantoSubContract: get().cantoSubContract,
				});
			},
			disconnect: () => {
				return set({
					isConnected: false,
					walletAddress: "",
					keepDisconnect: true,
				});
			},
			init: async () => {
				// TODO: handle if user hasn't installed metamask
				// check if window.ethereum exists
				if (!window?.ethereum) {
					console.log("return because of no window.ethereum");
					return;
				}

				const provider = new ethers.providers.Web3Provider(window.ethereum);
				const { provider: ethereum } = provider;

				//@ts-ignore
				ethereum.on("accountsChanged", async (accounts) => {
					if (accounts?.length > 0) {
						set({
							isConnected: true,
							walletAddress: accounts[0],
						});
					} else {
						set({
							isConnected: false,
							walletAddress: null,
						});
					}
				});

				const accounts = await provider.listAccounts();

				if (accounts?.length > 0 && get().keepDisconnect === false) {
					set({
						isConnected: true,
						walletAddress: accounts[0],
					});
				}

				//@ts-ignore
				ethereum.on("chainChanged", () => window.location.reload());

				const contractAddress = "0x5970B4d833f48bBFd26Ff484Ff38Cc20A3A3AfEe";
				// const nftContractAddress = "0xE026F8976F8078796e90c9c5f75AD12490ccfd50";

				set({
					cantoSubContract: new ethers.Contract(contractAddress, abi, provider),
					isInit: true,
				});
			},
			initNFTAddress: async (nftAddress) => {
				const provider = new ethers.providers.Web3Provider(window.ethereum);

				set({
					nftContract: new ethers.Contract(
						nftAddress,
						nftContractAbi,
						provider
					),
				});
			},
		}),
		{
			name: "web3-store",
			partialize: (state) => {
				return {
					keepDisconnect: state.keepDisconnect,
				};
			},
		}
	)
);

export const Web3Provider = ({ children }) => {
	const { init, isInit } = useWeb3Store();

	useEffect(() => {
		if (!window.ethereum || isInit) {
			return;
		}

		init();
	}, [ethers]);

	return <>{children}</>;
};
