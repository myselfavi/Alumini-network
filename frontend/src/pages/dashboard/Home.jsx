import CreatePost from "../../components/CreatePost";
import Post from "../../components/Post";
import SearchBar from "../../components/SearchBar";
import useApi from "../../hooks/useApi";
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import { useAuthContext } from "../../contexts/useAuthContext";

function Home() {
    const { user } = useAuthContext();
    const api = useApi();

    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await api.get("/api/post");
                console.log(response);
                setPosts(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-full space-y-4">
                <Loader className="animate-spin" size={32} /> {/* Lucide loader icon */}
                <span className="text-gray-500">Loading...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-full space-y-4 text-red-500">
                Error: {error.message}
            </div>
        );
    }

    return (
        <section className="flex flex-col items-center size-full space-y-6">
            <SearchBar />
            {user.type === "alumni" && (
                <CreatePost
                    onPostCreated={(post) => setPosts([post, ...posts])}
                    className="mb-6"
                />
            )}
            <div className="flex flex-col space-y-6 w-full">
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <Post
                            key={post._id}
                            post={post}
                            onDelete={() => {
                                console.log("delete " + post._id);
                                setPosts((prev) =>
                                    prev.filter((p) => p._id !== post._id)
                                );
                            }}
                        />
                    ))
                ) : (
                    <div className="text-gray-500">
                        No posts available
                    </div>
                )}
            </  div>
        </section>
    );
}

export default Home;


