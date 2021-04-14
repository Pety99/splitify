import { makeStyles } from '@material-ui/core';
import PaymentInfo from './PaymentInfo';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(-8),
        [theme.breakpoints.up('lg')]: {
            marginTop: theme.spacing(5),
        },
    },
}));

function PaymentsList({ data }) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {data.map((entry) => (
                <PaymentInfo data={entry[1]} key={entry[0]} />
            ))}
        </div>
    );
}

PaymentsList.propTypes = {
    data: PropTypes.array,
};
export default PaymentsList;
