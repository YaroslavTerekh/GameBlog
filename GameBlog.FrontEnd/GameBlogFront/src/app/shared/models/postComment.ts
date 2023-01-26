import { User } from './user';
export interface PostComment {
    commentAuthor: User;
    commentText: string;
    createdTime: string;
}