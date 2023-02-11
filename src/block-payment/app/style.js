import styled from "styled-components";

export const WhiteButton = styled.button`
	background-color: white;
	border-color: black;
	color: black;
`;

export const YellowButton = styled.button`
	background-color: var(--bs-yellow);
	border-color: var(--bs-yellow);
	color: black;
`;

export const PlatiumButton = styled.button`
	background-color: var(--bs-cyan);
	border-color: var(--bs-cyan);
	color: black;
`;

export const ButtonContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	width: 100%;
	gap: 10px;
`;

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 10px;
`;

export const AppContainer = styled.div``;
