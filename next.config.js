/** @type {import('next').NextConfig} */

const nextConfig = {
    
    experimental: {
        serverActions: true,
        serverActionsBodySizeLimit: '40mb',
    },
    // module: {
    //     rules: [
    //       // Other rules...
    //       {
    //         test: /\.node$/,
    //         use: 'node-loader',
    //       },
    //     ],
    //   },
    webpack: (config) => {
        config.module.rules.push({
        test: /\.node$/,
        use: 'node-loader',
        });        
        return config;
    },
    // async headers() {
    //     return [
    //         {
    //             // matching all API routes
    //             source: "/api/:path*",
    //             headers: [
    //                 { key: "Access-Control-Allow-Credentials", value: "true" },
    //                 { key: "Access-Control-Allow-Origin", value: "https://checkout.stripe.com" }, // replace this your actual origin
    //                 { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
    //                 { key: "Access-Control-Allow-Headers", value: "Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date" },
    //             ]
    //         }
    //     ]
    // }

}

module.exports = nextConfig
