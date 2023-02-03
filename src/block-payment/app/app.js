import React from "react";
import { useWeb3Store, Web3Provider } from "./store/useWeb3";
import styled from "styled-components";
import { useBlockProps } from "@wordpress/block-editor";
import { useGutenbergData } from "./hooks/useGutenbergData";

const ButtonContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	width: 100%;
	gap: 10px;
`;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 10px;
`;

const WhiteButton = styled.button`
	background-color: white;
	border-color: black;
	color: black;
`;

const YellowButton = styled.button`
	background-color: var(--bs-yellow);
	border-color: var(--bs-yellow);
	color: black;
`;

const PlatiumButton = styled.button`
	background-color: var(--bs-cyan);
	border-color: var(--bs-cyan);
	color: black;
`;

const AppInner = () => {
	const { connect, isConnected, walletAddress, disconnect } = useWeb3Store();
	const { content, title } = useGutenbergData();

	return (
		<div>
			{isConnected ? (
				<Container>
					<p>Connected as {walletAddress}</p>

					<ButtonContainer>
						<button>Donate 10 CANTO</button>
						<YellowButton>Donate 100 CANTO</YellowButton>
						<PlatiumButton>Donate 100 CANTO</PlatiumButton>
					</ButtonContainer>

					<button
						onClick={() => {
							disconnect();
						}}
					>
						Disconnect
					</button>
				</Container>
			) : (
				<>
					<p>Not connected</p>
					<button
						onClick={() => {
							connect();
						}}
					>
						Connect
					</button>
				</>
			)}
		</div>
	);
};

export const App = () => {
	return (
		<Web3Provider>
			<AppInner />
		</Web3Provider>
	);
};
