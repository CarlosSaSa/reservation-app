import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import Page from '../../components/dashboard/Page';
import moment from 'moment';
import 'moment/locale/es-mx';

import { Calendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";


import 'react-big-calendar/lib/css/react-big-calendar.css';

const DragAndDropCalendar = withDragAndDrop(Calendar);
const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: '100%',
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3)
    },
}));
// localizer
moment.locale('es-mx');
const localize = momentLocalizer(moment);

const myEventsList = [{
    title: "today",
    start: moment().add(1,'hours').toDate() ,
    end: moment().add(2,'hours').toDate()
},
{
    title: "string",
    start: moment().add(30,'minutes').toDate(),
    end: moment().add(40,'minutes').toDate()
}]

const messages ={
    date: 'Fecha',
    time: 'Horario',
    event: 'Evento',
    week: 'Semana',
    day: 'Día',
    month: 'Mes',
    previous: 'Anterior',
    next: 'Siguiente',
    yesterday: 'Ayer',
    tomorrow: 'Mañana',
    today: 'Hoy'
}



export const CalendarApp = () => {
    const classes = useStyles();

    const onSelectSlot = (e) => {
        console.log(e);
    }

    const onDrillDown = (e) => {
        console.log(e);
    }

    return (
        <Page
            className={classes.root}
            title="Calendario"
        >
            <Grid container >
                <Grid item xs={12} >
                    <DragAndDropCalendar
                        localizer={ localize }
                        events = { myEventsList }
                        defaultDate={ moment().toDate() }
                        startAccessor= "start"
                        endAccessor="end"
                        style={ { height: '100vh', width:'100%' } }
                        defaultView = { "agenda" }
                        messages={ messages }
                        views={['week', 'work_week', 'day', 'agenda' ]}
                        selectable
                        onSelectSlot ={ onSelectSlot }
                        resizable
                        onEventDrop ={ onDrillDown }
                    />
                </Grid>
            </Grid>

        </Page>
    )
}
