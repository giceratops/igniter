import { type AppType } from 'next/app';
import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react';

import { api } from '../utils/api';
import theme from '../theme';

import '../styles/globals.css';
import { Layout } from '@/components/layout/Layout';

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeProvider options={{
        initialColorMode:'dark',
        useSystemColorMode: true, 
      }}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ColorModeProvider>
    </ChakraProvider>
  );
};

export default api.withTRPC(MyApp);