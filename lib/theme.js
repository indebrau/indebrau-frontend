import { createTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { indigo, amber } from '@material-ui/core/colors';

let theme = createTheme({
  components: {
    MuiDialog: {
      defaultProps: {
        onClick: (e) => e.stopPropagation(),
        BackdropProps: {
          sx: {
            pointerEvents: 'none',
          },
        },
      },
    },
  },
  palette: {
    primary: {
      light: indigo[100],
      main: indigo[500],
      dark: indigo[700],
    },
    secondary: {
      light: amber[300],
      main: amber[500],
      dark: amber[700],
    },
  },
  spacing: 8,
});

theme = responsiveFontSizes(theme);

export default theme;
