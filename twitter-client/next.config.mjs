/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode:true,
    
    images:{
        domains:['avatars.githubusercontent.com','twitter.com','lh3.googleusercontent.com','harshit-twitter-bucket.s3.ap-south-1.amazonaws.com']
      
    }
};

export default nextConfig;
