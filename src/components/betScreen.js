import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Header from './ui/header';
import useBetCall from './../hooks/useBet';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    toolbar: theme.mixins.toolbar,
    top: {
        paddingTop: '20px'
    },
    buttonContainer: {
        textAlign: 'center',
        '& > *': {
            margin: theme.spacing(1)
        },
    },
    buttonActive: {
        background: 'green',
        color: '#fff'
    },
    buttons: {
        "&:active": {
            backgroundColor: 'green',
            color: '#ffffff'
        },
    }
}));
let tempArr = [];
export default function BetScreen() {

    const classes = useStyles();

    const [menuOpen, setMenuOpen] = useState(false);
    const [betFix, setBetFix] = useState([]);
    const betData = useBetCall();
    const saveBet = (name, price, id) => {
        tempArr.push(...tempArr, { name, price, id })
        const obj = [...new Map(tempArr.map(item => [JSON.stringify(item), item])).values()];
        setBetFix(obj);
        setMenuOpen(true);
    }

    const callback = (val) => {

        setBetFix(val);
        tempArr = val;
        console.log('newVal', val)
    }

    return (
        <React.Fragment>
            <Header betPrice={betFix} drawerOpen={menuOpen} returnData={callback} setDrawerOpen={setMenuOpen} />
            <div className={classes.root}>
                <div className={classes.toolbar} />
                <Grid container spacing={2} className={classes.top}>
                    {betData.map((item, index) => {
                        if (item.markets.length === 0) {
                            return null
                        } else {
                            return <Grid key={item.name} item xs={12} sm={12} md={6} lg={6}>
                                <Paper className={classes.paper}>
                                    {item.name}
                                    <Divider />

                                    {item.markets.map((item, index) => {
                                        return <Typography key={item.name} align="left" variant="subtitle1" color="textPrimary">
                                            {item.name}
                                            <Divider />
                                            <div className={classes.buttonContainer}>
                                                {item.selections.map((item, index) => {
                                                    return <Button key={item.name}
                                                        variant="outlined"
                                                        className={classes.buttons}
                                                        onClick={() => saveBet(item.name, item.price, item.id)}
                                                    >
                                                        {item.name}<br />{item.price}
                                                    </Button>

                                                })}
                                            </div>
                                        </Typography>
                                    })}
                                    <Divider />

                                </Paper>
                            </Grid>
                        }
                    })}

                </Grid>
            </div>
        </React.Fragment>
    )
}