import { makeStyles } from "@material-ui/core/styles";
import logo from "../assets/img/logo.jpg"


export const useHeader = makeStyles( (theme) => ({

    header: {
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(to right, #8e2de2, #4a00e0);',
    },

    container: {
        height: '90%',
        width: '80%',
        background: '#fff',
        borderRadius: '29px 29px 29px 29px',
    },

    logo: {
        backgroundImage: `url(${logo})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        borderRadius: '29px 0 0 29px',
        [theme.breakpoints.down("sm")] : {
            display: 'none',
        }
    },
    
    texto: {
        padding: '2rem',
    },

    titulo: {
        fontSize: '2rem',
        color: '#4a148c',
        [theme.breakpoints.down("xs")] : {
            fontSize: '1.4rem',
        }
    }

}))