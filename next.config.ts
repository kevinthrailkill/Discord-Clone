import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    webpack: (config) => {
        config.externals.push({
            "utf-8-validate": "commonjs utf-8-validate",
            bufferutil: "commonjs bufferutil",
        })

        return config
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'utfs.io',
                port: '',
                search: '',
            },
            {
                protocol: 'https',
                hostname: 'uploadthing.com',
                port: '',
                search: '',
            },
        ],
    }
    /* config options here */
};

export default nextConfig;
