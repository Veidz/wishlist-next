/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        DB_NODE_PORT: process.env.DB_NODE_PORT
    }
}

module.exports = nextConfig
