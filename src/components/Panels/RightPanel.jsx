import { Fragment } from 'react';

import PropTypes from 'prop-types';
import Item from '../Item/Item';
import ItemsList from '../Content/ItemsList';

function RightPanel(props) {
    return (
        <Fragment>
            RightPanel
            <p>{props.receiptData.name}</p>
            <ItemsList
                items={Array.from(
                    Object.keys(props?.receiptData?.value?.items || {})
                )}
            />
            <Item />
            <Item />
            <Item />
            <Item />
        </Fragment>
    );
}
RightPanel.propTypes = {
    receiptData: PropTypes.object,
};
export default RightPanel;
