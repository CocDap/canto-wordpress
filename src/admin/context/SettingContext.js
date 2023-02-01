import { createContext, useState } from "@wordpress/element";

export const settingContext = createContext({
	address: "",
	text: "",
});

// export const settingSchema = z.object({
// 	address: z.string(),
// 	text: z.string(),
// });

export const SettingProvider = ({
	children
}) => {
	const [settings, setSettings] = useState({
		address: "",
		text: "",
	});

	return (
		<settingContext.Provider
			value={{
				address: settings.address,
				text: settings.text,
			}}
		>
			{children}
		</settingContext.Provider>
	);
};
