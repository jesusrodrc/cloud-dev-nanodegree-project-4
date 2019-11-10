import * as AWS  from 'aws-sdk'
import {Types} from 'aws-sdk/clients/s3';

export class ImagesAccess {

    constructor(
        private readonly todoBucket = process.env.TODO_S3_BUCKET,
        private readonly s3Client: Types = new AWS.S3({signatureVersion: 'v4'}),
        ) {
      }

      async generateUploadUrl(todoId: string): Promise<string> {
        const url = this.s3Client.getSignedUrl('putObject', {
            Bucket: this.todoBucket,
            Key: todoId,
            Expires: 1000,
        });
        console.log(url);
    
        return url as string;
      }
}