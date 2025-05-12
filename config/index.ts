interface Config {
    port: number;
    apiKey: string;
    cognito: {
        authorityUrl: string;
        appClientId: string;
    };
    reImagine: {
        apiKey: string;
        baseUrl: string;
    };
    googleMaps: {
        apiKey: string;
    };
    aws: {
        s3BucketName: string;
        region: string;
        profile: string;
    };
}

export default (): Config => ({
    port: Number(process.env.PORT) || 80,
    apiKey: String(process.env.API_KEY),
    cognito: {
        authorityUrl: String(process.env.COGNITO_AUTHORITY_URL),
        appClientId: String(process.env.COGNITO_USER_POOL_CLIENT_ID),
    },
    reImagine: {
        apiKey: String(process.env.RE_IMAGINE_API_KEY),
        baseUrl: String(process.env.RE_IMAGINE_BASE_URL),
    },
    googleMaps: {
        apiKey: String(process.env.GOOGLE_MAPS_API_KEY),
    },
    aws: {
        s3BucketName: String(process.env.AWS_S3_BUCKET),
        region: String(process.env.AWS_REGION),
        profile: String(process.env.AWS_PROFILE),
    },
});
