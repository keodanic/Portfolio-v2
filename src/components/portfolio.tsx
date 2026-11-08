"use client";

import type { Portfolio as Data } from "@/content/data";
import { useVersion } from "./store";
import { VersionSwitcher } from "./switcher";
import { V1 } from "./v1";
import { V2 } from "./v2";
import { V3 } from "./v3";

export function Portfolio({ data }: { data: Data }) {
  const v = useVersion();
  return (
    <div data-v={v} className={`min-h-dvh ${v === 1 ? "scanlines" : ""}`}>
      <div key={v} className="view-in">
        {v === 1 ? <V1 data={data} /> : v === 3 ? <V3 data={data} /> : <V2 data={data} />}
      </div>
      <VersionSwitcher data={data} version={v} />
    </div>
  );
}
