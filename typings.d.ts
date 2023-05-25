interface SanityDocument {
    _createdAt: string;
    _id: string;
    _rev: string;
    _type: string;
    _updatedAt: string;
}

// Path: src/types/course.ts
export interface Course extends SanityDocument {

    _type: "Courses";
    title: string;
    slug: {
        _type: "slug";
        current: string;
    };
    body: string;
    class: number;
    price: number;
    description: string;
    videos: {
        length: number;
        _key: string;
        _type: "video";
        description: string;
        chapter: number;
        lecture: number;
        mainImage: {
            _type: "image";
            asset: {
                _ref: string;
                _type: "reference";
            };
        };
        title: string;
        video: {
            _key: string;
            _type: "cloudinary.asset";
            access_control: never[];
            access_mode: "public";
            bytes: number;
            created_at: string;
            created_by: {
                _type: "reference";
                _ref: string;
            };
            duration: number;
            format: "mp4";
            height: number;
            metadata: never[];
            public_id: string;
            resource_type: "video";
            secure_url: string;
            tags: never[];
            type: "upload";
            uploaded_by: {
                _type: "reference";
                _ref: string;
            };
            url: string;
            version: number;
            width: number;
        };
    };
    mainImage: {
        _type: "image";
        asset: {
            _ref: string;
            _type: "reference";
        };
    };
    author: {
        _ref: string;
        _type: "reference";
    };
    categories: {
        _key: string;
        _ref: string;
        _type: "reference";
    }[];


};