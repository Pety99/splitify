import {Avatar, Card, CardActionArea, CardContent, makeStyles, Typography } from "@material-ui/core";

import PropTypes from 'prop-types';

const glass = {
    background: `rgba(255, 255, 255, 0.25 )`,
    backdropFilter: 'blur( 4px )',
    border: '1px solid rgba( 255, 255, 255, 0.18 )',
};

const useStyles = makeStyles({
    root: {
      maxHeight : 100,
    },
    media: {
      height: 140,
    },
    glass: glass,
  });

function ReceiptItem(props) {
    const {data, onClickHandler} = props;
    const classes = useStyles();

    return (
        <Card className={`${classes.root} ${classes.glass}`}>
      <CardActionArea onClick={() => onClickHandler(props.data)}>
        <CardContent>
        <Avatar alt="Store logo" src={data.logo} />
          <Typography gutterBottom variant="h5" component="h2">
                        {data.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
              {data.date}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
              {data.total}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    )
}
/**
 * <Button variant="contained" color="primary" onClick={() => props.onClickHandler(props.data)}></Button>
 */

ReceiptItem.propTypes = {
    onClickHandler: PropTypes.func,
    data: PropTypes.object,
}

export default ReceiptItem;