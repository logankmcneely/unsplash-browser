import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

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

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    image={props.data.urls.regular}
                    title={props.data.alt_description}
                />
                {/* <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.data.created_a}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {props.data.description}
                    </Typography>
                </CardContent> */}
            </CardActionArea>

        </Card>
    );
};

export default Photo;