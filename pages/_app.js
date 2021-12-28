import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import 'react-h5-audio-player/lib/styles.css';
import 'react-medium-image-zoom/dist/styles.css'
import RouterIdicator from '../state/context/RouterIdicator'
import UserProvider from '../state/context/userContext'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Layout from '../components/Layout';
import DocumentHead from '../components/Head';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <DocumentHead />
      <RouterIdicator />
      <ThemeProvider theme={darkTheme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </UserProvider>
  )
}

export default MyApp
