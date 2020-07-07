import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Aux from '../hoc/Auxillary';

const useStyles = makeStyles({
    root: {
        height: "auto",
        padding: 8
    },
    media: {
        width: "95%",
        objectFit: "none",
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
                        component="img"
                        image={props.data.urls.regular}
                        title={props.data.alt_description}
                    />
                </CardActionArea>
            </Card>
        </Aux>
    );
};

export default Photo;