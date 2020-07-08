import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Material-UI
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import CircularProgress from '@material-ui/core/CircularProgress';

import Aux from '../hoc/Auxillary';
import * as actions from '../store/actions';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 'auto',
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
    spinner: {
        margin: 8
    }
}));

const Search = () => {

    const classes = useStyles();

    // LOCAL STATE
    const [searchInput, setSearchInput] = useState('');
    const [searchFocusState, setSearchFocusState] = useState(false);
    const inputRef = useRef('');

    // DISPATCH
    const dispatch = useDispatch();
    const onSetSearchField = useCallback(
        (searchField) => dispatch(actions.setSearchField(searchField)),
        [dispatch]
    );

    // SELECTORS
    const loading = useSelector(state => { return state.status.loading });

    // Waits for 850ms of non-changed input before updating the search
    // field (which triggers a new search)
    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchInput === inputRef.current.value) {
                const newSearchField = searchInput.length === 0
                    ? ''
                    : `${searchInput}`;
                if (newSearchField !== '') {
                    // console.log('[Search.js] newSearchField:', newSearchField);
                    onSetSearchField(newSearchField);
                    setSearchFocusState(false);
                }
            }
        }, 850);
        return () => {
            clearTimeout(timer);
        };
    }, [searchInput, inputRef, onSetSearchField, setSearchFocusState]);

    // Toggles the state of the search bar focus to hide when not in use
    const clickAwayHandler = () => { setSearchFocusState(!searchFocusState) };

    // Highlights all text on focus of the search field
    const focusHandler = (e) => {
        e.target.select();
    }

    return (
        <ClickAwayListener mouseEvent="onMouseDown" onClickAway={clickAwayHandler}>
            <Paper className={classes.root}>
                {searchFocusState ? (
                    <Aux>
                        <IconButton
                            className={classes.iconButton}
                            aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        <Divider
                            className={classes.divider}
                            orientation="vertical" />
                        <InputBase
                            className={classes.input}
                            inputRef={inputRef}
                            value={searchInput}
                            placeholder="Search"
                            onChange={(e) => setSearchInput(e.target.value)}
                            onFocus={focusHandler}

                        />
                        <IconButton
                            type="submit"
                            className={classes.iconButton}
                            aria-label="search"
                        >
                            <SearchIcon />
                        </IconButton>
                    </Aux>
                )
                    : loading ?
                        <CircularProgress
                            className={classes.spinner}
                            size={28} />
                        : <IconButton
                            className={classes.iconButton}
                            aria-label="menu"
                            onClick={clickAwayHandler}>
                            <SearchIcon />
                        </IconButton>
                }
            </Paper>
        </ClickAwayListener>
    );
};

export default Search;