import { Box, Stack } from '@chakra-ui/react'
import { Copyright } from './Copyright'
import { SocialMediaLinks } from './SocialMedia'

import Logo from '../components/Logo'

function Footer() {
  return (
    <Box as="footer" role="contentinfo" mx="auto" maxW="7xl" py="auto" mt={14} px={{ base: '4', md: '8' }}>
      <Stack>
        <Stack direction="row" spacing="4" align="center" justify="space-between">
          <Logo />
          <SocialMediaLinks />
        </Stack>
        <Copyright alignSelf={{ base: 'center', sm: 'start' }} />
      </Stack>
    </Box>
  )
}

export default Footer