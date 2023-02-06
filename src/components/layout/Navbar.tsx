import {
  Box, ButtonGroup,
  Container, Flex,
  HStack,
  IconButton,
  Spacer, useColorModeValue
} from '@chakra-ui/react';
import Link from 'next/link';
import { FaRegHourglass, FaScroll } from 'react-icons/fa';
import { DarkModeSwitch } from '../DarkModeSwitch';
import { Logo } from '../Logo';
import { useScroll } from 'framer-motion';
import React from 'react';
import { api } from '@/utils/api';

export const Navbar = () => {
  const { rootProps } = useNavbar()

  const { data: navItems, status } = api.nav.getItems.useQuery();

  console.log(navItems);

  return (<>
    <Box as="nav" {...rootProps} bg="bg-surface" boxShadow="sm" position="sticky" top="0" zIndex="docked" mb="5">
      <Container>
        <Flex justify="space-between">
          <HStack spacing="4">
            <Logo />
          </HStack>

          <Spacer />

          <HStack spacing="4">
            <ButtonGroup variant="ghost" spacing="1">
              <IconButton as={Link} href='/cron' icon={<FaRegHourglass fontSize="1.25rem" />} aria-label="Cron jobs" />
              <IconButton as={Link} href='/logs' icon={<FaScroll fontSize="1.25rem" />} aria-label="Logs" />
            </ButtonGroup>
          </HStack>
          <HStack ml="8">
            <DarkModeSwitch />
          </HStack>
        </Flex>
      </Container>
    </Box>
    <Box>
      { status + ' ' + JSON.stringify(navItems) }
    </Box>
  </>)
}

export const useNavbar = () => {
  const { scrollY } = useScroll()
  const [isScrolled, setIsScrolled] = React.useState(false)
  const boxShadow = useColorModeValue('sm', 'sm-dark')

  scrollY.on('change', () => setIsScrolled(scrollY.get() > 25))

  return {
    rootProps: {
      py: isScrolled ? 2 : { base: '2', lg: '5' },
      shadow: isScrolled ? boxShadow : 'none',
      transition: 'all 0.2s',
    },
  }
}