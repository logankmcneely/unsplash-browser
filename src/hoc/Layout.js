import React from 'react';
import Aux from './Auxillary';
import Search from '../containers/Search';
import PhotosContainer from '../containers/PhotosContainer';

const Layout = props => {
    return (
        <Aux>
            <Search/>
            <PhotosContainer/>
        </Aux>
    )
};

export default Layout;