import { api } from '@/utils/api';
import { Box, Button, Code, Container, Divider } from '@chakra-ui/react';
import { ImageInfo } from 'dockerode';
import { NextPage } from 'next';

const ImagesPage: NextPage = () => {
  const { data: images } = api.docker.listImages.useQuery();
  const { data, mutate, status } = api.docker.downloadImage.useMutation();

  const  res = api.docker.onDownloadImage.useSubscription();


  
  const downloadImage = () => {
    const data = mutate();
    //console.log(data);
  }


  return (<>
    <Container>
      <Box>
        <Button onClick={(e) => downloadImage()}>Prune</Button>   
        <Box>
          { status }
        </Box>
        <Box>
        </Box>
      </Box>

      <Divider py="4" />

      <Box> 
        {
          images?.map((image: ImageInfo) => image?.RepoTags ? image?.RepoTags[0] : undefined)
            .filter((tag) => tag && tag !== '<none>:<none>')
            .sort()
            .map((tag, i) => <Box key={i}>{ tag }</Box>)
        }
      </Box>
    </Container>
  </>);
}

export default ImagesPage;