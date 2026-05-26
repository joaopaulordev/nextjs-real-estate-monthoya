type RealEstatePageProps = {
  params: Promise<{
    action: string;
  }>;
};


export default async function RealEstates({ params }: RealEstatePageProps) {
  const { action } = await params;

  return <h1 className="text-2xl font-bold">Página de Imóveis = {action}</h1>
}
