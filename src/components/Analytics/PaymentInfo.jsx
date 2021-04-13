import { Avatar, makeStyles, Paper } from '@material-ui/core';

import Text from '../Item/Text';
import PropTypes from 'prop-types';
import getSymbolFromCurrency from 'currency-symbol-map';

const useStyles = makeStyles((theme) => ({
    root: {
        height: theme.spacing(8),
        borderRadius: '10px',
        marginTop: theme.spacing(1),
        display: 'flex',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        padding: '4px 0 5px',
        textAlign: 'start',
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        //color: theme.palette.text.secondary,
        color: theme.palette.primary.main,
        padding: '4px 0 5px',
        textAlign: 'start',
    },
    debt: {
        color: theme.palette.secondary.main,
    },
    icon: {
        marginLeft: theme.spacing(1.5),
        marginRight: theme.spacing(4),
    },
    column: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexBasis: '40%',
    },

    columnPrice: {
        display: 'flex',
        //flexBasis: '40%',
        justifyContent: 'flex-end',
        marginLeft: 'auto',
    },

    columnCurrency: {
        display: 'flex',
        justifyContent: 'flex-start',
        marginLeft: 5,
        marginRight: theme.spacing(4),
    },
}));

function PaymentInfo({ data }) {
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <div className={classes.column}>
                <Avatar
                    className={classes.icon}
                    alt="Remy Sharp"
                    src={data.profile_picture}
                    sizes="large"
                />
                <Text colorClass={classes.heading} text={data.username} />
            </div>
            {data.amount < 0 ? (
                <Text
                    colorClass={`${classes.secondaryHeading} ${classes.debt}`}
                    text="You owe"
                />
            ) : (
                <Text
                    colorClass={`${classes.secondaryHeading}`}
                    text="Owes you"
                />
            )}
            <div className={classes.columnPrice}>
                {data.amount < 0 ? (
                    <Text
                        colorClass={`${classes.secondaryHeading} ${classes.debt}`}
                        text={Math.abs(data.amount)}
                    />
                ) : (
                    <Text
                        colorClass={classes.secondaryHeading}
                        text={Math.abs(data.amount)}
                    />
                )}
            </div>
            <div className={classes.columnCurrency}>
                {data.amount < 0 ? (
                    <Text
                        colorClass={`${classes.secondaryHeading} ${classes.debt}`}
                        text={getSymbolFromCurrency(data.currency) || '??'}
                    />
                ) : (
                    <Text
                        colorClass={classes.secondaryHeading}
                        text={getSymbolFromCurrency(data.currency) || '??'}
                    />
                )}
            </div>
        </Paper>
    );
}

PaymentInfo.propTypes = {
    data: PropTypes.any,
};

export default PaymentInfo;
