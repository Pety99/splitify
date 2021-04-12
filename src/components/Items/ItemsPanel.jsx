import { Fragment } from 'react';
import ItemsActions from './ItemsActions';
import ItemsDetails from './ItemsDetails';
import ItemsList from './ItemsList';
import PropTypes from 'prop-types';

function ItemsPanel({ receiptData, currentGroup, groupMembers }) {
    return (
        <Fragment>
            <ItemsActions
                itemCount={
                    receiptData.value
                        ? Object.keys(receiptData.value?.items || {}).length
                        : -1
                }
                groupId={currentGroup.key}
                receiptId={receiptData.key}
            />
            <ItemsDetails data={receiptData.value} />
            <ItemsList
                items={Array.from(Object.keys(receiptData.value?.items || {}))}
                groupId={currentGroup.key}
                groupMembers={groupMembers}
                currency={receiptData.value?.currency}
                receiptData={receiptData}
            />
        </Fragment>
    );
}
ItemsPanel.propTypes = {
    receiptData: PropTypes.object,
    currentGroup: PropTypes.object,
    groupMembers: PropTypes.array,
};

export default ItemsPanel;
