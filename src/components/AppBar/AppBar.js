import React, { Fragment, useState } from 'react';
import { useAppBar } from '../../styles/styleTabs';
import { AppBar, Box, Tab, Tabs } from '@material-ui/core';
import { FormRegister } from '../formRegister';

export const AppBarLeft = () => {

    const appBarClasses = useAppBar();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Fragment>
            <AppBar position="static" color="transparent" className={appBarClasses.root}>
                <Tabs variant="fullWidth" value={value} indicatorColor="primary" textColor="primary" onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="Iniciar Sesión" id="simple-tab-0" aria-controls="simple-tabpanel-0" />
                    <Tab label="Registrarse" id="simple-tab-1" aria-controls="simple-tabpanel-1" />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <FormRegister />
            </TabPanel>
        </Fragment>
    )
}

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box >
                    {children}
                </Box>
            )}
        </div>
    );
}
