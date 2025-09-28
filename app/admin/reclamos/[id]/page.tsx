"use client";

import { useParams } from "next/navigation";
import { ReclamoDetalle } from "./components";

export default function ReclamoDetallePage() {
  const { id } = useParams();

  if (!id) return <p>No se encontró el reclamo</p>;

  return <ReclamoDetalle id={id as string} />;
}