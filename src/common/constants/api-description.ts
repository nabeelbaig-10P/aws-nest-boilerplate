export const descriptions = {
    USER: {
        GET_PREFERENCES: 'This API endpoint retrieves the preferences of the authenticated user',
        UPDATE_PREFERENCES:
            'This API endpoint allows users to update their preferences, such as theme settings. The user must be authenticated to update their preferences.',
        GET_ONBOARDING_STATUS:
            'This API endpoint retrieves the onboarding status of the authenticated user, indicating whether the onboarding has been completed.',
        WEBHOOK_POST_SIGNUP:
            'This API endpoint handles post-signup actions for users, ensuring that the provided username, email, and cognitoId are unique, and then creates a new user if they are not already existing in the database. This API will be called in a post-confirmation Lambda function, which triggers when a user creates a new account.',
        GET_USER_DETAILS: 'This API endpoint retrieves user details',
    },
    AUTO_MASK: {
        CREATE: 'This API endpoint creates an auto-mask job for the authenticated user, allowing them to upload an image and receive a masked version of it.',
        FETCH: 'This API endpoint retrieves the details of an auto-mask job using the provided job ID.',
    },
    GENERATE_IMAGES: {
        CREATE: 'This API endpoint creates an image generation job for the authenticated user, allowing them to upload an image with their masking array, styles and additional prompt and receive a generated re-imagine version of it.',
        FETCH: 'This API endpoint retrieves the details of an image generation job using the provided uuid.',
    },
    GOOGLE_MAPS: {
        STREET_VIEW:
            'This API endpoint retrieves a street view image from Google Maps based on the provided address. The user must be authenticated to access this endpoint.',
    },
    GARDEN_STYLES: {
        FETCH: 'This API endpoint retrieves all the garden styles.',
    },
    YARD_TYPES: {
        FETCH: 'This API endpoint retrieves all the yard types.',
    },
};
