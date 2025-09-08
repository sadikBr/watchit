import { useEffect, useRef, useState } from "preact/hooks";

const DEBOUNCE_DELAY = 250;

export default function useAutocomplete(query: string) {
  const [autocompleteSearch, setAutocompleteSearch] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const timeoutId = useRef<number | null>();

  async function fetchAutocompleteSuggestions(query: string) {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://www.reddit.com/search.json?q=${query}&type=sr&limit=10&include_over_18=true`,
      );

      if (!response.ok) {
        return setError(
          `Something went wrong while trying to fetch suggestions for the query ${query}`,
        );
      }

      const data = await response.json();
      const children = data.data?.children;

      if (!children) {
        setAutocompleteSearch([]);
      }

      setAutocompleteSearch(children);
    } catch {
      setError("Something went wrong, please try again later");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (query.length < 3) return;

    if (timeoutId.current) clearTimeout(timeoutId.current);

    timeoutId.current = setTimeout(() => {
      fetchAutocompleteSuggestions(query);
    }, DEBOUNCE_DELAY);

    return () => {
      clearTimeout(timeoutId.current!);
    };
  }, [query]);

  return {
    autocompleteSearch,
    loading,
    error,
  };
}
