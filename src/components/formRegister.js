import React, { useState } from 'react';
import { FormControl, Grid, IconButton, Input, InputAdornment, InputLabel, TextField } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useStyleForm } from '../styles/styleTabs';

export const FormRegister = () => {

  const classesForm = useStyleForm();
  const [values, setValues] = useState({ password: '', showPassword: false} );
  const [repeatPassword, setRepeatPassword] = useState({ repeatPassword: '', showRepitPassword: false} );

  const handleShowPassword = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  }

  const handleShowRepeatPassword = (prop) => (event) => {
    setRepeatPassword({ ...repeatPassword, [prop]: event.target.value });
  }

  return (
    <form noValidate autoComplete="off">
      <Grid container justify="space-between">
        <Grid item xs={12} md={5}>
          <TextField
            className={classesForm.espacio}
            label="Nombre"
            placeholder="Ej. Ian"
            fullWidth
            multiline
          />
        </Grid>
        <Grid item xs={12} md={5}>
          <TextField
            className={classesForm.espacio}
            label="Apellidos"
            placeholder="Ej. Vn"
            fullWidth
            multiline
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            className={classesForm.espacio}
            label="Correo"
            placeholder="Ej. yo@com.mx"
            fullWidth
            multiline
            margin="dense"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth className={classesForm.espacio}>
            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
            <Input
              id="standard-adornment-password"
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleShowPassword('password')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={ () => setValues({ ...values, showPassword: !values.showPassword }) }
                    onMouseDown={ (e) => e.preventDefault() }
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
        <FormControl fullWidth className={classesForm.espacio}>
            <InputLabel htmlFor="standard-adornment-repeatpassword">Repeat Password </InputLabel>
            <Input
              id="standard-adornment-repeatpassword"
              type={repeatPassword.showRepitPassword ? 'text' : 'password'}
              value={ repeatPassword.repeatPassword }
              onChange={handleShowRepeatPassword('repeatPassword')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={ () => setRepeatPassword({ ...repeatPassword, showRepitPassword: !repeatPassword.showRepitPassword }) }
                    onMouseDown={ (e) => e.preventDefault() }
                  >
                    {repeatPassword.showRepitPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Grid>
      </Grid>
    </form>
  )
}
