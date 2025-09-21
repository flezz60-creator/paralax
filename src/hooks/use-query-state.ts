"use client";

import { useCallback, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface UseQueryStateOptions {
  defaultValue?: string;
  history?: "replace" | "push";
}

export function useQueryState(
  key: string,
  options: UseQueryStateOptions = {}
): [string, (value: string | null) => void, boolean] {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const currentValue = searchParams.get(key) ?? options.defaultValue ?? "";

  const setValue = useCallback(
    (value: string | null) => {
      const nextValue = value ?? "";
      startTransition(() => {
        const params = new URLSearchParams(searchParams.toString());

        if (!nextValue || nextValue === options.defaultValue) {
          params.delete(key);
        } else {
          params.set(key, nextValue);
        }

        const query = params.toString();
        const href = query ? `${pathname}?${query}` : pathname;

        if (options.history === "push") {
          router.push(href, { scroll: false });
        } else {
          router.replace(href, { scroll: false });
        }
      });
    },
    [key, options.defaultValue, options.history, pathname, router, searchParams]
  );

  return [currentValue, setValue, isPending];
}
