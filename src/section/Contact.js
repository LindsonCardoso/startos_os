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
import ReCAPTCHA from 'react-google-recaptcha'
import Axios from 'axios';
import * as Yup from 'yup';
import InputMask from '../components/InputMask'
import { cnpjMask } from '../components/InputMask/cnpjMask'
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

const [dataForm, setDataForm] = useState({
  nome: "",
  email: "",
  whatsapp: "",
  cpf: "",
  numero: "",
  complemento: ""
});

const [dataFormPJ, setDataFormPJ] = useState({
  nomeFantasia: "",
  razaoSocial: "",
  emailPj: "",
  whatsappPj: "",
  cnpj: "",
  ie: "",
  numeroPj: "",
  complementoPj: ""
  });

const [mostrar, setMostrar] = useState(false);
const onClickFisica = () => setMostrar(false);
const onClick = () => setMostrar(true);
const formRef = useRef(null)
const [submitting, setSubmitting] = useState(false);
const toast = useToast();
const recaptchaRef = React.useRef(null);

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


const [statusPJ, setStatusPJ] = useState({
    type: '',
    mensagem: ''
  });
  

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
 
  const onChangeInputPJ = e => setDataFormPJ({...dataFormPJ, [e.target.name]: e.target.value})
 
  const onChangeInputAddress = e => setEndereco({...endereco, [e.target.name]: e.target.value})

  function handleSubmit(e) {
    e.preventDefault();
    // Execute the reCAPTCHA when the form is submitted
    recaptchaRef.current.execute();
  }

  function validate(){

    if(!dataForm.nome) return setStatus({type: 'error', mensagem: 'Ops! Necessário preencher o campo Nome Completo!'});
    //if(dataForm.cpf.length >= 11) return setStatus({type: 'error', mensagem: 'Ops! O Campo CPF precisa ter pelo menos 11 caracteres!'});
    if(!dataForm.email) return setStatus({type: 'error', mensagem: 'Ops!: Necessário preencher o campo E-mail!'});
    if(!dataForm.whatsapp) return setStatus({type: 'error', mensagem: 'Ops!: Necessário preencher o campo whatsApp!'});

    return true;
}


function validatePJ(){
    if(!dataFormPJ.razaoSocial) return setStatus({type: 'error', mensagem: 'Ops! Necessário preencher o campo Razao Social!'});
      if(!dataFormPJ.emailPj) return setStatus({type: 'error', mensagem: 'Ops!: Necessário preencher o campo E-mail!'});
    if(!dataFormPJ.whatsappPj) return setStatus({type: 'error', mensagem: 'Ops!: Necessário preencher o campo whatsApp!'});

    return true;
}

  
    // submit form data
async function sendContact(captchaCode) {
    if(!validate()) return;
    if(!captchaCode) {
      return;
    }
    setSubmitting(true)
    const cpfNoMask = dataForm.cpf.replace(/[^\d]+/g,'');
    const whatsAppNoMask = dataForm.whatsapp.replace(/[^\d]+/g,'');

    try {
     const res = await fetch('/api/sendpf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            nome: dataForm.nome,
            email: dataForm.email,
            cpf: cpfNoMask,
            whatsapp: whatsAppNoMask,
            cep: endereco.cep,
            logradouro: endereco.rua,
            bairro: endereco.bairro,
            uf: endereco.estado,
            ibge: endereco.ibge,
            cidade: endereco.cidade,
            numero: dataForm.numero,
            complemento: dataForm.complemento,
            captcha: captchaCode
        }),
      })
      setSubmitting(false)
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
    } catch (err) {
      
            toast({
                title: 'Error!',
                description:  'Ocorreu um erro, tente mais tarde',
                status: 'error',
                duration: 9000,
                isClosable: true,
              })
    }finally {
       recaptchaRef.current.reset();
        setStatus({
        type: '',
        mensagem: ''
      });
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

async function sendContactPJ(captchaCode) {
  if(!captchaCode) {
    return;
  }
    setSubmitting(true)
    const CnpjNoMask = dataFormPJ.cnpj.replace(/[^\d]+/g,'');
    const WhatsAppNoMask = dataFormPJ.whatsappPj.replace(/[^\d]+/g,'');
    const IeNoMask = dataFormPJ.ie.replace(/[^\d]+/g,'');
    try {
     const res = await fetch('/api/sendpj', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            nomeFantasia: dataFormPJ.nomeFantasia,
            razaoSocial: dataFormPJ.razaoSocial,
            email: dataFormPJ.emailPj,
            cnpj: CnpjNoMask,
            ie: IeNoMask,
            whatsapp: WhatsAppNoMask,
            cep: endereco.cep,
            logradouro: endereco.rua,
            bairro: endereco.bairro,
            uf: endereco.estado,
            ibge: endereco.ibge,
            cidade: endereco.cidade,
            numero: dataFormPJ.numeroPj,
            complemento: dataFormPJ.complementoPj,
            captcha: captchaCode
        }),
      })
      setSubmitting(false)
      const json = await res.json();
      if(res.ok){
        toast({
            title: 'Sucesso!',
            description: "Seus dados foram enviados!",
            status: 'success',
            duration: 4000,
            isClosable: true,
          })
      }else {
        toast({
            title: 'Ops!',
            description: "CPF já cadastrado!",
            status: 'warning',
            duration: 4500,
            isClosable: true,
          })
      }
    } catch (err) {
      
            toast({
                title: 'Error!',
                description:  'Ocorreu um erro, tente mais tarde',
                status: 'error',
                duration: 9000,
                isClosable: true,
              })
    }finally {
      recaptchaRef.current.reset();
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
      setDataFormPJ({
        nomeFantasia: "",
        razaoSocial: "",
        emailPj: "",
        whatsappPj: "",
        cnpj: "",
        ie: "",
        numeroPj: "",
        complementoPj: "",
      });
      
    }
}

  return (
    <Box my={8} textAlign='left'   id='contact'>
   
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

    <Divider orientation='horizontal'   mt={4}  />
    {status.type === 'success' ?<Center bg='tomato' color='white'><Heading style={{ color: "green", textAlign:"center"  }}>{status.mensagem}</Heading></Center> : ""}
    {status.type === 'error' ?  <Center marginTop={'1.5'}> <Text color='red.500' fontSize='lg' isTruncated>{status.mensagem}</Text></Center> : ""}
      
    
    {mostrar ||
    <>

    <form 
     onSubmit={handleSubmit}
    >

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

        <FormControl>
        <FormLabel >CPF</FormLabel>
        <InputMask 
         placeholder='999.999.999-99'
         mask='cpf'
         onChange={onChangeInput} 
         value={dataForm.cpf}
         name='cpf'
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
     <InputMask 
      placeholder='99 9 9999-9999'
      mask='tel'
      name='whatsapp'
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
    <ReCAPTCHA
      ref={recaptchaRef}
      size="invisible"
      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
      onChange={sendContact}
    />
    <Stack>
      <Center>
       <Button 
        mt={4}
        bg={'green.400'}
        color={'white'}
        w={'auto'}    
        _hover={{
        bg: 'green.400'
        }}
        disabled={submitting}
        type='submit'
        >{submitting ? 'Enviando ...' : 'Enviar'}</Button>
      </Center>
    </Stack>
    </form>
    </>
    }

    {mostrar &&
    <>
    <form 
     onSubmit={handleSubmit}
    >
    <Stack 
        spacing={6} 
        mt={4} 
        direction={['column', 'row']}
        >    
        <FormControl>
        <FormLabel >Nome Fantásia</FormLabel>
        <Input 
        placeholder='Nome Fantasia'
        _placeholder={{color: 'gray.500'}}
        type={'text'}
        onChange={onChangeInputPJ} 
        name="nomeFantasia"
        value={dataFormPJ.nomeFantasia}
        />
        </FormControl>

        <FormControl>
        <FormLabel >Razão Social</FormLabel>
        <Input 
        placeholder='Razão Social'
        _placeholder={{color: 'gray.500'}}
        type={'text'}
        onChange={onChangeInputPJ} 
        name="razaoSocial"
        value={dataFormPJ.razaoSocial}
        />   
  
     </FormControl>
    </Stack>

    <Stack 
    spacing={6} 
    mt={4} 
    direction={['column', 'row']}
    >        

    <FormControl>
     <FormLabel >CNPJ</FormLabel>
    <Input 
       placeholder='99.999.999./9999-99'
      onChange={onChangeInputPJ}
      value={cnpjMask(dataFormPJ.cnpj)} 
      name='cnpj'
    />   
    </FormControl>

    <FormControl>
     <FormLabel flexDirection={'column'}>Inscrição Estadual</FormLabel>
     <InputMask 
      placeholder='Inscrição estadual'
      name='ie'
      onChange={onChangeInputPJ} 
      value={dataFormPJ.ie}
     />
    </FormControl>
    </Stack>

    <Stack 
    spacing={6} 
    mt={4} 
    direction={['column', 'row']}
    >        

    <FormControl required>
     <FormLabel >E-mail</FormLabel>
     <Input 
      placeholder='email@email.com'
      name='emailPj'
      onChange={onChangeInputPJ} 
      value={dataFormPJ.emailPj}
     />
    </FormControl>

    <FormControl>
     <FormLabel flexDirection={'column'}>WhatsApp</FormLabel>
     <InputMask 
      placeholder='99 9 99999999'
      mask='tel'
      name='whatsappPj'
      onChange={onChangeInputPJ} 
      value={dataFormPJ.whatsappPj}
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
            required
              placeholder='Numero'
              _placeholder={{color: 'gray.500'}}
              type={'text'}
              width={'80px'}
              onChange={onChangeInputPJ} 
              value={dataFormPJ.numeroPj}
              name="numeroPj"
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
                  onChange={onChangeInputPJ} 
                  value={dataFormPJ.complementoPj}
                  name="complementoPj"
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
    <ReCAPTCHA
      ref={recaptchaRef}
      size="invisible"
      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
      onChange={sendContactPJ}
    />
    <Stack>
      <Center>
       <Button 
        mt={4}
        bg={'green.400'}
        color={'white'}
        w={'auto'}    
        _hover={{
        bg: 'green.400'
        }}
        disabled={submitting}
        type='submit'
        >{submitting ? 'Enviando ...' : 'Enviar'}</Button>
      </Center>
    </Stack>

    </form>
    </>
    }
    </Box>
  )
}
 
export default Contact;