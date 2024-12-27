module.exports = {
  apps: [
    {
      name: 'APP NAME', // Name of your app
      script: './src/server.js', // Path to the entry file of your app
      instances: 'max', // Scales app to max available CPUs
      exec_mode: 'cluster', // Use 'cluster' mode for load balancing across CPUs
    },
  ],
};
