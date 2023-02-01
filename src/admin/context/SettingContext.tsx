import { createContext, useState } from '@wordpress/element';
import { z } from 'zod';

export const settingContext = createContext( {
	address: '',
	text: '',
} );

// export const settingSchema = z.object({
// 	address: z.string(),
// 	text: z.string(),
// });

export const SettingProvider = ( {
	children,
}: {
	children: React.ReactNode;
} ) => {
	const [ settings, setSettings ] = useState( {
		address: '',
		text: '',
	} );

	return (
		<settingContext.Provider
			value={ {
				address: settings.address,
				text: settings.text,
			} }
		>
			{ children }
		</settingContext.Provider>
	);
};
