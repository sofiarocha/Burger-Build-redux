import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem';

const NavigationItems = ({ isAuth }) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" >Builder Burger</NavigationItem>
        {isAuth && <NavigationItem link="/orders">Orders</NavigationItem>}
        {
            isAuth
                ? <NavigationItem link="/logout">Logout</NavigationItem>
                : <NavigationItem link="/auth">Authenticate</NavigationItem>
        }
    </ul>
);
 
export default NavigationItems;