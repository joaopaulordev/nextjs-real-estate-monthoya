import { Metadata } from 'next';
import RealEstate from './pageClientView';
import { fetcher } from '@/helpers/api';
import { headers } from 'next/headers';

type Props = {
  params: Promise<{ id: string }>;
};

// 1. This function runs on the server and generates the tags WhatsApp needs
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const headersList = await headers();
  
  const data = await fetch(`http://127.0.0.1:8080/imoveis/visualizar/${id}`).then((res) => res.json());

  const host = headersList.get('host');
  
//   const referer = headersList.get('referer');  

  return {
    title: data.imovel.descricao,
    description: data.imovel.sobre_imovel,
    openGraph: {
      title: data.imovel.descricao,
      description: data.imovel.sobre_imovel,
      url: `http://${host}/real-estate/view-real-estate/${id}`,
      siteName: 'Monthoya',      
      images: [
        {
        //   url: `${process.env.NEXT_PUBLIC_API_URL}/${imovel.fotos.filter(foto => foto.capa == true).map(item => (item.caminho))}`,
          url: "http://127.0.0.1:8080/uploads/1-6954a0c2-e5d3-4358-8528-d7c8262fb637.jpeg",
          width: 300,
          height: 300,
        },
      ],
      type: 'article',
    },
  };
}

// 2. Pass any data your client component needs as props
export default async function Page({ params }: Props) {
  const { id } = await params;  
  const data = await fetch(`http://127.0.0.1:8080/imoveis/visualizar/${id}`).then((res) => res.json());
  
  return <RealEstate responseImovel={data.imovel} />;
}