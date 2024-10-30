/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['cdn.builder.io'],
      dangerouslyAllowSVG: true, // Habilita la carga de SVGs
    },
  };
  
  export default nextConfig;
  