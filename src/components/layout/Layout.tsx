import { Flex } from '@chakra-ui/react';
import Head from 'next/head';
import type { ReactNode } from 'react';
import { IgniterProvider } from './IgniterProvider';
import { Footer } from '../nav/Footer';
import { Navbar } from '../nav/Navbar';

export type LayoutProps = {
  children: ReactNode
}

export const Layout = (props: LayoutProps) => {
  
  return (<>
    <IgniterProvider>
      <Head>
        <title>Igniter</title>
        <meta name="description" content="ignition docker" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <Flex direction="column" flex="1"> 
        <Navbar />
        <Flex as="main" role="main" direction="column" flex="1">
          { props.children }
        </Flex>
        <Footer />
      </Flex>
    </IgniterProvider>
  </>)
}