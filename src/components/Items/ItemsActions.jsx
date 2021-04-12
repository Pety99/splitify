import { IconButton, makeStyles, Typography } from '@material-ui/core';
import { Add, Delete } from '@material-ui/icons';
import { Fragment, useState } from 'react';
import AlertDialog from '../GroupDetails/Alert';
import PropTypes from 'prop-types';
import { deleteReceipt } from '../../database';

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
    },
    title: {
        fontWeight: 500,
    },
    item1: {
        marginTop: -6,
        marginLeft: 'auto',
    },
    item2: {
        marginTop: -6,
        marginRight: -12,
    },
}));

function ItemsActions({ itemCount, groupId, receiptId }) {
    const classes = useStyles();

    const [alertOpen, setAlertOpen] = useState(false);

    const handleReceiptDeleted = () => {
        console.log(receiptId);
        console.log(groupId);
        deleteReceipt(groupId, receiptId);
    };

    return (
        <div className={classes.root}>
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
            {itemCount >= 0 && (
                <Fragment>
                    <IconButton
                        className={classes.item1}
                        onClick={() => setAlertOpen(/*TODO*/ !alertOpen)}
                    >
                        <Add size="small" />
                    </IconButton>

                    <IconButton
                        className={classes.item2}
                        onClick={() => setAlertOpen(!alertOpen)}
                    >
                        <Delete size="small" />
                        <AlertDialog
                            title={'Do you want to delete this reciept?'}
                            content={
                                'If you delete the reciept you can not undo it!'
                            }
                            ok={'Yes'}
                            cancel={'No'}
                            open={alertOpen}
                            okClickHandler={handleReceiptDeleted}
                            closeHandler={() => setAlertOpen(!alertOpen)}
                        />
                    </IconButton>
                </Fragment>
            )}
        </div>
    );
}

ItemsActions.propTypes = {
    itemCount: PropTypes.number,
    groupId: PropTypes.string,
    receiptId: PropTypes.string,
};

export default ItemsActions;
