/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        domains: ['cdn.sanity.io', 'raw.githubusercontent.com', 'appwrite.io'],
    },
}

export default nextConfig;