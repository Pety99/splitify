import { Fragment, useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import ReceiptItem from './ReceiptItem';
import { subscribeToEvent, unsubscribeFromEvents } from '../../database';
import ReceiptItemSkeleton from '../Skeletons/ReceiptSkeleton';

function ReceiptsList(props) {
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
        return () => {
            unsubscribeFromEvents('child_added', `/receipts/${props.groupId}`);
        };
    }, []);

    const handleReceiptCreated = (receiptSnap) => {
        props.removeSkeleton();
        setReceipts((perviousReceipts) => [
            { key: receiptSnap.key, value: receiptSnap.val() },
            ...perviousReceipts,
        ]);
    };

    return (
        <Fragment>
            <p>Receipts</p>
            {loadSkeletons()}
            {receipts.map((receipt) => (
                <ReceiptItem
                    key={receipt.key}
                    data={receipt.value}
                    onClickHandler={props.toggleLeftPanel}
                />
            ))}
        </Fragment>
    );
}

ReceiptsList.propTypes = {
    toggleLeftPanel: PropTypes.func,
    groupId: PropTypes.string,
    skeletons: PropTypes.number,
    removeSkeleton: PropTypes.func,
};
export default ReceiptsList;
