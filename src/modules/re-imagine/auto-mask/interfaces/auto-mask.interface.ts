export interface AutoMaskDetailsResponse {
    imageUrl: string;
    job_id: string;
    job_status: string;
    masks: MaskItem[];
}

export interface CreateAutoMaskResponse {
    uuid: string;
    jobId: string;
    imageUrl: string;
}

export interface MaskItem {
    name: string;
    url: string;
    center: {
        x: number;
        y: number;
    };
    category: string;
    area_percent: number;
}
