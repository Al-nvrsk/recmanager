import React = require('react');
declare global {
    const __SERVER_PORT__: number;
    const __SERVER_URL__: string;
    const __IS_DEV__: boolean;
    const __S3_KEY_ID__: string;
    const __S3_SECRET_KEY__: string;
}

export {};


