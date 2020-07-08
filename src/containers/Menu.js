import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';

import Aux from '../hoc/Auxillary';
import * as actions from '../store/actions';

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

    // Dispatch
    const dispatch = useDispatch();
    const onSetSearchParams = (searchParams) => dispatch(actions.setSearchParams(searchParams));

    const closeMenuHandler = (e) => {
        if (anchorRef.current && anchorRef.current.contains(e.target)) {
            return;
        }
        setMenuOpen(false);
    };

    const menuToggleHandler = (e) => {
        setMenuOpen((prevOpen) => !prevOpen);
    }

    const prevOpen = React.useRef(menuOpen);
    React.useEffect(() => {
        if (prevOpen.current === true && menuOpen === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = menuOpen;
    }, [menuOpen]);

    const menuSortedSearchHandler = (orderBy) => (e) => {
        onSetSearchParams({ 
            searchType: 'sorted',
            orderBy: orderBy
        });
        setMenuOpen(false);
    }

    const menuRandomSearchHandler = (e) => {
        onSetSearchParams({
            searchType: 'random'
        });
        setMenuOpen(false);

    }

    return (
        <Aux>
            <IconButton
                className={classes.iconButton}
                aria-controls={menuOpen ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                variant="contained"
                ref={anchorRef}
                onClick={menuToggleHandler}>
                <MenuIcon />
            </IconButton>
            <Popper
                open={menuOpen} 
                anchorEl={anchorRef.current} 
                role={undefined} transition 
                disablePortal
                placement="bottom-end">
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{ transformOrigin: placement === 'bottom-end' ? 'center top' : 'center bottom' }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={closeMenuHandler}>
                                <MenuList autoFocusItem={menuOpen} id="menu-list-grow">
                                    <MenuItem onClick={menuSortedSearchHandler('popular')}>Popular</MenuItem>
                                    <MenuItem onClick={menuSortedSearchHandler('latest')}>Latest</MenuItem>
                                    <MenuItem onClick={menuSortedSearchHandler('oldest')}>Oldest</MenuItem>
                                    <MenuItem onClick={menuRandomSearchHandler}>Random</MenuItem>
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