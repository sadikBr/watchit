import { useEffect, useState } from "preact/hooks";

export default function useSearch(
  query: string,
  options: { after: string } = { after: "" },
) {
  const [searchResults, setSearchResults] = useState<any>({
    after: "",
    children: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!query) return;

    async function fetchSearchResults() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `https://www.reddit.com/search/.json?q=${query}&after=${options.after}&include_over_18=true`,
        );

        if (!response.ok) {
          return setError("Network issue, Unable to fetch search results.");
        }

        const json = await response.json();
        const children = json.data.children;

        if (!children) {
          return setError("No search results found.");
        }

        setSearchResults({
          after: json.data.after,
          children,
        });
      } catch {
        return setError("Failed to fetch search results");
      } finally {
        setLoading(false);
      }
    }

    fetchSearchResults();
  }, [query]);

  return {
    searchResults,
    loading,
    error,
  };
}
