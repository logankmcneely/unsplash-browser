import React from 'react';
import Aux from './Auxillary';
import SearchBar from '../components/SearchBar';
import PhotoContainer from '../components/PhotoContainer';

const Layout = props => {
    return (
        <Aux>
            <SearchBar/>
            <PhotoContainer/>
        </Aux>
    )
};

export default Layout;