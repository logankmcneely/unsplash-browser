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

const Photos = (props) => {

    const classes = useStyles();

    const photos = props.data.map(photoData => {
        return (
            <Grid item
                key={photoData.id}>
                <Photo
                    data={photoData} />
            </Grid>
        );
    });

    return (
        <Grid
            container
            className={classes.root}
            direction="column"
            justify="space-between"
            alignItems="center">
            {photos}
        </Grid>
    );
};

export default Photos;