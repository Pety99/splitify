import { Avatar, makeStyles, Typography } from '@material-ui/core';
import { Store } from '@material-ui/icons';
import getSymbolFromCurrency from 'currency-symbol-map';
import PropTypes from 'prop-types';
import { Fragment } from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
    },
    logo: {
        marginRight: theme.spacing(2),
    },
    name: {
        margin: theme.spacing(2),
    },
    price: {
        marginLeft: 'auto',
    },
}));
function ItemsDetails({ data }) {
    const classes = useStyles();

    return (
        <Fragment>
            {data && (
                <div className={classes.root}>
                    <Avatar
                        alt="Store logo"
                        src={data.logo}
                        className={classes.logo}
                    >
                        {data.logo || <Store />}
                    </Avatar>
                    <Typography
                        variant="h6"
                        component="p"
                        color="textPrimary"
                        className={classes.name}
                    >
                        {data.name}
                    </Typography>
                    <Typography
                        variant="subtitle2"
                        component="p"
                        color="textSecondary"
                        className={classes.price}
                    >
                        {data.total.toFixed(2) +
                            ' ' +
                            getSymbolFromCurrency(data.currency) || '?'}
                    </Typography>
                </div>
            )}
        </Fragment>
    );
}

ItemsDetails.propTypes = {
    data: PropTypes.object,
};

export default ItemsDetails;
