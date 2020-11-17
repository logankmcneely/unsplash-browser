import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Aux from '../hoc/Auxillary';

const useStyles = makeStyles({
    root: {
        padding: 16,
        margin: 16

    },
    media: {
        maxHeight: "90vh",
        objectFit: "cover",
        objectPosition: "center"
    },
});

const Photo = (props) => {

    const classes = useStyles();
    const backgroundColor = props.data.color ? props.data.color : 'white';

    return (
        <Aux>
            <Card className={classes.root}
                style={{ backgroundColor: backgroundColor }}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        component="img"
                        image={props.data.urls.regular}
                        title={props.data.alt_description}
                        onClick={() => (window.open(props.data.links.html, '_blank'))}
                    />
                </CardActionArea>
            </Card>
        </Aux>
    );
};

export default Photo;
