import { SettingProvider } from './SettingContext';
import React from 'react';

export const Providers = ( { children }: { children: React.ReactNode } ) => {
	return <SettingProvider>{ children }</SettingProvider>;
};
