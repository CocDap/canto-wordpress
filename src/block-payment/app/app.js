import { Button } from '@wordpress/components';
import React from 'react';

export const App = () => {
    const [account, setAccount] = React.useState(null);

    return (
        <div>
            <h1>App</h1>

            <Button
                isPrimary
                onClick={() => setAccount('0x123')}>Set Account</Button>

            <div>Account: {account}</div>


        </div>
    );
};

