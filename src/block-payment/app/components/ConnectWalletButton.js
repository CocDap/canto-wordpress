import { useWeb3Store } from "../store/useWeb3";
import { Button } from "antd";
import { DisconnectOutlined } from "@ant-design/icons";

export const ConnectWalletButton = () => {
	const { connect, isConnected, walletAddress, disconnect, cantoSubContract } =
		useWeb3Store();

	if (!isConnected) {
		return (
			<Button onClick={connect} size="large" type="primary">
				Connect Wallet
			</Button>
		);
	}

	return (
		<Button
			onClick={() => {
				console.log("disconnect");
				disconnect();
			}}
			size="large"
			icon={<DisconnectOutlined />}
			type="primary"
			danger
		>
			Disconnect
		</Button>
	);
};
