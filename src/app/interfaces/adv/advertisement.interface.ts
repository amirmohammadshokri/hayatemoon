export interface IAdvertisement {
    active: boolean;
    ageOfBuilding: number;
    areaOfBuilding: number;
    byAgency: string;
    city: string;
    class: string;
    companyName: string;
    created_at: string;
    currency: string;
    deposits: string;
    description: string;
    education: string;
    hasImage: boolean;
    id: number;
    images: IImage[];
    jobDescription: string;
    jobName: string;
    jobType: string;
    kilometers: string;
    lang: string;
    manufacturer: string;
    numberOfRooms: number;
    phone: string;
    price: string;
    rent: string;
    requesting: string;
    showcase: string;
    submitted: boolean;
    title: string;
    updated_at: string;
    user: { uid: number };
    vip: string;
    workExperience: string;
    yearOfConstruction: string;
}

export interface IImage {
    created_at: string;
    ext: string;
    hash: string;
    id: number;
    mime: string;
    name: string;
    provider: string;
    provider_metadata: string;
    sha256: string;
    size: string;
    updated_at: string;
    url: string;
}
