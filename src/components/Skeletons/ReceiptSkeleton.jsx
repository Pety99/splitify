import {
    Card,
    CardContent,
    Grid,
    makeStyles,
    Typography,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

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
        height: '125px',
    },
    cardContent: {
        height: '125px',
        padding: 0,
    },
    leftPart: {
        minWidth: 76,
        alignContent: 'center',
        height: '100%',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(1),
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
        minWidth: 60,
        alignContent: 'center',
        justifyContent: 'center',
        height: '100%',
        '& p': {
            fontSize: '17px',
            marginTop: '49px',
        },
    },
    title: {
        width: '80%',
        minWidth: 60,
    },
    date: {
        width: '100%',
        minWidth: 80,
    },
}));

function ReceiptItemSkeleton() {
    const classes = useStyles();
    return (
        <Card className={`${classes.root} ${classes.glass}`}>
            <CardContent className={classes.cardContent}>
                <Grid container spacing={2} className={classes.container}>
                    <Grid container item xs={2} className={classes.leftPart}>
                        <Skeleton variant="circle" width={60} height={60} />
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
                        <div className={classes.title}>
                            <Typography
                                gutterBottom
                                variant="h6"
                                component="h1"
                            >
                                <Skeleton />
                            </Typography>
                        </div>
                        <div className={classes.date}>
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                            >
                                <Skeleton />
                            </Typography>
                        </div>
                    </Grid>
                    <Grid container item xs={4} className={classes.rightPart}>
                        <div className={classes.rightPart}>
                            <Typography
                                variant="subtitle1"
                                component="p"
                                noWrap
                            >
                                <Skeleton />
                            </Typography>
                        </div>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}

export default ReceiptItemSkeleton;
