"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

export function Pagination({ totalPage }: { totalPage: number }) {
  const router = useRouter();
  const params = useSearchParams();
  const page = Number(params.get("page") || 1);

  function goTo(p: number) {
    const q = new URLSearchParams(params.toString());
    q.set("page", String(p));
    router.push(`/?${q}`);
  }

  return (
    <div className="flex justify-center gap-2 mt-8">
      <Button disabled={page === 1} onClick={() => goTo(page - 1)}>
        Prev
      </Button>
      <span className="px-4 py-2">
        {page} / {totalPage}
      </span>
      <Button disabled={page === totalPage} onClick={() => goTo(page + 1)}>
        Next
      </Button>
    </div>
  );
}
