import { useEffect, useState } from "preact/hooks";

export default function useUser(
  username: string,
  options: { after: string } = { after: "" },
) {
  const [userData, setUserData] = useState<any>({
    after: "",
    children: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!username) return;

    async function fetchUserPosts() {
      console.log("fetching");
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `https://www.reddit.com/user/${username}/submitted.json?after=${options.after}&include_over_18=true`,
        );

        if (!response.ok) {
          return setError("Network Error: Failed to fetch user posts");
        }

        const json = await response.json();
        const children = json.data.children;

        setUserData({
          after: json.data.after,
          children,
        });
      } catch {
        return setError("Failed to fetch user posts");
      } finally {
        setLoading(false);
      }
    }

    fetchUserPosts();
  }, [username]);

  return {
    userData,
    loading,
    error,
  };
}
