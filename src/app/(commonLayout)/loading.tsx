import { MedicineSkeleton } from "@/components/modules/medicine/MedicineSkeleton";

export default function Loading() {
  return (
    <div className="container py-10 grid grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <MedicineSkeleton key={i} />
      ))}
    </div>
  );
}
