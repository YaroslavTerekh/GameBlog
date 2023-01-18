import { Image } from './image';
import { Journalist } from './journalist';
import { PostComment } from './postComment';
import { Topic } from './topic';

export interface Post {
    id: string;
    title: string;
    description: string;
    journalist: Journalist;
    topic: Topic;
    comments: PostComment[];
    image: Image;
}