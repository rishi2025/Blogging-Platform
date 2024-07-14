import React, {useState, useEffect} from "react";
import { Container, PostCard } from "../components";
import appwriteService from '../appwrite/db-config';

function AllPosts() {

    const [post, setPost] = useState([]);

    appwriteService.getAllPosts().then((posts) => {
        if (posts) {
            setPost(posts.documents);
        }
    });

    return (
        <div className="w-full py-8">
            <Container>
                    <div className="flex flex-wrap">
                        {post.map((postData) => (
                            <div key={postData.$id} className="p-2 w-1/4">
                                <PostCard key={postData.$id} {...postData} />
                            </div>
                        ))}
                    </div>
            </Container>
        </div>
    );
}

export default AllPosts;