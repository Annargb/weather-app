/* eslint-disable @typescript-eslint/no-var-requires */

const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: ["vuetify"],
  css: {
    loaderOptions: {
      sass: {
        additionalData: "@import '@/assets/variables.scss'",
      },
      scss: {
        additionalData: "@import '@/assets/variables.scss';",
      },
    },
  },
});
