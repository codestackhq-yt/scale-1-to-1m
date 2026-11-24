import { monitorEventLoopDelay } from "node:perf_hooks";
import { pool } from "./db";

// Metrics are off unless you start the server with METRICS=1
const ENABLED = process.env.METRICS === "1";

// event loop delay: how long Node.js takes to get back to waiting work
const loop = monitorEventLoopDelay({ resolution: 10 });

let count = 0;
let totalMs = 0;
let maxMs = 0;

export function recordQuery(ms: number) {
  if (!ENABLED) return;
  count++;
  totalMs += ms;
  if (ms > maxMs) maxMs = ms;
}

if (ENABLED) {
  loop.enable();

  setInterval(() => {
    console.log({
      queries: count,
      avgQueryMs: count ? +(totalMs / count).toFixed(2) : 0,
      maxQueryMs: +maxMs.toFixed(2),
      poolTotal: pool.totalCount,
      poolIdle: pool.idleCount,
      poolWaiting: pool.waitingCount,
      loopMeanMs: +(loop.mean / 1e6).toFixed(2),
      loopP99Ms: +(loop.percentile(99) / 1e6).toFixed(2),
    });
    count = 0;
    totalMs = 0;
    maxMs = 0;
    loop.reset();
  }, 10000);
}