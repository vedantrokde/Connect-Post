import * as PostActions from './posts.actions';
import { Post } from '../posts/posts.model';

export interface PostState {
  posts: Post[];
  count: number;
  message: string;
  error: any;
}

const initState: PostState = {
  posts: [],
  count: 0,
  message: '',
  error: null,
};

export function postReducers(
  state = initState,
  action: PostActions.PostActions
) {
  switch (action.type) {
    case PostActions.FETCH_POSTS_SUCCESS:
      return {
        ...state,
        posts: [...action.payload.posts],
        message: action.payload.message,
        count: action.payload.count
      };
      break;
    case PostActions.ADD_POST_SUCCESS:      
      return {
        ...state,
        posts: [...state.posts, action.payload.post],
        message: action.payload.message,
        count: state.count+1
      };
      break;
    case PostActions.UPDATE_POST_SUCCESS:
      const updatedPosts = state.posts.map((post) =>
        post._id === action.payload.post._id
          ? {
              ...post,
              title: action.payload.post.title,
              content: action.payload.post.content,
              imagePath: action.payload.post.imagePath
            }
          : post
      );
      return {
        ...state,
        posts: updatedPosts,
        message: action.payload.message,
      };
      break;
    case PostActions.DELETE_POST_SUCCESS:
      const deletedPosts = state.posts.filter(
        (post) => post._id != action.payload.post._id
      );
      return {
        ...state,
        posts: deletedPosts,
        message: action.payload.message,
        count: state.count-1
      };
      break;
    case PostActions.FETCH_POSTS_ERROR:
    case PostActions.UPDATE_POST_ERROR:
    case PostActions.ADD_POST_ERROR:
    case PostActions.DELETE_POST_ERROR:
      return {
        ...state,
        message: action.payload.message,
        error: action.payload.error
      };
      break;
    default:
      return state;
  }
}
