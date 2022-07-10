const aws = require('aws-sdk');
const crypto =  require('crypto');
const { promisify } = require("util");
const randomBytes = promisify(crypto.randomBytes)

const region = "us-west-2"
const bucketName = process.env.BUCKET_NAME
const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

const s3 = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: 'v4'
  })
  
exports.postMedia=async(req,res)=>{
    try {
        const rawBytes = await randomBytes(16)
        const imageName = rawBytes.toString('hex')
        const params = ({
          Bucket: bucketName,
          Key: imageName,
          Expires: 60
        })
        const uploadURL = await s3.getSignedUrlPromise('putObject', params)
        res.json({url:uploadURL});
    } catch (err) {
        console.log(err);
        res.sendStatus(500)
    }
}