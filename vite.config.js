export default {
  server: {
    proxy: {
      "/data": "http://localhost:8564",
    },
    port: 8565,
  },
};
