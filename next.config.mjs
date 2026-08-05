/** @type {import('next').NextConfig} */

import { fileURLToPath } from 'url';
import path from 'path'; 

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig = {
  /* config options here */
  reactCompiler: true,
  transpilePackages: ['three'],
  turbopack: {
    // Sets the root to the current directory or your monorepo root
    root: path.resolve(__dirname, '../../'),
  },
};

export default nextConfig;
