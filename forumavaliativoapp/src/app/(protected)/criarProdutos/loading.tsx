import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex w-fit items-center gap-4">
        <Skeleton className="size-10 shrink-0 rounded-full" />
        <div className="grid gap-2">
          <Skeleton className="h-4 w-37.5" />
          <Skeleton className="h-4 w-25" />
        </div>
      </div>
    </div>
  );
}
