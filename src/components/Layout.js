import Head from 'next/head';
import { Box, Container } from '@chakra-ui/react'
import NavBar from './Navbar'

const Layout = ({ children }) => {
  return (
    <Box pd={8}>
      <Head> 
        <title>Start OS | ERP Fiscal</title>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
          <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
          <meta name="author" content="lindson Cardoso" />
          <meta name="author" content="zltecnologia" />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="Start OS" />
          <meta name="description" content="Start OS | ERP" />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
          />
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Lexend:wght@500;600&display=swap" rel="stylesheet"/>
      </Head>

      <NavBar/>
      <Container maxW="container.xl"  maxH="container.xl" pt={10}>
       {children}
      </Container>
    </Box>
  )
}

export default Layout;