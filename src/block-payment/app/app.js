import { render, useState } from "@wordpress/element";
import { Button, message } from "antd";
import { ethers } from "ethers";
import React, { useEffect } from "react";
import { getMetadata } from "../register-nft/app";
import { ConnectWalletButton } from "./components/ConnectWalletButton";
import { useGutenbergData } from "./hooks/useGutenbergData";
import { useWeb3Store, Web3Provider } from "./store/useWeb3";
import { AppContainer, ButtonContainer, Container } from "./style";

const AppInner = ({ backupContent }) => {
	const {
		connect,
		isConnected,
		walletAddress,
		disconnect,
		cantoSubContract,
		nftContract,
		initNFTAddress,
	} = useWeb3Store();
	const { content, title, nft, paid } = useGutenbergData();
	const [hasPaid, setHasPaid] = useState(false);

	const moveOutPluginBlock = (element) => {
		if (element) {
			if (element.dataset.checked === "true") {
				element.style.display = "block";

				return;
			}

			element.style.display = "none";

			// copy .wp-block-create-block-canto-the-wordpress and append it after element
			const cantoBlock = document.querySelector(
				".wp-block-create-block-canto-the-wordpress"
			);

			if (cantoBlock) {
				// clone element and clear all children, keep attributes
				const emptyDiv = element.cloneNode(false);

				// set data-checked to true
				emptyDiv.dataset.checked = true;

				// insert next to element
				element.insertAdjacentElement("afterend", emptyDiv);

				const backupContent = element.innerHTML.replace(
					cantoBlock.outerHTML,
					""
				);

				// use react-dom to render newcantoblock
				render(<App backupContent={backupContent} />, emptyDiv);

				// remove old cantoBlock
				cantoBlock?.remove();
				element.remove();
			}
		}
	};

	useEffect(() => {
		if (!nft?.address) return;

		initNFTAddress(nft.address);
	}, [nft.address]);

	useEffect(() => {
		if (!cantoSubContract) return;

		const cantoBlock = document.querySelector(
			".wp-block-create-block-canto-the-wordpress"
		);

		// Paid
		{
			const element = document.getElementById("paid-required");

			moveOutPluginBlock(element);
		}

		// NFT
		{
			const element = document.getElementById("nft-required");

			moveOutPluginBlock(element);

			// if (element)
			// 	// back up the original element, but remove the canto block
			// 	setBackupContent(element.innerHTML.replace(cantoBlock.outerHTML, ""));
		}
	}, [
		cantoSubContract,
		document.getElementById("paid-required"),
		document.getElementById("nft-required"),
	]);

	const onPayCantoClicked = async () => {
		if (!cantoSubContract) return;

		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const signer = provider.getSigner();
		const contractWithSigner = cantoSubContract.connect(signer);
		const { baseUrl, postId } = getMetadata();

		try {
			message.open({
				key: "transaction",
				type: "loading",
				content: "Waiting for transaction confirmation",
				duration: 0,
			});

			const tx = await contractWithSigner.deposit(baseUrl, postId, {
				value: ethers.utils.parseEther(paid.price),
			});

			await tx.wait();

			message.open({
				key: "transaction",
				type: "success",
				content: "Transaction confirmed",
				duration: 2,
			});

			setHasPaid(true);
		} catch (error) {
			message.error("Transaction failed");
		}
	};

	const onPayNFTClicked = async () => {
		if (!cantoSubContract) return;

		// navigate to nft page
		const url = "https://nftbuy-page.com";
		window.location.href = url;
	};

	useEffect(() => {
		// hasDonateForPost
		const { baseUrl, postId } = getMetadata();

		if (!cantoSubContract) return;
		if (!nftContract) return;
		if (!isConnected) return;

		cantoSubContract
			.hasDonateForPost(baseUrl, postId, walletAddress)
			.then((res) => {
				setHasPaid(res);
			});

		// hasNFTForPost - ERC721
		if (nftContract) {
			// at least one nft is required
			nftContract.balanceOf(walletAddress).then((res) => {
				if (res > 0) {
					setHasPaid(true);
				}
			});
		}
	}, [cantoSubContract, nftContract, walletAddress, isConnected]);

	return (
		<AppContainer>
			{hasPaid && <div dangerouslySetInnerHTML={{ __html: backupContent }} />}

			{isConnected ? (
				<Container>
					<p style={{ marginLeft: "16px" }}>Connected as {walletAddress}</p>

					{/* Check pay condition */}
					<ButtonContainer>
						{nft.address && nft.id && (
							<Button size="large" type="primary" onClick={onPayNFTClicked}>
								You need to own NFT to read this article
							</Button>
						)}

						{paid.price &&
							(!hasPaid ? (
								<Button size="large" type="primary" onClick={onPayCantoClicked}>
									Pay {paid.price} Canto to read this article
									{/* <span>{paid.walletAddress}</span> */}
								</Button>
							) : (
								<Button disabled size="large">
									You have paid for this article
								</Button>
							))}

						<div style={{ maxWidth: "400px" }}>
							<ConnectWalletButton />
						</div>
					</ButtonContainer>
				</Container>
			) : (
				<>
					<p>Not connected</p>
					<ConnectWalletButton />
				</>
			)}
		</AppContainer>
	);
};

export const App = (props) => {
	return (
		<div className="reset-button">
			<Web3Provider>
				<AppInner {...props} />
			</Web3Provider>

			<style jsx>{`
				.reset-button button {
					border: none;
				}
			`}</style>
		</div>
	);
};
