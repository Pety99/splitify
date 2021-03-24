import { makeStyles, TextField, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    textEdit: {
        width: '80%',
    },
    resize: {
        fontSize: theme.typography.pxToRem(15),
    },
}));

function Text(props) {
    const classes = useStyles();
    return props.editMode ? (
        <TextField
            className={` ${classes.textEdit}`}
            multiline
            InputProps={{
                classes: {
                    input: classes.resize,
                },
            }}
            defaultValue={'Item Name (This might be long)'}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => props.handleTextChange(e.target.value)}
        />
    ) : (
        <Typography className={props.colorClass}>
            Item Name (This might be long)
        </Typography>
    );
}

Text.propTypes = {
    editMode: PropTypes.bool,
    handleTextChange: PropTypes.func,
    colorClass: PropTypes.string,
};

export default Text;
