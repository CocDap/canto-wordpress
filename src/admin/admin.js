import { render } from "@wordpress/element";
import { Providers } from "./context/Providers";
// import "./styles.scss";
import { useEffect } from "@wordpress/element";
import { ethers } from "ethers";
import { useWeb3Store } from "../block-payment/app/store/useWeb3";
import { ConnectWalletButton } from "../block-payment/app/components/ConnectWalletButton";
import { Button } from "antd";

const CantoTheWordpress = () => {
	const {
		connect,
		disconnect,
		isConnected,
		walletAddress,
		cantoSubContract,
		init,
	} = useWeb3Store();

	useEffect(() => {
		init();
	}, []);

	return (
		<Providers>
			<h1>Admin Panel</h1>

			<div>{walletAddress}</div>
			<ConnectWalletButton />
		</Providers>
	);
};

document.addEventListener("DOMContentLoaded", function (event) {
	try {
		const rootElement = document.getElementById(
			"canto-the-wordpress-settings-page"
		);
		render(<CantoTheWordpress />, rootElement);
	} catch (error) {
		console.log(error);
	}
});
