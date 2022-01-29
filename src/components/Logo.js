import Link from 'next/link'
import Image from 'next/image'
import { Text, useColorModeValue } from '@chakra-ui/react'
import styled from '@emotion/styled'

const LogoBox = styled.span`
  font-weight: bold;
  font-size: 1.7rem;
  display: inline-flex;
  align-items: center;
  height: 30px;
  line-height: 20px;
  padding: 10px;
  img {
    transition: 200ms ease;
  }
  &:hover img {
    transform: rotate(20deg);
  }
`

const Logo = () => {
  const logoStart = `/img/medio.png`

  return (
    <Link href="/">
      <a>
        <LogoBox>
          <Image src={logoStart} width={30} height={30} alt="logo" />
          <Text
            color={useColorModeValue('gray.800','whiteAlpha.900')}
            fontFamily='M PLUS Rounded 1c", sans-serif'
            fontWeight="bold"
            ml={3}
            style={{fontSize: '1.6rem', marginTop: '-0.5rem'}}
          >
          start os
          </Text>
        </LogoBox>
      </a>
    </Link>
  )
}

export default Logo