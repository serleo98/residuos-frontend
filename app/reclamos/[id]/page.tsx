import { ReclamoDetalle } from './components';

export default function Page({ params }: { params: { id: string } }) {
  return <ReclamoDetalle id={params.id} />;
}