export default {
  server: {
    proxy: {
      "/data": "http://localhost:8520",
    },
    port: 8521,
  },
};
