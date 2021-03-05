import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
    drawerIconContainer: {
        marginLeft: 'auto',
        "&:hover": {
            backgroundColor: 'transparent'
        }
    },
    drawerIcon: {
        color: '#ffffff',
        width: '40px',
        height: '40px'
    },
    drawer: {
        //  backgroundColor: theme.palette.common.black,
        minWidth: '250px',
        justifyContent: 'center',
        alignItems: 'center'
    },
    drawerItem: {
        color: "#444444"
    }
}));

export default function Header({ betPrice, drawerOpen, setDrawerOpen, returnData }) {
    const classes = useStyles();

    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

    const [openDrawer, setOpenDrawer] = useState(drawerOpen);

    const deleteItem = (id) => {
        const filteredItems = betPrice.filter(function (item) {
            return item.id !== id
        })
        returnData(filteredItems);
    }

    return (
        <AppBar position="fixed">
            <Toolbar>
                Bet Slip
                <SwipeableDrawer disableBackdropTransition={!iOS} disableDiscovery={iOS}
                    open={openDrawer || drawerOpen}
                    anchor={'right'}
                    onClose={() => { setOpenDrawer(false); setDrawerOpen(false) }}
                    onOpen={() => setOpenDrawer(true)}
                    classes={{ paper: classes.drawer }}>
                    <List disablePadding>
                        {betPrice.map((item, index) => {
                            return <ListItem className={classes.drawerItem} key={item.name} divider>
                                <ListItemText
                                    primary={item.name}
                                    secondary={item.price}

                                />
                                {item.name === null || '' ? null : <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="delete" onClick={() => { deleteItem(item.id) }}>
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>}

                            </ListItem>

                        })}


                    </List>
                </SwipeableDrawer>
                <IconButton className={classes.drawerIconContainer} onClick={() => setOpenDrawer(!openDrawer)}>
                    <MenuIcon className={classes.drawerIcon} />
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}