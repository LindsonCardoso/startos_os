import { ButtonGroup, ButtonGroupProps, IconButton } from '@chakra-ui/react'
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaPhone } from 'react-icons/fa'

export const SocialMediaLinks = () => (
  <ButtonGroup variant="ghost" color="gray.600">
    <IconButton as="a" href="https://www.instagram.com/startos.erp/" target={'_blank'} aria-label="LinkedIn" icon={<FaInstagram fontSize="20px" />} />
    <IconButton as="a" href="#" aria-label="GitHub"   target={'_blank'} icon={<FaGithub fontSize="20px" />} />
    <IconButton as="a" href="https://api.whatsapp.com/send?phone=553888150205" aria-label="Telefone"  target={'_blank'} icon={<FaPhone fontSize="20px" />} />
  </ButtonGroup>
)