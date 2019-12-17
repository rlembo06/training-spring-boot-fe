import React, { Component } from 'react';
import { Admin, Resource } from 'react-admin';

import './App.css';

import produits from './produits'

import themeReducer from './themeReducer';
import { Layout } from './layout';
import customRoutes from './routes';
import englishMessages from './i18n/en';
import dataProvider from './dataProvider';

const i18nProvider = locale => {
    if (locale === 'fr') {
        return import('./i18n/fr').then(messages => messages.default);
    }

    // Always fallback on english
    return englishMessages;
};

export default class App extends Component {

    render() {

        if (!dataProvider) {
            return (
                <div className="loader-container">
                    <div className="loader">Loading...</div>
                </div>
            );
        }

        return (
            <Admin
                title=""
                dataProvider={dataProvider}
                customReducers={{ theme: themeReducer }}
                customRoutes={customRoutes}
                appLayout={Layout}
                locale="en"
                i18nProvider={i18nProvider}
            >
                <Resource name="Produits" {...produits} />
            </Admin>
        );
    }
}
