/** @type {import('next').NextConfig} */

import { join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const nextConfig = {
    reactStrictMode: true,
    
    experimental: {
        turbotrace: {
          enabled: true,
        },
        outputFileTracingRoot: join(__dirname, '../../'),
      },
  }
  
export default nextConfig;
