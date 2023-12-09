/** @type {import('next').NextConfig} */
module.exports = {
    
    images: {
        domains: ['fontmeme.com'],
      },
      
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.module.rules.push({
                test: /\.worker\.js$/,
                loader: 'worker-loader',
                options: {
                    publicPath: '/_next/static/',
                    filename: 'static/[hash].worker.js', // Adjust the filename pattern as needed
                },
            });
        }

        return config;
    },
};
