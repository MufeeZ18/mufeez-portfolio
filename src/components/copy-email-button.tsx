"use client";

import { useEffect, useState } from "react";
import { CheckIcon, CopyIcon } from "@/components/icons";

export function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(t);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      // Clipboard unavailable (permissions/insecure context): the mailto link still works.
    }
  };

  return (
    <button type="button" onClick={copy} className="btn btn-ghost">
      {copied ? <CheckIcon width={16} height={16} className="text-cyan" /> : <CopyIcon width={16} height={16} />}
      <span aria-live="polite">{copied ? "Copied" : "Copy address"}</span>
    </button>
  );
}
