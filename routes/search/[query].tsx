import { PageProps } from "fresh";
import { define } from "../../utils.ts";
import SearchResultsRenderer from "../../islands/search-results-renderer.tsx";

function SearchPage(props: PageProps) {
  const { query } = props.params;
  const searchParams = new URL(props.url).searchParams;

  return (
    <SearchResultsRenderer
      query={query}
      after={searchParams.get("after") ?? ""}
    />
  );
}

export default define.page(SearchPage);
