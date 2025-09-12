import { useMemo, useState } from "preact/hooks";

const NAVIGATION_OPTIONS = [
  { label: "Home", href: "/" },
  { label: "Popular", href: "/r/popular" },
];

export default function NavigationMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const currentPath = useMemo(() => globalThis.location?.pathname, []);

  const navigationMenuTriggerContent = currentPath === "/"
    ? "Home"
    : currentPath === "/r/popular"
    ? "Popular"
    : currentPath;

  return (
    <>
      {isOpen && (
        <div
          class="absolute top-10 left-0 w-full h-screen"
          onClick={() => setIsOpen(false)}
        />
      )}
      <div class="relative select-none w-56">
        <div
          class="border border-orange-300 px-4 py-1 rounded-sm"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {navigationMenuTriggerContent}
        </div>

        {isOpen && (
          <div class="absolute left-0 top-[102%] w-full h-auto bg-orange-300">
            {NAVIGATION_OPTIONS.map((option) => (
              <a
                key={option.label}
                href={option.href}
                class="block px-4 py-2 text-left hover:bg-blue-950 hover:text-orange-300 transition"
              >
                {option.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
