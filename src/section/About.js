
import { Container, Heading, SimpleGrid, Grid, Divider} from '@chakra-ui/react';
import Vendas from '../../public/features/vendas.png'
import ordenServices from '../../public/features/ordem-services.png'
import Financeiro from '../../public/features/Financeiro.png'
import Nfs from '../../public/features/nfs.png'
import Estoque from '../../public/features/estoque.png'
import Integracao from '../../public/features/integracao.png'

import { FeatureGridItem } from '../Components/grid-item'
import { TitleGridItem } from '../Components/grid-item';
const data = [
  {
    id: 1,
    imgSrc: Vendas,
    altText: 'Vendas',
    title: 'Vendas',
    text:
      'Realize e acompanhe suas vendas e seus recebíveis de onde estiver.',
  },
  {
    id: 2,
    imgSrc: Nfs,
    altText: 'Notas Fiscais',
    title: 'Notas Fiscais',
    text:
      'Emita NF-e/NFC-e de forma descomplicada e com poucos cliques.',
  },
  {
    id: 3,
    imgSrc: Estoque,
    altText: 'Estoque',
    title: 'Estoque',
    text:
      'Cadastre os produtos e gerencie seu estoque com rapidez e praticidade.',
  },
  {
    id: 4,
    imgSrc: Financeiro,
    altText: 'Financeiro',
    title: 'Financeiro',
    text:
      'Gerencie seu fluxo de caixa, despesas e receitas em um só lugar.',
  },
    {
    id: 5,
    imgSrc: ordenServices,
    altText: 'Ordem de Serviço',
    title: 'Ordem de Serviço',
    text:
      ' Organize e planeje suas demandas mantendo o fluxo de trabalho sob controle.',
  },
  {
    id: 6,
    imgSrc: Integracao,
    altText: 'Integrações',
    title: 'Integrações',
    text:
      'Tudo isso com integração com WhatsApp, enviando e recebendo informações na palma da sua mão.',
  },
];

export default function Feature() {
  return (
    <section  id='about'>
      <Container 
        maxW={'container.md'}
        minH={'inherit'} 
        mt={14}
      
         >
       <TitleGridItem 
         slogan="CARACTERÍSTICAS DE QUALIDADE"
         title="Recursos úteis incríveis"
       />

       <Grid  mt={10}

        pt={[[0, null, null, null, null, null, 2]]}
        px={[5, 6, 0, null, 7, 8, 7]}
        gridGap={[ '40px 0',
        null,
        '45px 30px',
        null,
        '60px 50px',
        '70px 50px',
        null,
        '80px 90px',]}
        gridTemplateColumns={['repeat(1,1fr)', null, 'repeat(2,1fr)']}
       >
        {data.map((item) =>(
        <FeatureGridItem 
        key={item.id}  
        src={item.imgSrc}
        altText={item.altText}
        title={item.title}
        text={item.text}
        />
        ))}
        </Grid>
       </Container>
    </section>
  );
}

