import { Post } from './post';
import { User } from './user';

export interface Journalist {
    id: string;
    user: User;
    posts: Post[];
    subscribers: User[];
}