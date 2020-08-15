


export default{
    MONGODB_URL: process.env.MONGODB_URL || 'mongodb://127.0.0.1/ecom',
    JWT_SECRET: process.env.JWT_SECRET || 'thisisit',
    PAYPAL_CLIENT_ID:process.env.PAYPAL_CLIENT_ID || 'sb',
    accessKeyId : process.env.accessKeyId || 'accessKeyId',
    secretAccessKey: process.env.secretAccessKey || 'secretAccessKey'
}