import { render } from "@wordpress/element";
import React, { useEffect } from "react";
import { ConnectWalletButton } from "./components/ConnectWalletButton";
import { useGutenbergData } from "./hooks/useGutenbergData";
import { useWeb3Store, Web3Provider } from "./store/useWeb3";
import { Container, ButtonContainer, AppContainer } from "./style";
import { Button } from "antd";

const AppInner = () => {
	const { connect, isConnected, walletAddress, disconnect, cantoSubContract } =
		useWeb3Store();
	const { content, title, nft, paid } = useGutenbergData();

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
				console.log(element);
				// clone element and clear all children, keep attributes
				const emptyDiv = element.cloneNode(false);

				// set data-checked to true
				emptyDiv.dataset.checked = true;

				// insert next to element
				element.insertAdjacentElement("afterend", emptyDiv);

				// use react-dom to render newcantoblock
				render(<App />, emptyDiv);

				// remove old cantoBlock
				cantoBlock?.remove();
				element.remove();
			}
		}
	};

	useEffect(() => {
		if (!cantoSubContract) return;

		// Paid
		{
			const element = document.getElementById("paid-required");

			moveOutPluginBlock(element);

			console.log("element", element);
		}

		// NFT
		{
			const element = document.getElementById("nft-required");

			moveOutPluginBlock(element);

			console.log("element", element);
		}
	}, [
		cantoSubContract,
		document.getElementById("paid-required"),
		document.getElementById("nft-required"),
	]);

	const onPayCantoClicked = async () => {
		if (!cantoSubContract) return;

		const tx = await cantoSubContract.methods
			.payCanto(paid.price)
			.send({ from: walletAddress });

		console.log("tx", tx);

		await tx.wait().then((receipt) => {
			console.log("receipt", receipt);
		});
	};

	const onPayNFTClicked = async () => {
		if (!cantoSubContract) return;

		alert("Not implemented yet");
	};

	return (
		<AppContainer>
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

						{paid.price && (
							<Button size="large" type="primary" onClick={onPayCantoClicked}>
								Pay {paid.price} Canto to read this article
							</Button>
						)}

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

export const App = () => {
	return (
		<Web3Provider>
			<AppInner />
		</Web3Provider>
	);
};
