import { Input } from '@/components/ui/input';
import { useDebounce } from '@/Hooks/useDebounce';
import {
  useGetAllPosts,
  useInfinitePosts,
  useSearchPosts,
} from '@/lib/react-query/QueriesAndMutatins';
import { GridPostList, Loader, SearchResults } from '@/components/shared';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

const Explore = () => {
  const { data: posts, isLoading } = useGetAllPosts();
  const { ref } = useInView();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfinitePosts({ pageParam: 1 });

  const [searchValue, setSearchValue] = useState('');
  const debouncedValue = useDebounce(searchValue, 500);
  const { data: searchedPost, isFetching: isSearching } =
    useSearchPosts(debouncedValue);

  // Infinite scroll trigger
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 500
      ) {
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (!data) {
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );
  }

  if (isSearching) {
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );
  }

  if (!posts) {
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );
  }

  const showSearchResults = searchValue !== '';
  const showPosts =
    !showSearchResults &&
    posts.pages?.every((item: any) => item.documents.length === 0);

  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <h2 className="h3-bold md:h2-bold w-full">Search Posts</h2>
        <div className="flex gap-1 px-4 w-full rounded-lg bg-dark-4">
          <img
            src="/assets/icons/search.svg"
            alt="search"
            width={24}
            height={24}
          />
          <Input
            type="text"
            name="search"
            placeholder="Search"
            className="explore-search"
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
          />
        </div>
      </div>
      <div className="flex-between w-full max-w-5xl mt-16 mb-7">
        <h2 className="body-bold md:h3-bold">Trending Posts</h2>
        <div className="flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer">
          <p className="small-medium md:base-medium text-light-2">All</p>
          <img
            src="/assets/icons/filter.svg"
            alt="filter"
            width={20}
            height={20}
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-9 w-full max-w-5xl">
        {showSearchResults ? (
          <SearchResults
            isSearching={isSearching}
            searchedPost={searchedPost}
          />
        ) : showPosts ? (
          <p className="text-light-4 mt-10 text-center w-full">End Of Post</p>
        ) : (
          <GridPostList posts={posts} />
        )}
      </div>
      {hasNextPage && !searchValue && (
        <div ref={ref} className="mt-10">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Explore;
