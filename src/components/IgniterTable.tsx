import { api } from '@/utils/api';
import { Badge, Box, Button, ButtonGroup, Code, Heading, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Stack, Table, Tbody, Td, Text, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react';
import Dockerode from 'dockerode';

const stateToColor = (state: string): 'info' | 'error' | 'success' | 'warning' | 'primary' | 'secondary' | 'accent' | 'ghost' => {
  switch (state) {
    case 'running': return 'success';
    case 'created': return 'info';
    case 'paused': return 'accent';
    case 'restarting': return 'warning';
    case 'exited': return 'error';
    case 'removing': return 'error';
    case 'dead': return 'error';
    default: return 'error';
  }
};

const stateCanStart = (state: string): boolean => {
  return ['exited'].includes(state);
}

export const IgniterTable = () => {

  const { isLoading, data } = api.docker.listContainers.useQuery();
  
  return (
    <Box
      bg="bg-surface"
      boxShadow={{ base: 'none', md: 'sm' }}
      borderRadius={{ base: 'none', md: 'lg' }}
    >
      <Stack spacing="5">
        <Box px={{ base: '4', md: '6' }} pt="5">
          <Stack direction={{ base: 'column', md: 'row' }} justify="space-between">
            <Text fontSize="lg" fontWeight="medium">
                Containers
            </Text>
            <Button colorScheme="green">Create</Button>
          </Stack>
        </Box>
        <Box overflowX="auto">
          <Table>
            <Thead>
              <Tr>
                <Th>State</Th>
                <Th>Name</Th>
                <Th>Status</Th>
                <Th>Ports</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {
                isLoading || !data ? <tr><td colSpan={5}> Loading </td></tr> :
                  data.length === 0 ? <tr><td colSpan={5}>No results...</td></tr> :
                    data.map((val) => <IgniterTableRow key={val.Id} {...val} />)
              }
            </Tbody>
          </Table>
        </Box>
        <Box px={{ base: '4', md: '6' }} pb="5">
          <HStack spacing="3" justify="space-between">
            <Text color="muted" fontSize="sm">
                  Showing 1 to 5 of 42 results
            </Text>
            {/* <ButtonGroup
              spacing="3"
              justifyContent="space-between"
              width={{ base: 'full', md: 'auto' }}
              variant="secondary"
            >
              <Button>Previous</Button>
              <Button>Next</Button>
            </ButtonGroup> */}
          </HStack>
        </Box>
      </Stack>
    </Box>
  );
}

type IgnitionDockerTableRowProps = unknown & Dockerode.ContainerInfo;

export const IgniterTableRow = (props: IgnitionDockerTableRowProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  

  return (<>
    <Tr className="hover">
      <Td width="10" className='text-center'>
        <Badge borderRadius="md" color={stateToColor(props.State)} >{props.State}</Badge>
      </Td>
      <Td width="0">
        <Text onClick={onOpen}>
          {props.Names[0]?.substring(1)}
        </Text>
        
        <Text color="muted" fontSize="xs">{props.Image}</Text>
      </Td>
      <Td width="20%">
        {props.Status}
      </Td>
      <Td width="10">
        {
          props.Ports?.filter((val) => val.IP !== '::')
            .filter((val) => val.PublicPort)
            .map((val, i) => <span  key={i} className='ml-2 text-primary hover:underline cursor-pointer'>:{val.PublicPort}</span>) 
        }
      </Td>
      <Td width="10">
        <ButtonGroup variant="ghost">

          {
            stateCanStart(props.State) ? (<>
              <Button color='ghost' className='normal-case' size='sm'>
                <span className="text-primary">Start</span>
              </Button>
            </>) : (<>
              <Button color='ghost' className='normal-case' size='sm'>
                <span className="text-primary">Restart</span>
              </Button>
              <Button color='ghost' className='normal-case' size='sm'>
                <span className="text-primary">Stop</span>
              </Button>
            </>)
          }
        </ButtonGroup>
      </Td>
    </Tr>

    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading size="sm" textStyle="" textTransform="capitalize">
            { props.Names[0]?.substring(1).replaceAll('_', ' ') }
          </Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Code w="full" as="pre">{ JSON.stringify(props, undefined, 2) }</Code>
        </ModalBody>
      </ModalContent>
    </Modal>

  </>)
}