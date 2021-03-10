import { useState, useEffect } from "react"

import { Collapse, List, ListItem, ListItemIcon, ListItemText, makeStyles, Paper } from "@material-ui/core";
import { ExpandLess, ExpandMore, Group, FiberManualRecord, } from "@material-ui/icons";

function groups() {
    const [groups, setGroups] = useState([]);
    const [open, setOpen] = useState(true);


    const useStyle = makeStyles((theme) => ({
        nested: {
            paddingLeft: theme.spacing(4),
        },
    }));

    const handleClick = () => {
        setOpen(!open);
    };

    const classes = useStyle();

    useEffect(() => {
        setGroups(['asd', 'asd2', 'asd3']);
        return [];
    }, [])

    return (
        <List>
            <ListItem button onClick={handleClick}>
                <ListItemIcon>
                    <Group />
                </ListItemIcon>
                <ListItemText primary="Groups" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Paper style={{maxHeight: '50vh', overflow: 'auto', boxShadow : 'none'}} className="paper">
                <Collapse in={open} timeout="auto" unmountOnExit >
                    <List component="div" disablePadding>
                        {groups.map((text) => (
                            <ListItem button key={text} className={classes.nested}>
                                <ListItemIcon><FiberManualRecord /></ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                </Collapse>
            </Paper>
        </List>
    )
}

export default groups;