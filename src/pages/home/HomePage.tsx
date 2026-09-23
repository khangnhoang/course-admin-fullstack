import { CircleCheckBig } from "lucide-react";

export function HomePage() {
  return (
    <main className="flex min-h-[calc(100vh-73px)] items-center justify-center bg-white px-6">
      <div className="flex max-w-md flex-col items-center text-center">
        <div className="mb-6 flex size-24 items-center justify-center rounded-full bg-emerald-50">
          <CircleCheckBig
            size={52}
            strokeWidth={1.6}
            className="text-emerald-500"
          />
        </div>

        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
          Everything is okay.
        </h1>

        <p className="mt-3 text-base leading-7 text-slate-500">
          We're still working on this page.
        </p>

        <p className="mt-1 text-sm text-slate-400">
          More things are coming soon.
        </p>
      </div>
    </main>
  );
}