import React, { useState, useRef } from 'react';

import Aux from '../hoc/Auxillary';

// Material-UI
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    iconButton: {
        padding: 10,
    }
}));

const Menu = (props) => {

    const classes = useStyles();

    // Local State
    const [menuOpen, setMenuOpen] = useState(false);
    const anchorRef = useRef(null);

    const closeMenuHandler = (e) => {
        if (anchorRef.current && anchorRef.current.contains(e.target)) {
            return;
        }
        setMenuOpen(false);
    };

    const menuClickHandler = (e) => {
        setMenuOpen((prevOpen) => !prevOpen);
    }

    const prevOpen = React.useRef(menuOpen);
    React.useEffect(() => {
        if (prevOpen.current === true && menuOpen === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = menuOpen;
    }, [menuOpen]);

    return (
        <Aux>
            <IconButton
                className={classes.iconButton}
                aria-controls={menuOpen ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                variant="contained"
                ref={anchorRef}
                onClick={menuClickHandler}>
                <MenuIcon />
            </IconButton>
            <Popper open={menuOpen} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={closeMenuHandler}>
                                <MenuList autoFocusItem={menuOpen} id="menu-list-grow">
                                    <MenuItem onClick={closeMenuHandler}>Profile</MenuItem>
                                    <MenuItem onClick={closeMenuHandler}>My account</MenuItem>
                                    <MenuItem onClick={closeMenuHandler}>Logout</MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </Aux>
    )
};

export default Menu;