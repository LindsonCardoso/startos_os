import { Text, TextProps } from '@chakra-ui/react'

export const Copyright = () => (
  <Text fontSize="sm" align={'center'} >
    &copy; {new Date().getFullYear()} Start OS | ERP in Cloud. All Rights Reserved.
  </Text>
)