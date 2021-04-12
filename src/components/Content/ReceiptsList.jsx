import { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import ReceiptItem from './ReceiptItem';
import { subscribeToEvent, unsubscribeFromEvents } from '../../database';
import ReceiptItemSkeleton from '../Skeletons/ReceiptSkeleton';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    root: {
        maxHeight: `calc(100vh - 440px - 8px)`,
        minHeight: 300,
        borderRadius: 15,
        overflowY: 'auto',
        overflowX: 'hidden',
    },
}));

function ReceiptsList(props) {
    const classes = useStyles();

    const [receipts, setReceipts] = useState([]);

    const loadSkeletons = () => {
        const result = [];
        for (let i = 0; i < props.skeletons; i++) {
            result.push(<ReceiptItemSkeleton key={i} />);
        }
        return result;
    };

    useEffect(() => {
        subscribeToEvent('child_added', `/receipts/${props.groupId}`, [
            handleReceiptCreated,
        ]);
        subscribeToEvent('child_changed', `/receipts/${props.groupId}`, [
            handleReceiptChanged,
        ]);
        subscribeToEvent('child_removed', `/receipts/${props.groupId}`, [
            handleReceiptDeleted,
        ]);
        return () => {
            unsubscribeFromEvents('child_added', `/receipts/${props.groupId}`);
            setReceipts([]);
            unsubscribeFromEvents(
                'child_changed',
                `/receipts/${props.groupId}`
            );
            unsubscribeFromEvents(
                'child_removed',
                `/receipts/${props.groupId}`
            );
            setReceipts([]);
        };
    }, [props.groupId]);

    const handleReceiptCreated = (receiptSnap) => {
        props.removeSkeleton();
        setReceipts((perviousReceipts) => [
            { key: receiptSnap.key, value: receiptSnap.val() },
            ...perviousReceipts,
        ]);
    };

    const handleReceiptChanged = (receiptSnap) => {
        setReceipts((perviousReceipts) => [
            ...perviousReceipts.map((r) =>
                r.key != receiptSnap.key
                    ? r
                    : { key: receiptSnap.key, value: receiptSnap.val() }
            ),
        ]);
    };

    const handleReceiptDeleted = async (receiptSnap) => {
        await setReceipts((perviousReceipts) => [
            ...perviousReceipts.filter((r) => r.key != receiptSnap.key),
        ]);
        props.setCurrentReceipt({});
    };

    return (
        <div className={classes.root}>
            {loadSkeletons()}
            {receipts.map((receipt) => (
                <ReceiptItem
                    key={receipt.key}
                    data={receipt.value}
                    onClickHandler={() => props.toggleLeftPanel(receipt)}
                />
            ))}
        </div>
    );
}

ReceiptsList.propTypes = {
    toggleLeftPanel: PropTypes.func,
    groupId: PropTypes.string,
    skeletons: PropTypes.number,
    removeSkeleton: PropTypes.func,
    setCurrentReceipt: PropTypes.func,
};
export default ReceiptsList;
