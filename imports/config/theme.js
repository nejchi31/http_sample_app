import { MuiThemeProvider, createMuiTheme, withStyles, withTheme} from '@material-ui/core//styles';
import purple from '@material-ui/core/colors/purple';

export  const theme = createMuiTheme({
  palette: {
    primary: { light: '#B2DFDB', main: '#4b4c4f', dark: '#004D40', contrastText: '#fff'},
    secondary: { light: '#81D4FA', main: '#039BE5', dark: '#01579B', contrastText: '#000'},
    default: {  light: '#b36dee', main: '#f4ee32', dark: '#514e4e', contrastText: '#000'},
    primary1Color: "#f40331",
    primary2Color: "#90caf9",
    alternateTextColor: "#424242",
    canvasColor: "#616161",
    textColor: "#bdbdbd",
    secondaryTextColor: "#bdbdbd",
    alternateСanvasColor: "#222",
     alternate1Color: "#616161",
     alternate2Color: "#424242",
     disabledColor: "#757575",
     accent1Color: "#ffab40",
     accent2Color: "#9e9e9e",
     primary3Color: "#0288d1",
     borderColor: "#0288d1"
  },
  status: {
    danger: 'orange',
  },
  overrides: {
    MuiPaper: { // Name of the component ⚛️ / style sheet
      root: { // Name of the rule
        backgroundColor:  "#ffffff",
      },
    },
    MuiTypography: {
      root: {
        flexGrow: '1',
      },
      title: {
        fontSize: 10,
      },
      subheading: {
        fontSize: 12,
      },
      textSecondary: {
        fontSize: 8,
      },
    },
  },
  typography:{
    fontFamily:['-apple-system','BlinkMacSystemFont','"Rajdhani"','"Roboto"','sans-serif',].join(','),
  }
});

export const theme1 = createMuiTheme({
  palette: {
    primary: { light: '#000000', main: '#f44336', dark: '#0f73ae', contrastText: '#fff'},
    secondary: { light: '#000000', main: '#edf5fb', dark: '#717c84', contrastText: '#000'},
    default: {  light: '#f4ee32', main: '#b36dee', dark: '#ff5252', contrastText: '#000'},
    primary1Color: "#03f44e",
  },
  status: {
    danger: 'orange',
  },
  overrides: {
    MuiPaper: { // Name of the component ⚛️ / style sheet
      root: { // Name of the rule
        backgroundColor: "#03f44e",
      },
    },
    MuiTypography: {
      root: {
        flexGrow: '1',
      },
    },
  },
  typography:{
    fontFamily:['-apple-system','BlinkMacSystemFont','"Rajdhani"','"Roboto"','sans-serif',].join(','),
  }
});
