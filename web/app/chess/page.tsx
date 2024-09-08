import { title } from "@/components/primitives";
import { randomUUID } from 'crypto'
import { redirect } from "next/navigation";

export default function ChessPPage() {
  redirect(`/chess/${randomUUID()}`)
  return (
    <div>
      <h1 className={title()}>Chess</h1>

    </div>
  );
}
