export const messages = {
    DATA_FETCHED_SUCCESS: 'Data fetched successfully',
    RECORD_UPDATED_SUCCESS: 'Record has been updated successfully',
    RECORD_CREATED_SUCCESS: 'Record has been created successfully',
    RECORD_DELETED_SUCCESS: 'Record has been deleted successfully',
    RECORD_CREATED_FAILED: 'Failed to create record. Please try again later.',
    RECORD_UPDATED_FAILED: 'Failed to update record. Please try again later.',
    RECORD_DELETED_FAILED: 'Failed to delete record. Please try again later.',
    USER: {
        NOT_FOUND: 'User not found',
        UPDATE: 'User has been updated successfully',
        ALREADY_EXISTS: 'User already exists',
        ROLE_NOT_FOUND: 'Role not found',
        CREATED_SUCCESS: 'User created successfully',
    },
    AUTH: {
        INVALID_API_KEY: 'Invalid API key',
    },
    AUTO_MASK: {
        CREATE_SUCCESS: 'Image auto-masking has started successfully',
        CREATE_FAILED: 'Failed to process the image',
        FETCH_SUCCESS: 'Auto-mask details fetched successfully',
        FETCH_FAILED: 'Failed to retrieve auto-mask details',
        JOB_NOT_FOUND: 'No auto-mask job found for the given job ID',
    },
    GENERATE_IMAGES: {
        CREATE_SUCCESS: 'Image generation has started successfully',
        CREATE_FAILED: 'Failed to generate the image',
        FETCH_SUCCESS: 'Image generation details fetched successfully',
        FETCH_FAILED: 'Failed to retrieve image generation details',
        JOB_NOT_FOUND: 'No image generation job found for the given job ID',
    },
    GOOGLE_MAPS: {
        STREET_VIEW_SUCCESS: 'Street view image fetched successfully',
        STREET_VIEW_FAILED: 'Failed to fetch street view image',
        ADDRESS_NOT_FOUND_OR_INVALID: 'Invalid address or address not found',
        COORDINATES_NOT_FOUND: 'Coordinates not found for the given address',
        IMAGE_UPLOAD_FAILED: 'Failed to upload image to S3',
    },
};
