import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Photo from './Photo';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    }
}));

const PhotoContainer = (props) => {

    const classes = useStyles();

    const photos = props.data.map(photoData => {
        return (
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <Photo data={photoData} />
            </Grid>
        );
    });

    return (
        <Grid
            container
            className={classes.root}
            direction="row"
            justify="space-evenly"
            alignContent="stretch">
            {photos}
        </Grid>
    );
};

export default PhotoContainer;