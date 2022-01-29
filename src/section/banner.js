import { Container, Box, Heading, Text, Button,useColorModeValue } from '@chakra-ui/react';
import Image from 'next/image'
import NextLink from 'next/link'
import Logo from '../../public/startos.png'
import P from '../Components/Paragraph'
import styled from '@emotion/styled'
import ShapeLeft from '../assets/shape-left.png';
import ShapeRight from '../assets/shape-right.png';
import Fundo from '../assets/vector/bann.jpg';


const Banner = () => {

    const styling = { 
}
    return (
        <section   id='inicio'>
      
         <Container  
         maxW={'container.xl'}
         minH={'inherit'} 
         mt={14}
         display={'flex'}
         flexDirection={'column'}
         justifyContent={'center'}
         
         >
            <Box 
             w={['100%', '90%', '535px', null, '57%', '60%', '68%', '60%']}
             mx={'auto'}
             textAlign={'center'}
             mb={['40px', null, null, null, null, 7]}>
            <Heading as="h3" variant="page-title">
                O Start OS é a melhor plataforma de gestão online para seu negócio.
            </Heading>
             <P> 
                Com Start OS você tem simplicidade e facilidade para emissão NFCe e NFe, sistema totalmente em cloud acessivel em qualquer lugar e controle para gestão do seu negócio.
             </P>
             <Box align="center" my={4}>
              <NextLink href="#about">
              <Button colorScheme={'#6f42c1'} color="#FFFFFF" bg="#6f42c1" >Explore</Button>
              </NextLink>
             </Box>
              </Box> 
            <Box 
             justifyContent={'center'} 
             textAlign="center"
             display={'inline-flex'}
             mb={[0, null, -6, null, null, '-40px', null, -3]}
             position="relative"
             height={[245,'auto']}
            >
             <Image src={Logo} alt="Sistema Start OS ERP" />
            </Box>
         </Container>
 
        </section>
    )
}

export default Banner
