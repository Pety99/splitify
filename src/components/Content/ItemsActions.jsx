import { IconButton, makeStyles, Typography } from '@material-ui/core';
import { Add, Delete } from '@material-ui/icons';
import { useState } from 'react';
import AlertDialog from '../GroupDetails/Alert';

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
    },
    title: {
        fontWeight: 500,
    },
    item: {
        marginTop: -6,
    },
    right: {
        marginLeft: 'auto',
    },
}));

function ItemsActions() {
    const classes = useStyles();

    const [alertOpen, setAlertOpen] = useState(false);

    const handleReceiptDeleted = () => {};

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
            <IconButton
                className={`${classes.item} ${classes.right}`}
                onClick={() => setAlertOpen(/*TODO*/ !alertOpen)}
            >
                <Add size="small" />
            </IconButton>
            <IconButton
                className={classes.item}
                onClick={() => setAlertOpen(/*TODO*/ !alertOpen)}
            >
                <Delete size="small" />
                <AlertDialog
                    title={'Do you want to delete this item?'}
                    content={'If you delete the item you can not undo it!'}
                    ok={'Yes'}
                    cancel={'No'}
                    open={alertOpen}
                    okClickHandler={handleReceiptDeleted}
                />
            </IconButton>
        </div>
    );
}

export default ItemsActions;
