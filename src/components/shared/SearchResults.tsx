import Loader from './Loader';
import { IUpdatePost } from '@/types';
import GridPostList from './GridPostList';

type SearchResultProps = {
  isSearching: boolean;
  searchedPost: { searchValue: string; posts: IUpdatePost[] };
};

const SearchResults = ({ isSearching, searchedPost }: SearchResultProps) => {
  if (isSearching) {
    return <Loader />;
  }

  if (searchedPost && searchedPost?.posts?.length > 0)
    return <GridPostList posts={searchedPost.posts} />;

  return (
    <p className="text-light-4 mt-10 text-center w-full">No Result Found</p>
  );
};

export default SearchResults;
