import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../Auxiliar/Auxiliar';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false,
    }

    closeSideDrawerHandler = () => {
        this.setState({ showSideDrawer: false });
    }

    openSideDrawerHandler = () => {
        this.setState({ showSideDrawer: true })
    }

    render() {
        const {showSideDrawer} = this.state;
        return (
            <Aux>
                <Toolbar
                    isAuth={this.props.isAuthenticate}
                    drawerToggleClicked={this.openSideDrawerHandler}
                />
                <SideDrawer
                    isAuth={this.props.isAuthenticate}
                    open={showSideDrawer}
                    closed={this.closeSideDrawerHandler}
                />
                <main className={classes.content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }

}

const mapStateToProps = state => {
    return {
        isAuthenticate: state.auth.token !== "",
    }
}

export default connect(mapStateToProps)(Layout);