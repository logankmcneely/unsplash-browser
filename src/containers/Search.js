import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import * as actions from '../store/actions';

const useStyles = makeStyles({
    root: {
        position: 'fixed',
        right: 16,
        top: 16,
        zIndex: 200,
        padding: 8,
        backgroundColor: 'rgb(36,36,36,0.8)',
        color: 'white',
        fontSize: 14
    }
});

const Search = () => {

    // STYLING
    const classes = useStyles();

    // DISPATCH
    const dispatch = useDispatch();
    const onSetSearchField = useCallback(
        (searchField) => dispatch(actions.setSearchField(searchField)),
        [dispatch]
    );

    // Local state
    const [searchInput, setSearchInput] = useState('');

    const inputRef = useRef();

    // Waits for 650ms of non-changed input before submitting search
    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchInput === inputRef.current.value) {
                const newSearchField = searchInput.length === 0
                    ? ''
                    : `${searchInput}`;
                if (newSearchField !== '') {
                    console.log('Searching query:', newSearchField);
                    onSetSearchField(newSearchField);
                }
            }
        }, 650);
        return () => {
            clearTimeout(timer);
        };
    }, [searchInput, inputRef, onSetSearchField]);

    return (
        <input
            className={classes.root}
            id="outlined-search"
            label="Search"
            onChange={event => setSearchInput(event.target.value)}
            ref={inputRef}
            type="search"
            placeholder="Search..."
            value={searchInput} />
    );
};

export default Search;