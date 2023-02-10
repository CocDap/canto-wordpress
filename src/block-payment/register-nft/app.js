import styled from "styled-components";
import { ConnectWalletButton } from "../app/components/ConnectWalletButton";
import { useWeb3Store } from "../app/store/useWeb3";
import { Button } from "antd";

const ButtonContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
`;

export const App = () => {
	const { connect, disconnect, isConnected, walletAddress, cantoSubContract } =
		useWeb3Store();

	const onRegisterPost = async () => {
		console.log(cantoSubContract);
		alert("Not implemented yet");
	};

	return isConnected ? (
		<ButtonContainer>
			<Button onClick={onRegisterPost} size="large">
				Register Post with Smart contract
			</Button>
			<ConnectWalletButton />
		</ButtonContainer>
	) : (
		<>
			<ConnectWalletButton />
		</>
	);
};
