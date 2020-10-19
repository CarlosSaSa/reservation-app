import React, { Fragment, useEffect, useState } from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import Page from '../../components/dashboard/Page';
import Pagination from '@material-ui/lab/Pagination';
import moment from 'moment';
import 'moment/locale/es-mx';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: '100%',
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3)
    },
}));


export const CalendarApp = () => {
    const classes = useStyles();
    
    
    return (
        <Page
            className={classes.root}
            title="Calendario"
        >
            <Grid container >
               
            </Grid>

        </Page>
    )
}
