import React from 'react';

import classes from './DrawerToggle.css';

const DrawerToggle = ({ clicked }) => (
    <div className={classes.DrawerToggle} onClick={clicked}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default DrawerToggle;