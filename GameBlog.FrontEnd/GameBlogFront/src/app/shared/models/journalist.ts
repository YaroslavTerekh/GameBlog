import { Post } from './post';
import { User } from './user';

export interface Journalist {
    user: User;
    posts: Post[];
}