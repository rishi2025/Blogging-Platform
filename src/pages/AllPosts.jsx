import React, {useState, useEffect} from "react";
import { Container, PostCard } from "../components";
import appwriteService from '../appwrite/db-config';

function AllPosts() {

    const [post, setPost] = useState([]);

    useEffect(() => {

    }, []);

    appwriteService.getAllPosts([]).then((posts) => {
        if (posts) {
            setPost(posts.documents);
        }
    });

    return (
        <div className="w-full py-8">
            <Container>
                    <div className="flex flex-wrap">
                        {post.map((post) => (
                            <div key={post.$id} className="p-2 w-1/4">
                                <PostCard key={post.$id} post={post} />
                            </div>
                        ))}
                    </div>
            </Container>
        </div>
    );
}

export default AllPosts;