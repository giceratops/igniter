import { theme as proTheme } from '@chakra-ui/pro-theme';
import { extendTheme } from '@chakra-ui/react';
import '@fontsource/poppins/400.css';

const customTheme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  ...proTheme, 
  fonts : {
    heading: 'Poppins',
    body: 'Poppins'
  },
})

export default customTheme