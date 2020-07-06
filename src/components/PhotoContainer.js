import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Photo from './Photo';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: 16
    }
}));

const PhotoContainer = (props) => {

    const classes = useStyles();

    const photos = props.data.map(photoData => {
        return (
            <Grid item xs={12} sm={6}>
                <Photo data={photoData} />
            </Grid>
        );
    });

    return (
        <Grid
            container
            className={classes.root}
            spacing={3}
            direction="row"
            justify="space-around"
            alignItems="center">
            {photos}
        </Grid>
    );
};

export default PhotoContainer;