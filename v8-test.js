
// Show the v8 engine version used by your Node.js installation
console.log("V8 Engine Version:", process.versions.v8);

const v8 = require('v8');
const headStats = v8.getHeapCodeStatistics();

console.log('Head Code Statistics:', headStats);

console.log('Head size limit:', (headStats.head_size_limit / 1024 / 1024).toFixed(2), 'MB');
console.log('Total head size:', (headStats.total_head_size / 1024 / 1024).toFixed(2), 'MB');
console.log('Used head size:', (headStats.used_head_size / 1024 / 1024).toFixed(2), 'MB');