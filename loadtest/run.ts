import autocannon from "autocannon";

// usage: npm run load -- <url> <connections> <seconds>
const url = process.argv[2] ?? "http://localhost:3000/health";
const connections = Number(process.argv[3] ?? 100);
const duration = Number(process.argv[4] ?? 15);

console.log(`load test: ${url}  connections=${connections}  duration=${duration}s`);

const result = await autocannon({ url, connections, duration });

console.log("\n--- result ---");
console.log(`requests/sec : ${result.requests.average}`);
console.log(`p50 latency  : ${result.latency.p50} ms`);
console.log(`p99 latency  : ${result.latency.p99} ms`);
console.log(`errors       : ${result.errors}`);
console.log(`non-2xx      : ${result.non2xx}`);
