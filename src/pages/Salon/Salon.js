import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getClassRoomById, getReservationsById } from '../../utils/fetch/user'
import {
    Backdrop, CircularProgress, Grid, makeStyles,
    TableCell, TableRow, TableFooter, TablePagination, Dialog, DialogContent,
    DialogActions, Button, Fab, createMuiTheme, Tooltip, DialogContentText
} from '@material-ui/core';
import MUIDataTable from "mui-datatables";
import AddIcon from '@material-ui/icons/Add';
import Page from '../../components/dashboard/Page';
import { useDispatch } from 'react-redux';
import { Logout } from '../../actions/authActions';
import { Formik } from 'formik';
import { SchemaDate } from '../../utils/SchemasForm';
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import moment from 'moment';
import "moment/locale/es-mx";

moment.locale('es-mx');


const columns = [
    { name: "fecha_inicio", label: "Fecha de inicio", options: { sort: false } },
    { name: "fecha_fin", label: "Fecha de fin", options: { sort: false } },
    { name: "salon.nombreSalon", label: "Salón", options: { sort: false } },
    { name: "usuario.correo", label: "Correo del usuario", options: { sort: false } },
]

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: '100%',
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3)
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff'
    },
    float: {
        position: 'absolute',
        bottom: '0px',
        left: '0px'
    },
    toolbar: {
        position: 'relative',
    }
}));

const getMuiTheme = () => createMuiTheme({
    overrides: {
        MUIDataTableBodyCell: {
            root: {
                position: 'absolute'
            }
        }
    }
})

export const Salon = () => {

    const { id } = useParams();
    const [reservaciones, setReservaciones] = useState({ data: [], isLoading: true });
    const [salon, setSalon] = useState("");
    const [openModal, setOpenModal] = useState({ formulario: false, open: false });
    const dispatch = useDispatch();
    const classes = useStyles();

    // efecto para comprobar la existencia del id
    useEffect(() => {
        // obtenemos el token de localstorage
        const token = localStorage.getItem('token') || '';

        Promise.all([getReservationsById(id, token), getClassRoomById(id)]).then(values => {
            setReservaciones({ data: values[0].Reservaciones, isLoading: false });
            setSalon(values[1].salon.nombreSalon);
        })
            .catch(error => {
                setReservaciones({ data: [], isLoading: false });
                setSalon('No disponible');
            });

        // getReservationsById(id, token)
        //     .then(data =>  setReservaciones({ data: data.Reservaciones, isLoading: false }))
        //     .catch(error => setReservaciones({ data: [], isLoading: false }) );
    }, [id]);

    useEffect(() => {

        // Si es undefined es decir que no se encontraron las reservaciones por algun error del token
        if (reservaciones.data === undefined) {
            // setOpenModal({ ...openModal, open: true });
            setOpenModal(state => ({ formulario: false, open: true }))
        } else {
            console.log('data no undefined', reservaciones.data);
        }

    }, [reservaciones]);


    // funcion para el cambio de pagina
    const onChangePage = async (numeroPagina) => {
        // hacemos la peticion hacia el servidor
        try {
            setReservaciones({ ...reservaciones, isLoading: true });
            const token = localStorage.getItem('token') || null;
            const data = await getReservationsById(id, token, numeroPagina + 1);
            setReservaciones({ data: data.Reservaciones, isLoading: false });
        } catch (error) {
            console.log('error', error);
            setReservaciones({ data: [], isLoading: false });
        }

    }

    const cerrarSesion = () => {
        setOpenModal({ ...openModal, open: false });
        // iniciar logout
        localStorage.clear();
        dispatch(Logout());
    }

    const openForm = () => {
        setOpenModal({ formulario: true, open: true })
    }

    const submitFormModal = () => {
        setOpenModal({ ...openModal, open: false })
    }

    const AddCustomIcon = () => {
        return (
            <Tooltip title="Agregar nuevo horario" aria-label="add">
                <Fab color="secondary" size="small" onClick={openForm} >
                    <AddIcon />
                </Fab>
            </Tooltip>
        )
    }

    // Footer personalizado
    const customFooter = (count, page, rowsPerPage, changeRowsPerPage, changePage) => {
        return (
            <TableFooter>
                <TableRow>
                    <TableCell>
                        <TablePagination
                            component="div"
                            count={-1}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            rowsPerPageOptions={[]}
                            onChangePage={(_, number) => changePage(number)}
                            labelRowsPerPage="Registros por página"
                            labelDisplayedRows={({ from, to, count, page }) => `Pagina: ${page}`}
                        />
                    </TableCell>
                </TableRow>
            </TableFooter>

        )
    }

    // opciones
    const opciones = {
        serverSide: true,
        download: false,
        print: false,
        responsive: 'standard',
        selectableRowsHeader: false,
        selectableRows: 'none',
        customFooter: customFooter,
        customToolbar: AddCustomIcon,
        onChangePage: onChangePage,
        textLabels: {
            body: {
                noMatch: 'No se encontraron mas registros'
            },
            toolbar: {
                search: "Buscar",
                viewColumns: "Ver columnas",
                filterTable: "Filtro de tabla",
            },
        }
    }

    return (
        <Page
            className={classes.root}
            title="Horarios"
        >
            <Grid container justify="center" alignContent="center" >
                <Grid item xs={12} md={10} >
                    <Backdrop className={classes.backdrop} open={reservaciones.isLoading}>
                        <CircularProgress color="inherit" />
                    </Backdrop>

                    <MUIDataTable
                        title={`Lista de horario para el salon: ${salon}`}
                        data={reservaciones.data}
                        columns={columns}
                        options={opciones}
                    />
                    <ModalCustom openModal={openModal} cerrarSesion={cerrarSesion} submitFormModal={submitFormModal} />

                </Grid>
            </Grid>

        </Page>
    )
}

const ModalCustom = ({ openModal, cerrarSesion, submitFormModal }) => {

    const { formulario, open } = openModal;

    return (
        <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            maxWidth="xs"
            fullWidth
            open={open}
        >
            <DialogContent >
                {
                    !formulario ?
                        <DialogContentText> La sesión ha caducado, por favor inicie sesión de nuevo </DialogContentText> :
                        (
                            // formulario
                            <FormularioModal />
                        )
                }
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={!formulario ? cerrarSesion : submitFormModal}>
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    )
}

const FormularioModal = () => {

    const onSubmit = ({ values, actions }) => {
        console.log('values', values);
    }

    const Formulario = ({ dirty, errors, handleBlur, handleChange, handleSubmit, isValid, touched, values }) => {

        const [selectedDate, handleDateChange] = useState(new Date());

        const dateChange = ( date) => {
            console.log('date', date);
            handleDateChange( date );
        }

        const labelFunc = (date, invalidLabel) => {
            return moment( date ).format('dddd, D [de] MMMM [de] YYYY h:mm:ss a');
        }

        console.log('estado', selectedDate);

        return (
            <MuiPickersUtilsProvider libInstance={moment} locale={"es-mx"} utils={ MomentUtils } >
                <form  >
                    <Grid container>
                        <Grid item xs={12} >
                            <DateTimePicker
                                fullWidth
                                name="fecha_inicio"
                                value={ selectedDate }
                                disablePast
                                onChange={ dateChange }
                                label="Fecha de inicio"
                                showTodayButton
                                invalidLabel = "Verifique bien la fecha"
                                labelFunc = { labelFunc }
                            />
                        </Grid>
                    </Grid>

                </form>
            </MuiPickersUtilsProvider>
        )


    }



    return (
        <Formik
            initialValues={{ fecha_inicio: '', fecha_fin: '', salon: '' }}
            validationSchema={SchemaDate}
            onSubmit={onSubmit}
            children={(props) => <Formulario {...props} />}
        />
    )

}
