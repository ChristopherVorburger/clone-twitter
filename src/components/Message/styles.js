import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  container: {
    '&:hover': {
      backgroundColor: theme.palette.grey.background__input,
    },
  },
  button: {
    textTransform: 'none!important',

    '&:hover': {
      backgroundColor: '#fdc9ce!important',
      borderColor: '#f4212e!important',
      color: '#f4212e!important',
    },
  },
  button_black: {
    textTransform: 'none!important',
  },
  avatar: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    objectFit: 'cover',
    objectPosition: 'center',
  },
}));
