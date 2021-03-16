import {
    Avatar,
    Card,
    CardActionArea,
    CardContent,
    Grid,
    makeStyles,
    Typography,
} from '@material-ui/core';

import PropTypes from 'prop-types';
import getSymbolFromCurrency from 'currency-symbol-map';

const glass = {
    background: `rgba(255, 255, 255, 0.25 )`,
    backdropFilter: 'blur( 4px )',
    border: '1px solid rgba( 255, 255, 255, 0.18 )',
    borderRadius: '10px',
};

const useStyles = makeStyles((theme) => ({
    root: {
        height: 120,
        margin: theme.spacing(1),
    },
    glass: glass,
    container: {
        alignItems: 'stretch',
        height: '100%',
    },
    cardActionArea: {
        height: '100%',
    },
    cardContent: {
        height: '100%',
        padding: 0,
    },
    leftPart: {
        alignContent: 'center',
        height: '100%',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
    },
    middlePart: {
        flexDirection: 'column',
        alignContent: 'flex-start',
        justifyContent: 'space-around',
        height: '100%',
        textAlign: 'start',
        marginLeft: theme.spacing(1),
        '& h1': {
            marginTop: theme.spacing(1),
        },
        '& p': {
            fontWeight: 100,
            marginBottom: theme.spacing(1),
        },
    },
    rightPart: {
        alignContent: 'center',
        justifyContent: 'center',
        height: '100%',
        '& p': {
            fontSize: '17px',
            marginTop: '49px',
        },
    },
    avatar: {
        height: 60,
        width: 60,
    },
}));

function ReceiptItem(props) {
    const { data, onClickHandler } = props;
    const classes = useStyles();

    return (
        <Card className={`${classes.root} ${classes.glass}`}>
            <CardActionArea
                onClick={() => onClickHandler(props.data)}
                disableRipple={true}
                className={classes.cardActionArea}
            >
                <CardContent className={classes.cardContent}>
                    <Grid container spacing={2} className={classes.container}>
                        <Grid
                            container
                            item
                            xs={2}
                            className={classes.leftPart}
                        >
                            <Avatar
                                alt="Store logo"
                                src={data.logo}
                                className={classes.avatar}
                            />
                        </Grid>
                        <Grid
                            container
                            item
                            xs={4}
                            sm={5}
                            md={4}
                            leg={6}
                            className={classes.middlePart}
                        >
                            <Typography
                                gutterBottom
                                variant="h6"
                                component="h1"
                                noWrap
                            >
                                {data.name}
                            </Typography>
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                            >
                                {data.date}
                            </Typography>
                        </Grid>
                        <Grid
                            container
                            item
                            xs={4}
                            className={classes.rightPart}
                        >
                            <Typography
                                variant="subtitle1"
                                component="p"
                                noWrap
                            >
                                {data.total}
                                {' ' + getSymbolFromCurrency('HUF')}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
/**
 * <Button variant="contained" color="primary" onClick={() => props.onClickHandler(props.data)}></Button>
 */

ReceiptItem.propTypes = {
    onClickHandler: PropTypes.func,
    data: PropTypes.object,
};

export default ReceiptItem;
