import PropTypes from 'prop-types';

import Placeholder from '../Placeholders/Placeholer';
import placeholderImge from '../Placeholders/image.svg';
import Item from '../Item/Item';
import { makeStyles } from '@material-ui/core';
import { updateReceiptTotal } from '../../database';

const useStyles = makeStyles(() => ({
    root: {
        maxHeight: `calc(100vh - 332px - 8px)`,
        minHeight: 300,
        borderRadius: 15,
        overflowY: 'auto',
        overflowX: 'hidden',
    },
}));

function ItemsList({ items, groupId, currency, receiptData, groupMembers }) {
    const classes = useStyles();

    function changeReceiptTotal(priceChange) {
        console.log(receiptData.value);
        console.log('receiptvalue.total' + receiptData.value.total);
        const newTotal = receiptData.value.total + priceChange;
        console.log(newTotal);
        updateReceiptTotal(groupId, receiptData.key, newTotal);
    }

    return items.length > 0 ? (
        <div className={classes.root}>
            {items.map((item) => (
                <Item
                    key={item}
                    id={item}
                    groupId={groupId}
                    receiptId={receiptData.key}
                    members={groupMembers}
                    currency={currency}
                    updateTotal={changeReceiptTotal}
                />
            ))}
        </div>
    ) : (
        <Placeholder
            primaryText={"Looks like there's nothing here"}
            secondaryText={
                'Click on one of your receipts, or scan a new one to see your items'
            }
            image={placeholderImge}
        />
    );
}

ItemsList.propTypes = {
    items: PropTypes.array,
    currency: PropTypes.string,
    groupId: PropTypes.string,
    receiptData: PropTypes.object,
    groupMembers: PropTypes.array,
};
export default ItemsList;
