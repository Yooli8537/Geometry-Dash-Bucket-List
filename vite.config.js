export default {
  server: {
    proxy: {
      "/data": "http://localhost:6000",
    },
    port: 6001,
  },
};
