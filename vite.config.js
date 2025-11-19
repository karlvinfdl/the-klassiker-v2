import { defineConfig } from "vite";

export default defineConfig({
  base: "/the-klassiker-v2/", // NOM EXACT de ton repo GitHub
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        recrutement: "pages/recrutement.html",
        contact: "pages/contact.html",
      },
    },
  },
});
