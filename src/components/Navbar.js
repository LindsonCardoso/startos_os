import Logo from './Logo'
import NextLink from 'next/link'
import { 
    Container,
    Box, 
    Link,
    Stack,
    Heading,
    Flex,
    Menu,
    MenuItem,
    MenuList,
    MenuButton,
    IconButton,
    useColorModeValue
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import ThemeToggleButton from './theme-toggle-button'

const LinkItem = ({href, path, children, ...props}) => {

    const active = path === href
    const inactiveColor = useColorModeValue('gray200', 'whiteAlpha.900')
      return (
          <NextLink href={href} passHref>
             <Link 
              p={2} 
              bg={active ? 'grassTeal' : undefined}
              color={active ? '#202023' : inactiveColor}
              {...props}>
              {children}
             </Link> 
          </NextLink>
      )
  }
  
  const Navbar = props => {
    const {path} = props

   return (
    <Box
      position="fixed"
      as="nav"
      w="100%"
      bg={useColorModeValue('#ffffff40', '#20202380')}
      css={{ backdropFilter: 'blur(10px)' }}
      zIndex={1}
      {...props}
    >
     <Container 
        display="flex"
        p={2}
        maxW="container.md"
        wrap="wrap"
        align="center"
        justify="space-between">
          
          <Flex align="center" mr={5}>
              <Heading as="h1" size="sm" letterSpacing={'tighter'}>
                <Logo/>
              </Heading>
          </Flex>

          <Stack
            direction={{ base: 'column', md: 'row' }}
            display={{ base: 'none', md: 'flex' }}
            width={{ base: 'full', md: 'auto' }}
            alignItems="center"
            flexGrow={1}
            mt={{ base: 4, md: 0 }}
            style={{marginTop: '-0.3rem'}}
          
          >
            <LinkItem href="#inicio" path={path}>
             Sobre
            </LinkItem>
                
            <LinkItem href="#about" path={path}>
            Funcionalidades
            </LinkItem>  
            <LinkItem href="#plans" path={path}>
             Planos e Preços
            </LinkItem>  
            <LinkItem href="#contact" path={path}>
             Solicitar um acesso
            </LinkItem>
          </Stack>

        <Box 
        flex={1}
        align="right">
           <ThemeToggleButton/>
            <Box ml={2} display={{base: 'inline-block', md: 'none'}}>
             <Menu>
               <MenuButton as={IconButton} icon={<HamburgerIcon/>} 
               variant="outline" aria-label="Options"/>
                <MenuList>
                  <NextLink href="#inicio" passHref>
                      <MenuItem as={Link}>Sobre</MenuItem> 
                  </NextLink>  
                  <NextLink href="#about" passHref>
                      <MenuItem as={Link}>Funcionalidades</MenuItem> 
                  </NextLink>  
                  <NextLink href="#contact" passHref>
                      <MenuItem as={Link}>Planos</MenuItem> 
                  </NextLink>  
                  <NextLink href="#contact" passHref>
                      <MenuItem as={Link}>Solicitar uma acesso</MenuItem> 
                  </NextLink>  
                    <MenuItem as={Link} href="">
                    </MenuItem> 
                </MenuList>
             </Menu>   
            </Box>
        </Box>

      </Container>
    </Box>   
   ) 

}



export default Navbar