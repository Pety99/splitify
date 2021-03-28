import PropTypes from 'prop-types';
import ItemsList from '../Content/ItemsList';
import ItemsDetails from '../Content/ItemsDetails';
import { makeStyles, Typography } from '@material-ui/core';
import { Fragment } from 'react';

const useStyles = makeStyles(() => ({
    title: {
        fontWeight: 500,
    },
}));

function RightPanel({ receiptData, currentGroup, groupMembers }) {
    const classes = useStyles();

    return (
        <Fragment>
            <Typography
                variant="h5"
                component="p"
                gutterBottom
                align="left"
                color="textPrimary"
                className={classes.title}
            >
                Items
            </Typography>
            <ItemsDetails data={receiptData?.value} />
            <ItemsList
                items={Array.from(Object.keys(receiptData?.value?.items || {}))}
                groupId={currentGroup.key}
                groupMembers={groupMembers}
                currency={receiptData?.value?.currency}
                receiptData={receiptData}
            />
        </Fragment>
    );
}
RightPanel.propTypes = {
    receiptData: PropTypes.object,
    currentGroup: PropTypes.object,
    groupMembers: PropTypes.array,
};
export default RightPanel;
