import { SettingProvider } from "./SettingContext";

export const Providers = ({ children }) => {
	return <SettingProvider>{children}</SettingProvider>;
};
