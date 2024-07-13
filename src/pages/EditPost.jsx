import React, {useState, useEffect} from "react";
import { Container, PostForm } from "../components";
import appwriteService from '../appwrite/db-config';
import { useNavigate, useParams } from "react-router-dom";

function AllPosts() {

    const [posts, setPosts] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post)
                    setPosts(post);
            })
        }
        else
            navigate('/');
    }, [slug, navigate])

    return posts ? (
        <div className="py-8">
            <Container>
                <PostForm post={posts} />
            </Container>
        </div>
    ) : null;
}

export default AllPosts;