import { s3Config } from "../config/aws";
import S3FileUpload from 'react-s3';
import {Buffer} from 'buffer';

export const s3FileUpload = (file:Buffer) => {
    window.Buffer = window.Buffer || Buffer;
    return new Promise((resolve, reject) => {
        S3FileUpload
            .uploadFile(file, s3Config)
            .then((data: {location: string}) => {
                resolve(data.location)
            })
            .catch((err: Error) => console.error(err))
    });
}
