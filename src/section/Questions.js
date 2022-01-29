
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    Center,
    Heading,
  } from '@chakra-ui/react'


  const AccordionQuestions = () => {

    return(
        <>
        <Center >
            <Heading>
                Perguntas Frequentes
            </Heading>
        </Center>
        
        <Accordion mt={4}>
  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box flex='1' textAlign='left'>
        Como faço para tirar duvidas sobre o Start OS
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
    Nossa equipe de atendimento está à disposição 
    para suas dúvidas. Acesse o link do contato no 
    menu superior e envie sua mensagem em nosso WhatssApp,
    E-mail ou entre em contato pelo telefone (38) 9 9122-7887.
    </AccordionPanel>
  </AccordionItem>

  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box flex='1' textAlign='left'>
        Existe algum custo de instalação?
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
    Não há custo de instalação nem por emissões 
       de notas ou boletos. Você assina o plano,
       enviar seus dados no formulario e  te enviamos 
       login e senha já para ter acesso ao sistema.
       Será cobrada apenas a mensalidade
       após o período de teste gratuito.
    </AccordionPanel>
  </AccordionItem>

  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box flex='1' textAlign='left'>
        Como funciona o suporte?
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
    Nossa equipe de suporte está preparada para tirar todas as suas dúvidas e lhe auxiliar nas configurações necessárias, podendo agendar um auxilio na implantação.
    </AccordionPanel>
  </AccordionItem>
</Accordion>
        </>
    )

  }

  export  default AccordionQuestions