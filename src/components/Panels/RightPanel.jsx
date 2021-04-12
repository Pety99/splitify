import { makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import AnalyticsPanel from '../Analytics/AnalyticsPanel';
import ItemsPanel from '../Items/ItemsPanel';
const useStyles = makeStyles(() => ({
    root: {
        //  height: 'calc(100vh - 120px)',
    },
}));

function RightPanel({ receiptData, currentGroup, groupMembers, isAnalytics }) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {isAnalytics ? (
                <AnalyticsPanel
                    groupId={currentGroup.key}
                    groupMembers={groupMembers}
                />
            ) : (
                <ItemsPanel
                    receiptData={receiptData}
                    currentGroup={currentGroup}
                    groupMembers={groupMembers}
                />
            )}
        </div>
    );
}
RightPanel.propTypes = {
    receiptData: PropTypes.object,
    currentGroup: PropTypes.object,
    groupMembers: PropTypes.array,
    isAnalytics: PropTypes.bool,
};
export default RightPanel;
