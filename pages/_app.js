import Fonts from '../src/components/Fonts'
import { AnimatePresence } from 'framer-motion'
import Chakra from '../src/components/chakra'

function MyApp({ Component, pageProps }) {
  return( 
    <Chakra cookies={pageProps.cookies}>
     <Fonts/>
     <AnimatePresence exitBeforeEnter initial={true}>
      <Component {...pageProps} />
     </AnimatePresence>
    </Chakra>
   )
}

export default MyApp
