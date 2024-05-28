/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode:true,
    debug:true,
    images:{
        domains:['avatars.githubusercontent.com','twitter.com','lh3.googleusercontent.com']
      
    }
};

export default nextConfig;
