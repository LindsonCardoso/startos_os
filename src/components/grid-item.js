import Image from 'next/image'
import { Box, Text, Heading } from '@chakra-ui/react'
import { Global } from '@emotion/react'

export function FeatureGridItem({ src, altText = 'default alt text', title, text, }) {
  return (
    <Box display={'flex'} alignItems={'flex-start'} mb={'-1'}>
      <Image
        width={'80%'}
        height={'80%'}
        mr={[2, 3, null, null, 4, 5]}
        ml={-2}
        src={src}
        alt={altText}
        className="grid-item-thumbnail"
        loading="lazy" />
      <Box
        width="100%"
        display='flex'
        flexDirection='column'
        mt='10px'
      >
        <Heading
          fontSize={'1.5rem'}
          color='primary'
          fontWeight={700}
          mb={['10px', null, '15px']}

        >
          {title}
        </Heading>
        <Text
          fontSize={'1rem'}
          fontWeight={400}
          mt={2}
        >{text}</Text>
      </Box>

    </Box>
  )
}

export const TitleGridItem = ({ title, slogan, isWhite}) => (
    <Box mt={'80px'}>
        <Text 
        as='p'
        color={isWhite ? 'white' : 'dark'}
        opacity={isWhite ? 0.7 : 1}
        textAlign={'center'}
        >
        {slogan}
        </Text>
        <Heading 
        as="h2"
        variant={'page-title'}
        color={isWhite ? 'white' : 'heading'}
        textAlign={'center'}
        >

         {title}
        </Heading>
    </Box>

)

export const GridItemStyle = () => (
  <Global
    styles={`
      .grid-item-thumbnail {
        border-radius: 12px;
      }
    `}
  />
)