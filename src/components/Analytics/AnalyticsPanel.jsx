import { makeStyles, Typography } from '@material-ui/core';
import { Fragment, useState } from 'react';
import usePaymentDistributon from '../../hooks/usePaymentDistributon';
import Chart from './Chart';
import PaymentsList from './PaymentsList';
import PropTypes from 'prop-types';
import SelectCurrency from './SelectCurrency';

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    title: {
        fontWeight: 500,
    },
    top: {
        display: 'flex',
        justifyContent: 'space-between',
    },
}));

function AnalyticsPanel(props) {
    const classes = useStyles();
    const [chartData, setChartData] = useState([]);
    const [currency, setCurrency] = useState('HUF');

    // This hook calculates the chart data every time the component is re rendered
    usePaymentDistributon(setChartData, props.groupId, props.groupMembers);

    return (
        <Fragment>
            <div className={classes.top}>
                <Typography
                    variant="h5"
                    component="p"
                    gutterBottom
                    align="left"
                    color="textPrimary"
                    className={classes.title}
                >
                    Analytics
                </Typography>
                <SelectCurrency setCurrency={setCurrency} currency={currency} />
            </div>
            <div className={classes.root}>
                <Chart data={chartData} currency={currency} />
                <PaymentsList />
            </div>
        </Fragment>
    );
}

AnalyticsPanel.propTypes = {
    groupId: PropTypes.string,
    groupMembers: PropTypes.any,
};

export default AnalyticsPanel;
