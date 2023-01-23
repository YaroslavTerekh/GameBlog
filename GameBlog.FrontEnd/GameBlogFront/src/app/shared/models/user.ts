import { Image } from './image';
export interface User {
    id: string;
    avatar: Image;
    email: string;
    firstName: string;
    lastName: string; 
    isBanned: boolean;
    aboutMe: string;
    registeredDate: string;
}