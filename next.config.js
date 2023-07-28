/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
        serverActionsBodySizeLimit: '40mb',
    },
    webpack: (config) => {
        config.module.rules.push({
        test: /\.node/,
        use: 'raw-loader',
        });        
        return config;
    },

}

module.exports = nextConfig
