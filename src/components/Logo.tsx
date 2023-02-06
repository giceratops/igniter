import { Button, Flex, Image, Text } from '@chakra-ui/react'
import Link from 'next/link'

export type LogoProps = { 
  showText?: boolean
};

export const Logo = (props: LogoProps) => (<>
  <Button as={Link} variant="link" href="/">
    <Flex gap="2" alignItems="center">
      <Image src= "/favicon.png" alt="logo" height="30px" width="30px" />
      {props.showText && <Text>Igniter</Text>}
    </Flex>
  </Button>
</>)

Logo.defaultProps = {
  showText: true
};