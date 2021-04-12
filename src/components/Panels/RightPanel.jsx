import PropTypes from 'prop-types';
import ItemsList from '../Content/ItemsList';
import ItemsDetails from '../Content/ItemsDetails';
import { Fragment } from 'react';
import ItemsActions from '../Content/ItemsActions';

function RightPanel({ receiptData, currentGroup, groupMembers }) {
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
RightPanel.propTypes = {
    receiptData: PropTypes.object,
    currentGroup: PropTypes.object,
    groupMembers: PropTypes.array,
};
export default RightPanel;
