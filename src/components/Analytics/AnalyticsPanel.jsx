import { Grid, makeStyles, Typography } from '@material-ui/core';
import { Fragment, useState } from 'react';
import usePaymentDistributon from '../../hooks/usePaymentDistributon';
import usePaymentInfo from '../../hooks/usePaymentInfo';
import Chart from './Chart';
import PaymentsList from './PaymentsList';
import PropTypes from 'prop-types';
import SelectCurrency from './SelectCurrency';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    title: {
        fontWeight: 500,
        [theme.breakpoints.down('sm')]: {
            marginLeft: theme.spacing(-1),
        },
    },
    top: {
        display: 'flex',
        justifyContent: 'space-between',
    },
}));

function AnalyticsPanel(props) {
    const classes = useStyles();
    const [chartData, setChartData] = useState([]);
    const [paymnetInfo, setPaymentInfo] = useState([]);
    const [currency, setCurrency] = useState('HUF');

    // TODO
    // These hook is beign called multiple times (4-6)
    // This is because the group members are loaded one by one

    // This hook calculates the chart data every time the component is re rendered
    usePaymentDistributon(setChartData, props.groupId, props.groupMembers);

    usePaymentInfo(setPaymentInfo, props.groupId, props.groupMembers, currency);

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
                <Grid container spacing={3}>
                    <Grid item xs={12} lg={6} container justify="center">
                        <Chart data={chartData} currency={currency} />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <PaymentsList data={paymnetInfo} />{' '}
                    </Grid>
                </Grid>
            </div>
        </Fragment>
    );
}

AnalyticsPanel.propTypes = {
    groupId: PropTypes.string,
    groupMembers: PropTypes.any,
};

export default AnalyticsPanel;
