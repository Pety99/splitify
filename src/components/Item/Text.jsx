import { makeStyles, TextField, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    textEdit: {
        width: '80%',
    },
    resize: {
        fontSize: theme.typography.pxToRem(15),
    },
    margin: {
        marginTop: 'auto',
        marginBottom: 'auto',
    },
}));

function Text(props) {
    const classes = useStyles();
    return props.editMode ? (
        <TextField
            className={` ${classes.textEdit} ${classes.margin}`}
            multiline
            InputProps={{
                classes: {
                    input: classes.resize,
                },
            }}
            defaultValue={props.text}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => props.handleTextChange(e.target.value)}
        />
    ) : (
        <Typography className={`${props.colorClass} ${classes.margin}`}>
            {props.text}
        </Typography>
    );
}

Text.propTypes = {
    editMode: PropTypes.bool,
    handleTextChange: PropTypes.func,
    colorClass: PropTypes.string,
    text: PropTypes.any,
};

export default Text;
