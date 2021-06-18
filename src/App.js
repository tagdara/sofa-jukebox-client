import React from 'react';
import NetworkProvider from 'network/NetworkProvider';
import LayoutProvider from 'layout/LayoutProvider';
import JukeboxThemeProvider from 'theme/JukeboxThemeProvider';
import MainPage from 'layout/MainPage';

export default function App() {

    return (
        <NetworkProvider>
            <JukeboxThemeProvider> 
                <LayoutProvider>
                    <MainPage />
                </LayoutProvider>
            </JukeboxThemeProvider>
        </NetworkProvider>
    );
}

