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

					{/* Check pay condition */}
					<ButtonContainer>
						<button>Pay 10 CANTO to read</button>
						{/* <YellowButton>Donate 100 CANTO</YellowButton>
						<PlatiumButton>Donate 100 CANTO</PlatiumButton> */}

						<div style={{ maxWidth: "400px" }}>
							<button
								onClick={() => {
									disconnect();
								}}
								style={{
									display: "flex",
									alignItems: "center",
									gap: "6px",
									border: "red 1px solid",
									backgroundColor: "red",
								}}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									style={{
										width: "20px",
										height: "20px",
									}}
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
									/>
								</svg>
								Disconnect
							</button>
						</div>
					</ButtonContainer>
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
