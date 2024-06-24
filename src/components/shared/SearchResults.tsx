import { useUserContext } from '@/lib/context/userContext';
import { IUpdatePost } from '@/types';
import Loader from './Loader';
import GridListPost from './GridPostList';

type DocumentPost = {
  documents: IUpdatePost[];
};

type SearchResultProps = {
  isSearching: boolean;
  searchedPost: DocumentPost | null;
};

const SearchResults = ({ isSearching, searchedPost }: SearchResultProps) => {
  const { user } = useUserContext();

  if (isSearching) {
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );
  }

  if (!searchedPost) {
    return <p>No search results found</p>;
  }

  if (searchedPost && searchedPost && searchedPost.documents?.length > 0) {
    return <GridListPost posts={searchedPost.documents} />;
  }

  if (!user) {
    return <Loader />;
  }

  return (
    <p className="text-light-4 mt-10 text-center w-full">No results Found</p>
  );
};

export default SearchResults;
