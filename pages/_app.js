import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
// import { store } from '../state/store'
// import { Provider } from 'react-redux'
import RouterIdicator from '../state/context/RouterIdicator'
import UserProvider from '../state/context/userContext'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      {/* <Provider store={store}> */}
      <RouterIdicator />
      <ThemeProvider theme={darkTheme}>
        <Box className="h-[30px] w-full bg-[#242f3d] fixed top-0 z-10 left-0" />
          <Component {...pageProps} />
      </ThemeProvider>
      {/* </Provider > */}
    </UserProvider>
  )
}

export default MyApp
