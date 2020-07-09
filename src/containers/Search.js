import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Material-UI
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import CircularProgress from '@material-ui/core/CircularProgress';

// Local imports
import * as actions from '../store/actions';
import Aux from '../hoc/Auxillary';
import Menu from './Menu';

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
    const onSetSearchParams = useCallback(
        (searchParams) => dispatch(actions.setSearchParams(searchParams)),
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
                    onSetSearchParams({
                        page: 1,
                        searchField: newSearchField,
                        searchType: 'search'});
                    setSearchFocusState(false);
                }
            }
        }, 850);
        return () => {
            clearTimeout(timer);
        };
    }, [searchInput, inputRef, onSetSearchParams, setSearchFocusState]);

    useEffect(()=> {
        if (loading) {
            setSearchFocusState(false);
        }
    }, [loading, setSearchFocusState]);

    // Hides search menu
    const hideSearchMenuHandler = () => { setSearchFocusState(false) };

    // Show search menu
    const showSearchMenuHandler = () => { setSearchFocusState(true) };

    // Highlights all text on focus of the search field
    const focusHandler = (e) => {
        e.target.select();
    }

    return (
        <ClickAwayListener mouseEvent="onMouseDown" onClickAway={hideSearchMenuHandler}>
            <Paper className={classes.root}>
                {searchFocusState ? (
                    <Aux>
                        <Menu/>
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
                            onClick={hideSearchMenuHandler}
                        >
                            <CloseIcon />
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
                            onClick={showSearchMenuHandler}>
                            <SearchIcon />
                        </IconButton>
                }
            </Paper>
        </ClickAwayListener>
    );
};

export default Search;