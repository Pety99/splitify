import {
    Accordion,
    AccordionActions,
    AccordionDetails,
    AccordionSummary,
    Divider,
    makeStyles,
    Typography,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import Actions from './Actions';
import Avatars from './Avatars';
import Text from './Text';
import PropTypes from 'prop-types';
import { deleteItem, findItemById, updateItem } from '../../database';
import getSymbolFromCurrency from 'currency-symbol-map';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(0.07),
        marginBottom: theme.spacing(0.7),
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        padding: '4px 0 5px',
        textAlign: 'start',
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
        padding: '4px 0 5px',
        textAlign: 'start',
    },
    icon: {
        verticalAlign: 'bottom',
        height: 20,
        width: 20,
    },
    details: {
        alignItems: 'center',
    },
    column: {
        display: 'flex',
        justifyContent: 'flex-start',
        flexBasis: '40%',
        marginLeft: '3%',
    },
    columnPrice: {
        display: 'flex',
        flexBasis: '40%',
        justifyContent: 'flex-end',
        marginLeft: '3%',
    },
    columnCurrency: {
        display: 'flex',
        justifyContent: 'flex-start',
        marginLeft: 5,
    },
    wide: {
        flexBasis: '38%',
        marginLeft: '4%',
    },
    helper: {
        borderLeft: `2px solid ${theme.palette.divider}`,
        padding: theme.spacing(1, 2),
    },
    link: {
        color: theme.palette.primary.main,
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
    textEdit: {
        width: '80%',
    },
    resize: {
        fontSize: theme.typography.pxToRem(15),
    },
}));

function Item({ id, groupId, receiptId, members, currency, updateTotal }) {
    const classes = useStyles();
    const [editMode, setEditMode] = useState(false);
    const [data, setData] = useState({});
    const [backupData, setBackupData] = useState({});

    useEffect(async () => {
        const item = await findItemById(id, groupId);
        setData(item.value);
        setBackupData(item.value);
    }, []);

    const toggleEdit = (e) => {
        e.stopPropagation();
        setEditMode(!editMode);
        setData(backupData);
    };
    const cancel = () => {
        setEditMode(!editMode);
        setData(backupData);
    };
    const save = () => {
        setEditMode(!editMode);

        // This will update the total of the receipt with the price change of the item in the database.
        updateTotal(data.price - backupData.price);

        // This will update the items price in the database;
        updateItem(groupId, id, data);
        setBackupData(data);
    };

    const handleDeleteItem = () => {
        updateTotal(0.0 - backupData.price);
        deleteItem(groupId, receiptId, id);
    };

    const handleTitleChange = (text) => {
        const newData = {
            ...data,
            name: text,
        };

        setData(newData);
    };

    const handlePriceChange = (text) => {
        if (!isNaN(text)) {
            const newData = {
                ...data,
                price: text,
            };
            setData(newData);
        }
    };

    const handlePayersChanged = (payers) => {
        const newData = {
            ...data,
            payerIDs: payers,
        };
        setData(newData);

        updateItem(groupId, id, newData);
    };

    return (
        <div className={classes.root}>
            <Accordion
                style={{
                    borderRadius: '10px',
                    marginTop: '4px',
                    marginBottom: '4px',
                }}
            >
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panel1c-content"
                    id="panel1c-header"
                    onClick={(event) => {
                        if (editMode) {
                            event.stopPropagation;
                        }
                    }}
                >
                    <div className={classes.column}>
                        <Text
                            editMode={editMode}
                            colorClass={classes.heading}
                            handleTextChange={handleTitleChange}
                            text={data?.name}
                        />
                    </div>
                    <div className={classes.columnPrice}>
                        {
                            <Text
                                editMode={editMode}
                                colorClass={classes.secondaryHeading}
                                handleTextChange={handlePriceChange}
                                text={data?.price}
                            />
                        }
                    </div>
                    <div className={classes.columnCurrency}>
                        {
                            <Text
                                editMode={false}
                                colorClass={classes.secondaryHeading}
                                handleTextChange={handlePriceChange}
                                text={getSymbolFromCurrency(currency) || '??'}
                            />
                        }
                    </div>
                </AccordionSummary>
                <AccordionDetails className={classes.details}>
                    <div className={`${classes.column}, ${classes.wide}`}>
                        <Avatars
                            members={members}
                            payers={data.payerIDs}
                            handlePayersChanged={handlePayersChanged}
                        />
                    </div>
                    <div className={clsx(classes.column, classes.helper)}>
                        <Typography variant="caption">
                            Select who paid for this item
                            <br />
                            <a
                                href="#secondary-heading-and-columns"
                                className={classes.link}
                            >
                                Learn more
                            </a>
                        </Typography>
                    </div>
                </AccordionDetails>
                <Divider />
                <AccordionActions>
                    <Actions
                        editMode={editMode}
                        save={save}
                        cancel={cancel}
                        toggleEdit={toggleEdit}
                        delete={handleDeleteItem}
                        editClass={classes.edit}
                    />
                </AccordionActions>
            </Accordion>
        </div>
    );
}

Item.propTypes = {
    id: PropTypes.string,
    groupId: PropTypes.string,
    receiptId: PropTypes.string,
    members: PropTypes.array,
    currency: PropTypes.string,
    updateTotal: PropTypes.func,
};

export default Item;
