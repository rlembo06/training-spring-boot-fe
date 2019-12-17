import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import SettingsIcon from '@material-ui/icons/Settings';
import { withRouter } from 'react-router-dom';
import {
    translate,
    MenuItemLink,
    Responsive,
} from 'react-admin';

import produits from '../produits';

class Menu extends Component {
    static propTypes = {
        onMenuClick: PropTypes.func,
        logout: PropTypes.object,
    };

    render() {
        const { onMenuClick, logout, translate } = this.props;
        return (
            <div>
                {' '}
                <MenuItemLink
                    to={`/produits`}
                    primaryText={translate(`pos.menu.products`, {
                        smart_count: 2,
                    })}
                    leftIcon={<produits.icon />}
                    onClick={onMenuClick}
                />
                <MenuItemLink
                    to={`/configuration`}
                    primaryText={translate(`pos.configuration`, {
                        smart_count: 2,
                    })}
                    leftIcon={<SettingsIcon />}
                    onClick={onMenuClick}
                />
                <Responsive
                    xsmall={
                        <MenuItemLink
                            to="/configuration"
                            primaryText={translate('pos.configuration')}
                            leftIcon={<SettingsIcon />}
                            onClick={onMenuClick}
                        />
                    }
                    medium={null}
                />
                <Responsive
                    small={logout}
                    medium={null} // Pass null to render nothing on larger devices
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    open: state.admin.ui.sidebarOpen,
    theme: state.theme,
    locale: state.i18n.locale,
});

const enhance = compose(
    withRouter,
    connect(
        mapStateToProps,
        {}
    ),
    translate
);

export default enhance(Menu);
