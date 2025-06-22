// src/styles/theme.ts

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(123, 192, 177)', // $primary-color
      contrastText: 'rgb(243, 238, 228)',   // $text-dark
    },
    secondary: {
      main: 'rgb(243, 238, 228)', // $secondary-color
      contrastText: '#212529',   // $text-primary
    },
    background: {
      default: 'rgb(196, 220, 208)', // $medium-color
      paper: '#f8faf9',              // $light-color
    },
    text: {
      primary: '#212529',   // $text-primary
      secondary: '#6c757d', // $text-secondary
    },
    error: {
      main: 'rgb(251, 152, 147)', // $priority-high
    },
    warning: {
      main: 'rgb(250, 235, 152)', // $priority-medium
    },
    info: {
      main: 'rgb(137, 247, 140)', // $priority-low
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          fontWeight: 500,
          '&:hover': {
            opacity: 0.85,
          },
        },
      },
    },
  },
});

export default theme;
