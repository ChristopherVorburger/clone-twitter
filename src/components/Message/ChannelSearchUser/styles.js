import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  modal: {
    backgroundColor: 'background.paper',
  },
  container: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '400px',
    transform: 'translate(-50%, -50%)',
    backgroundColor: theme.palette.white.main,
    minWidth: '600px',
    maxWidth: '80vw',
    minHeight: '400px',
    borderRadius: '16px',
    height: '98vh!important',
    overflowY: 'scroll',
    overflowX: 'hidden',
    [theme.breakpoints.down('md')]: {
      minWidth: '350px',
    },
  },
  button: {
    textTransform: 'none!important',
  },
  cover: {
    objectFit: 'cover',
    width: '590px',
    height: '200px',
    opacity: 0.75,
  },
  cover__container: {
    backgroundColor: `${theme.palette.grey.main}!important`,
  },
  avatar__container: {
    position: 'relative',
  },
  avatar: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    objectFit: 'cover',
    objectPosition: 'center',
    transform: 'scale(1.6)',
    backgroundColor: theme.palette.white.main,
    border: `2px solid ${theme.palette.white.main}`,
    opacity: 0.75,
  },
  image: {
    position: 'absolute',
    backgroundColor: theme.palette.black.main,
    color: theme.palette.white.main,
    borderRadius: '50%',
    cursor: 'pointer',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%) scale(0.8)',
    padding: '0.5rem',
  },
  button__add_cover: {
    position: 'absolute!important',
    borderRadius: '50%',
    width: '50px',
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: `${theme.palette.black.main}!important`,
    color: `${theme.palette.white.main}!important`,
    cursor: 'pointer!important',
    padding: '0.5rem',
  },
  field: {
    padding: '12px 1rem!important',
  },
  link_pro: {
    '&:hover': {
      backgroundColor: theme.palette.grey.background__trend,
    },
  },
  profile_section: {
    minWidth: '240px',
    [theme.breakpoints.down('lg')]: {
      minWidth: '120px',
      marginRight: '1rem',
    },
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: '#0f14191a!important',
    },
  },
  profile_section__avatar_button: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    objectFit: 'cover',
    objectPosition: 'center',
  },
  profile_section__avatar_texts: {
    [theme.breakpoints.down('lg')]: {
      display: 'none!important',
    },
  },
}));
