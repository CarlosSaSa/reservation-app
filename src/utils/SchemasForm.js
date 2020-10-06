import * as Yup from "yup";

export const SchemaRegister = Yup.object().shape({
    nombre: Yup.string().required('El nombre es obligatorio'),
    apellido: Yup.string().required('Los apellidos son requeridos'),
    correo: Yup.string().required('El correo es requerido').email('Debe ser un email valido'),
    password: Yup.string().min(5, 'La contraseña debe tener al menos 5 caracteres').required('El password es obligatorio'),
    repeatPassword: Yup.string().oneOf([ Yup.ref('password'), null ], 'Las contraseñas deben coincider').required('Debe escribir la confirmación de la contraseña')
});

