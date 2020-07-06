import React, { useState, useEffect, useRef, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppContext } from '../App';

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

// https://api.unsplash.com/search/photos?client_id=$KEY&per_page=30

const Search = () => {

    // Styling
    const classes = useStyles();

    // Context API state
    const { state, dispatch } = useContext(AppContext);

    // Local state
    const [searchInput, setSearchInput] = useState('');

    const inputRef = useRef();

    // Waits for 650ms of non-changed input before submitting search
    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchInput === inputRef.current.value) {
                const searchQuery = searchInput.length === 0
                    ? ''
                    : `${searchInput}`;
                if (searchQuery !== '') {
                    console.log('Searching query:', searchQuery);
                    dispatch({ type: 'UPDATE_SEARCH', data: searchQuery });
                }
            }
        }, 650);
        return () => {
            clearTimeout(timer);
        };
    }, [searchInput, inputRef, dispatch]);

    return (
        <input
            className={classes.root}
            id="outlined-search"
            label="Search"
            onChange={event =>setSearchInput(event.target.value)}
            ref={inputRef}
            type="search"
            placeholder="Search..."
            value={searchInput} />
    );
};

export default Search;