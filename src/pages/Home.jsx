import React, { useState, useEffect } from "react";
import appwriteService from '../appwrite/db-config';
import { Container, PostCard, Logo } from "../components";
import blogify from "../images/Blogify.png";

function Home() {

    const [post, setPost] = useState([]);

    useEffect(() => {
        appwriteService.getAllPosts().then((posts) => {
            if (posts) 
                setPost(posts.documents);
        })
    }, [])

    if (!post || post.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container className={"min-h-96"}>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full flex flex-col justify-center">
                            <h1 className="text-2xl font-bold hover:text-gray-700">
                                {post ? "Login to read posts" : "Loading..."}
                            </h1>
                            <Logo src={blogify} width="100px" className="rounded-xl mt-5"/>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className="w-full py-8">
            <Container className={"min-h-96"}>
                <div className='flex flex-wrap'>
                    {
                        post.map((posts) => (
                            <div key={posts.$id} className='p-2 w-1/4'>
                                <PostCard {...posts} />
                            </div>
                        ))
                    }
                </div>
            </Container>
        </div>
    );
}

export default Home;