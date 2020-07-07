import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

import * as actions from '../store/actions';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 300,
        position: 'fixed',
        right: 16,
        top: 16,
        zIndex: 200,
        fontSize: 14
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
}));


const Search = () => {

    // STYLING
    const classes = useStyles();

    // DISPATCH
    const dispatch = useDispatch();
    const onSetSearchField = useCallback(
        (searchField) => dispatch(actions.setSearchField(searchField)),
        [dispatch]
    );

    // LOCAL STATE
    const [searchInput, setSearchInput] = useState('');

    const inputRef = useRef('');

    // Waits for 650ms of non-changed input before submitting search
    useEffect(() => {
        console.log(inputRef);
        const timer = setTimeout(() => {
            if (searchInput === inputRef.current.value) {
                const newSearchField = searchInput.length === 0
                    ? ''
                    : `${searchInput}`;
                if (newSearchField !== '') {
                    console.log('[Search.js] newSearchField:', newSearchField);
                    onSetSearchField(newSearchField);

                }
            }
        }, 650);
        return () => {
            clearTimeout(timer);
        };
    }, [searchInput, inputRef, onSetSearchField]);

    return (
        <Paper component="form" className={classes.root}>
            <IconButton className={classes.iconButton} aria-label="menu">
                <MenuIcon />
            </IconButton>
            <Divider className={classes.divider} orientation="vertical" />
            <InputBase
                className={classes.input}
                inputRef={inputRef}
                value={searchInput}
                placeholder="Search"
                onChange={(event) => setSearchInput(event.target.value)}
            />
            <IconButton type="submit" className={classes.iconButton} aria-label="search">
                <SearchIcon />
            </IconButton>
        </Paper>
    );
};

export default Search;