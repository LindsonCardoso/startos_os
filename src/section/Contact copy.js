import React, { useState, useContext, useEffect, useRef } from 'react'
import {
  Button,
  Input,
  Textarea,
  FormLabel,
  FormControl,
  Heading,
  IconButton,
  Flex,
  HStack,
  Stack,
  Box,
  useToast,
  Divider,
  Text,
  color,
  Center
} from '@chakra-ui/react';
import ApiCep from '../services/ApiCep'
import { AnimatePresence } from 'framer-motion';
import ReCAPTCHA from 'react-google-recaptcha'
import Axios from 'axios';
import * as Yup from 'yup';

const Contact = () => {
 
  return (
    <Flex minHeight='100vh' width='full' align='center' justifyContent='center'>
      <Box 
        borderWidth={1}
        px={4}
        width='full'
        maxWidth='1000px'
        borderRadius={4}
        textAlign='center'
        boxShadow='lg'
      >
        <Box p={4}>
          <ContactHeader />
          <ContactForm />
        </Box>
      </Box>
    </Flex>
  )
}
 
const ContactHeader = () => {
  return (
    <Box textAlign='center'>

      <Heading as={'h2'}>Queremos te conhecer melhor! 😊</Heading>
       <Text>Preencha os campos com seus dados pessoais</Text>
    </Box>
  )
}
 
const ContactForm = () => {

const [guardaDados, setGuardaDados] = useState([])
const [dataForm, setDataForm] = useState({
  nome: "",
  email: "",
  whatsapp: "",
  cpf: "",
  numero: "",
  complemento: ""
});

const [mostrar, setMostrar] = useState(false);
const onClickFisica = () => setMostrar(false);
const onClick = () => setMostrar(true);
const formRef = useRef(null)
const [submittng, setSubmitting] = useState(false);

//const [nome, setNome] = useState(user && user.nome);
// error fields to display on form

const [nomeError, setNomeError] = useState("");
const [numeroError, setNumeroError] = useState("");
const [emailError, setEmailError] = useState("");
const [telefoneError, setTelefoneError] = useState("");
const [cpfError, setCpfError] = useState("");
const [passwordError, setPasswordError] = useState("");
const [loginError, setLoginError] = useState("");
const [isVerified, setisVerified] = useState(false);

const [status, setStatus] = useState({
  type: '',
  mensagem: ''
});

const toast = useToast();

const recaptchaRef = React.createRef(null);

//CEP
const [endereco, setEndereco ] = useState({
  cep: "",
  rua: "",
  bairro: "",
  cidade: "",
  estado: "",
  ibge: ""
})

const handleDadosCep = (e) => {
  const cep = e.target.value;
  ApiCep.SearchCep(cep)
  .then(res => {
    let cep = res.data.cep;
    let rua     = res.data.logradouro
    let bairro  = res.data.bairro
    let cidade  = res.data.localidade
    let estado  = res.data.uf
    let ibge    = res.data.ibge
    setEndereco({
      cep: cep,
      rua: rua,
      bairro: bairro,
      cidade: cidade,
      estado: estado,
      ibge: ibge,
    })
    console.log("DADOS de endereço" + JSON.stringify(endereco))
  }).catch(err => {
    console.log(err)
  })
}

  // Handle telefone 
  const handleNumberChange = (e) => {
    let val = e.target.value;
    val = val.replace(/[^0-9]/gm, '');

    let num = `${val.substring(0, 3)} ${val.substring(3, 6)} ${val.substring(6, val.length)}`;
    num = num.trim();
    
    setCustomerData(prev => ({
        ...prev,
        whatsapp: num
    }))
  }

  const onChangeInput = e => setDataForm({...dataForm, [e.target.name]: e.target.value})
 
  const onChangeInputAddress = e => setEndereco({...endereco, [e.target.name]: e.target.value})

  function handleSubmitForms(event) {
    event.preventDefault();
    // Execute the reCAPTCHA when the form is submitted
    recaptchaRef.current.execute();
  }


  const formOptions ={resolver: yupResolver(validationSchema)};
  const { register, handleSubmitValidation, reset, formState}

    // submit form data
 async function sendContact(e,data) {
    e.preventDefault();
    try {
    const validationSchema = Yup.onbect().shape({
        nome: Yup.string().required('Campo obrigátorio'),
        cpf: Yup.string().required('Campo obrigátorio'),
        email: Yup.string().email('Digite um email válido').required('Email é obrigátorio'),
        whatsapp: Yup.string().required('Campo obrigátorio'),
        numero: Yup.string().required('Campo obrigátorio'),
    }); 
     await validationSchema.validate(data, {
         abortEarly: false,
     });
     const res = await fetch('/api/sendpf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: dataForm.nome,
          email: dataForm.email,
          cpf: dataForm.cpf,
          whatsapp: dataForm.whatsapp,
          cep: endereco.cep,
          logradouro: endereco.rua,
          bairro: endereco.bairro,
          uf: endereco.estado,
          ibge: endereco.ibge,
          cidade: endereco.cidade,
          numero: dataForm.numero,
          complemento: dataForm.complemento,
        }),
      })

      const json = await res.json();

      if(res.ok){
        toast({
            title: 'Sucesso!',
            description: "Seus dados foram enviados!",
            status: 'success',
            duration: 3700,
            isClosable: true,
          })
      }else {
        toast({
            title: 'Ops!',
            description: "CPF já cadastrado!",
            status: 'warning',
            duration: 3700,
            isClosable: true,
          })
      }
    } catch (e) {
        console.log(e)
        toast({
            title: 'Error!',
            description:  'ocorreu eu error tente mais tarde',
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
    }finally {
        setEndereco({  
        cep: "",
        rua: "",
        bairro: "",
        cidade: "",
        estado: "",
        ibge: ""
      })  
      setDataForm({
        nome: "",
        email: "",
        whatsapp: "",
        cpf: "",
        numero: "",
        complemento: ""
      });
    }
}

  return (
    <Box my={8} textAlign='left'>
    <AnimatePresence exitBeforeEnter initial={false}>
     <Stack 
     spacing={6} 
     mt={4} 
     direction={['column', 'row']} 
     justifyContent={'center'}
     >
      <Box>
       <Button
       onClick={onClickFisica}
       >Pessoa Fisica
        </Button>
        </Box>
        <Box>
        <Button  
        onClick={onClick} 
        >Pessoa Juridica
        </Button>
        </Box>    
     
        </Stack>
   
    </AnimatePresence>

  {mostrar ||
    <>
    <form onSubmit={sendContact}>

    <Stack 
        spacing={6} 
        mt={4} 
        direction={['column', 'row']}
        >    
        <FormControl>
        <FormLabel >Nome Completo</FormLabel>
        <Input 
        placeholder='Nome Completo'
        _placeholder={{color: 'gray.500'}}
        type={'text'}
        onChange={onChangeInput} 
        name="nome"
        value={dataForm.nome}
        />
        </FormControl>
        <FormControl  >
        <FormLabel >CPF</FormLabel>
        <Input 
        placeholder='CPF'
        _placeholder={{color: 'gray.500'}}
        type={'text'}
        onChange={onChangeInput} 
        value={dataForm.cpf}
        name='cpf'
        id='cpf'
        maxLength={11}
        />   
        </FormControl>
    </Stack>

    <Stack 
    spacing={6} 
    mt={4} 
    direction={['column', 'row']}
    >        
    <FormControl>
     <FormLabel flexDirection={'column'}>E-mail</FormLabel>
     <Input 
      type="email"
      placeholder='email@email.com'
      _placeholder={{color: 'gray.500'}}
      name="email"
      onChange={onChangeInput} 
      value={dataForm.email}
     />   
    </FormControl>

    <FormControl>
     <FormLabel >WhatsApp</FormLabel>
     <Input 
      placeholder='WhatsApp'
      _placeholder={{color: 'gray.500'}}
      type={'tel'}
      name='whatsapp'
      maxLength={'12'}
      onChange={onChangeInput} 
      value={dataForm.whatsapp}
     />
    </FormControl>
    </Stack>
    
    <Stack 
    spacing={6} 
    mt={4} 
    direction={['column', 'row']}
    >
     <FormControl isRequired>
      <FormLabel>Cep</FormLabel>
      <Input 
       placeholder='CEP'
       _placeholder={{color: 'gray.500'}}
       type={'text'}
       onBlur={(e) => {handleDadosCep(e)}}
      />
     </FormControl>   

     <FormControl>
      <FormLabel>Endereço</FormLabel>
      <Input 
       placeholder='Rua'
       _placeholder={{color: 'gray.500'}}
       type={'text'}
       name="rua"
       onChange={onChangeInputAddress} 
       value={endereco.rua}
      />
     </FormControl>

     <HStack>
          <Box  width="100%">
            <FormControl >
            <FormLabel>Numero</FormLabel>
            <Input 
            
              placeholder='Numero'
              _placeholder={{color: 'gray.500'}}
              type={'text'}
              width={'80px'}
              onChange={onChangeInput} 
              value={dataForm.numero}
              name="numero"
            />
            </FormControl>
          </Box>
          <Box  width="100%">
            <FormControl>
              <FormLabel>Complemento</FormLabel>
                <Input 
                  placeholder='Complemento'
                  _placeholder={{color: 'gray.500'}}
                  type={'text'}
                  width={'80px'}
                  onChange={onChangeInput} 
                  value={dataForm.complemento}
                  name="complemento"
                />
            </FormControl>
          </Box>
        </HStack>
      
    </Stack>

    <Stack 
    spacing={6} 
    mt={4} 
    direction={['column', 'row']}
    >
    <FormControl>
      <FormLabel >Bairro</FormLabel>
      <Input 
       placeholder='Bairro'
       _placeholder={{color: 'gray.500'}}
       type={'text'}
       name="bairro"
       onChange={onChangeInputAddress} 
       value={endereco.bairro}
      />
     </FormControl>

     <FormControl>
      <FormLabel >Cidade</FormLabel>
      <Input 
       placeholder='Cidade'
       _placeholder={{color: 'gray.500'}}
       type={'text'}
       name="cidade"
       onChange={onChangeInputAddress} 
       value={endereco.cidade}
      />
     </FormControl>

     <FormControl>
      <FormLabel >UF</FormLabel>
      <Input 
       placeholder='Estado'
       _placeholder={{color: 'gray.500'}}
       type={'text'}
       name="estado"
       onChange={onChangeInputAddress} 
       value={endereco.estado}
      />
      </FormControl>
    </Stack>
    
    <stack>
      <Center>
       <Button 
        mt={4}
        bg={'green.400'}
        color={'white'}
        w="min"
        _hover={{
        bg: 'green.300'
        }}
        type='submit'
        > Enviar</Button>
      </Center>
    </stack>
  </form>
 </>
}

    </Box>
  )
}
 
export default Contact;