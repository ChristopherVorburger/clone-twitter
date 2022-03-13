import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
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
  profile_section__icon_more: {
    justifyContent: 'flex-end!important',
    [theme.breakpoints.down('lg')]: {
      display: 'none!important',
    },
  },
}));
