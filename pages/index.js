import {
  Heading,
  Box,
  Container,
  useColorModeValue,
} from '@chakra-ui/react'

import React from 'react';
import Layout from '../src/components/Layout'
import Banner from '../src/section/banner';
import About from '../src/section/About';
import Plans from '../src/section/Plans';
import Contact from '../src/section/Contact';
import Accordion from '../src/section/Questions';
import Footer from '../src/components/Footer'
import styles from '../styles/Home.module.css'

const index = () => {
  return (
    <Layout>
       <Container maxW={'container.xl'} maxH={'container.xl'}>
       <div className={styles.whatsapp}>
        <a href="https://api.whatsapp.com/send?phone=553891227887" target={'_blank'} rel="noopener noreferrer" >
            <img src="https://cdn0.iconfinder.com/data/icons/social-media-2091/100/social-11-128.png" width="60px"  alt="Fale Conosco pelo WhatsApp" title="Fale Conosco pelo WhatsApp"/> 
        </a>
      </div>
         <section>
          <Banner/>  
          <About/>
          <Plans/>
          <Contact/>
          <Accordion />
          <Footer/>
         </section>
       </Container>
    </Layout>
  )
}

export default index;