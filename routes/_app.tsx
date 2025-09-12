import NavigationMenu from "../islands/navigation-menu.tsx";
import AutocompleteSearch from "../islands/autocomplete-search.tsx";
import { define } from "../utils.ts";

export default define.page(function App({ Component }) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>watchit</title>
      </head>
      <body>
        <div>
          <nav class="hidden md:sticky z-50 top-0 left-0 md:flex items-center gap-4 w-screen p-4 bg-white/30 backdrop-filter backdrop-blur-lg text-blue-950">
            <a href="/">
              <h1 class="text-2xl font-bold">
                Watch<span class="text-orange-300">IT</span>
              </h1>
            </a>
            <NavigationMenu />
            <AutocompleteSearch />
          </nav>
          <Component />
        </div>
      </body>
    </html>
  );
});
