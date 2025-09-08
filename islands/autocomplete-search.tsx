import { useMemo, useState } from "preact/hooks";
import useAutocomplete from "../hooks/useAutocomplete.ts";

export default function AutocompleteSearch() {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const { autocompleteSearch, loading, error } = useAutocomplete(query);

  const requiredRenderData = useMemo(() => {
    return autocompleteSearch.map((item) => {
      const data = item.data;

      return {
        display_name: data.display_name,
        title: data.title,
        bannerImgUrl: data.banner_background_image.split("?")[0] ||
          data.banner_img || data.header_img || data.mobile_banner_image,
        iconImg: data.icon_img || data.community_icon.split("?")[0],
        description: data.public_description,
      };
    });
  }, [autocompleteSearch]);

  return (
    <div class="flex-1">
      {isFocused && requiredRenderData.length > 0 && (
        <div
          class="absolute z-49 top-10 left-0 w-screen h-screen"
          onClick={() => setIsFocused(false)}
        />
      )}
      <div class="relative w-full">
        <input
          type="text"
          value={query}
          onInput={(event) => setQuery(event.currentTarget.value)}
          onFocus={() => setIsFocused(true)}
          placeholder="Search ..."
          class="w-full border border-orange-300 px-2 py-1 rounded-sm"
        />

        {isFocused && query && (
          <div class="absolute z-50 text-white left-0 top-[105%] w-full bg-blue-950">
            <a
              href={`http://localhost:5173/search?query=${query}`}
              class="block px-2 py-6 bg-blue-950 hover:bg-blue-800 transition"
            >
              Search for: {query}
            </a>

            <div class="flex flex-col gap-1 w-full">
              {loading
                ? (
                  <div class="px-2 py-4 bg-blue-950">
                    <div class="flex items-center gap-2">
                      <div class="w-16 aspect-square rounded-full bg-white shrink-0" />
                      <div class="flex flex-col w-full gap-1">
                        <div class="w-[40%] h-8 bg-gray-300" />
                        <div class="w-[80%] h-12 bg-gray-300" />
                      </div>
                    </div>
                  </div>
                )
                : error.length > 0
                ? <div class="px-2 py-4 bg-blue-950">{error}</div>
                : requiredRenderData.length > 0 && !loading &&
                  requiredRenderData.map((item) => (
                    <a
                      class="block px-2 py-4 bg-blue-950 hover:bg-blue-800 transition"
                      href={`http://localhost:5173/r/${item.display_name}`}
                    >
                      <div class="flex items-center gap-2">
                        <img
                          src={item.iconImg}
                          alt="icon"
                          class="w-16 aspect-square rounded-full bg-white shrink-0"
                        />
                        <div class="flex flex-col gap-1">
                          <h1 class="text-md font-semibold text-orange-300">
                            {item.display_name} - {item.title}
                          </h1>
                          <p class="text-sm text-gray-300">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </a>
                  ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
