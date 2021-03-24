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
import { useState } from 'react';
import Actions from './Actions';
import Avatars from './Avatars';
import Text from './Text';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
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

function Item() {
    const classes = useStyles();
    const [editMode, setEditMode] = useState(false);

    const cancelEdit = (e) => {
        e.stopPropagation();
        setEditMode(!editMode);
    };
    const cancel = () => {
        setEditMode(!editMode);
    };
    const save = () => {
        setEditMode(!editMode);
    };

    const handleTitleChange = (text) => {
        console.log(text);
    };

    const handlePriceChange = (text) => {
        console.log(text);
    };

    return (
        <div className={classes.root}>
            <Accordion
                style={{
                    borderRadius: '15px',
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
                        />
                    </div>
                    <div className={classes.column}>
                        {
                            <Text
                                editMode={editMode}
                                colorClass={classes.secondaryHeading}
                                handleTextChange={handlePriceChange}
                            />
                        }
                    </div>
                </AccordionSummary>
                <AccordionDetails className={classes.details}>
                    <div className={`${classes.column}, ${classes.wide}`}>
                        <Avatars members={[1, 2, 3, 4, 5, 6]} />
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
                        cancelEdit={cancelEdit}
                        editClass={classes.edit}
                    />
                </AccordionActions>
            </Accordion>
        </div>
    );
}

export default Item;
