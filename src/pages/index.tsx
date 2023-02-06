import { IgniterTable } from '@/components/IgniterTable';
import { Container } from '@chakra-ui/layout';
import { type NextPage } from 'next';


const Home: NextPage = () => {
  return (
    <Container>
      <IgniterTable />
    </Container>
  );
};

export default Home;
