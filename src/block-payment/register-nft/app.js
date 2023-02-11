import styled from "styled-components";
import { ethers } from "ethers";
import { ConnectWalletButton } from "../app/components/ConnectWalletButton";
import { useWeb3Store } from "../app/store/useWeb3";
import { Button } from "antd";
import { message } from "antd";
import { useEffect, useMemo, useState } from "react";

const ButtonContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
`;

export const getMetadata = () => {
	const postId =
		new URLSearchParams(window.location.search).get("post") ||
		document
			.querySelector("link[rel='alternate'][type='application/json']")
			?.href.split("/")
			.pop();

	if (!postId) {
		message.info(
			"Please press Ctrl + S to save the post before registering it to Canto"
		);
		return;
	}

	return {
		baseUrl: window.location.origin,
		postId:
			new URLSearchParams(window.location.search).get("post") ||
			document
				.querySelector("link[rel='alternate'][type='application/json']")
				?.href.split("/")
				.pop(),
	};
};

export const App = () => {
	const {
		connect,
		disconnect,
		isConnected,
		walletAddress,
		cantoSubContract,
		init,
	} = useWeb3Store();

	const [isPostRegistered, setIsPostRegistered] = useState(false);

	useEffect(() => {
		init();
	}, []);

	useEffect(() => {
		(async () => {
			if (!cantoSubContract) {
				return;
			}

			const { baseUrl, postId } = getMetadata();

			console.log("smart contract", cantoSubContract);
			const isPostRegistered = await cantoSubContract.getPost(baseUrl, postId);

			console.log("isPostRegistered", isPostRegistered);

			if (isPostRegistered.donateAmount > 0) {
				setIsPostRegistered(isPostRegistered);
			}
		})();
	}, [cantoSubContract]);

	const onRegisterPost = async () => {
		try {
			const { baseUrl, postId } = getMetadata();

			if (!postId) {
				throw new Error("No post id found");
			}

			// connect
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();
			console.log("cantosubcontract", cantoSubContract);
			const contractWithSigner = cantoSubContract.connect(signer);
			const amount = document.querySelector("#price").value;

			console.log("amount", amount);
			if (!amount) {
				message.error("Please enter a price for your post");
				return;
			}

			await contractWithSigner.createPost(
				baseUrl,
				postId,
				ethers.utils.parseEther(amount)
			);

			setIsPostRegistered(true);
		} catch (error) {
			console.error(error);
		}
	};

	return isConnected ? (
		isPostRegistered ? (
			<ButtonContainer>
				<Button onClick={onRegisterPost} size="large" disabled>
					Registered
				</Button>
				<ConnectWalletButton />
			</ButtonContainer>
		) : (
			<ButtonContainer>
				<Button onClick={onRegisterPost} size="large">
					Register Post with Smart contract
				</Button>
				<ConnectWalletButton />
			</ButtonContainer>
		)
	) : (
		<>
			<ConnectWalletButton />
		</>
	);
};
