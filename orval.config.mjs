import { defineConfig } from 'orval';

export default defineConfig({
  api: {
    input: {
      target: 'http://localhost:4000/openapi.json',
    },
    output: {
      target: './src/api/generated/types.ts',
      httpClient: 'axios',
      clean: true,
      override: {
        mutator: {
          path: './src/api/axios-instance.ts',
          name: 'customAxiosInstance',
        },
        enumGenerationType: 'enum',
      },
    },
  },
});
