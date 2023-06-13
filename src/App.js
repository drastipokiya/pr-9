import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Hi = () => {
    const [posts, setPosts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredPosts, setFilteredPosts] = useState([]);

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                setPosts(response.data);
                setFilteredPosts(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        const filtered = posts.filter(post => post.title.toLowerCase().includes(searchTerm.toLowerCase()));
        setFilteredPosts(filtered);
    }, [searchTerm, posts]);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSort = () => {
        const sorted = [...filteredPosts].sort((a, b) => a.title.localeCompare(b.title));
        setFilteredPosts(sorted);
    };

    return (
        <div>
            <input type="text" placeholder="Search" value={searchTerm} onChange={handleSearch} />
            <button onClick={handleSort}>Sort by Title</button>

            {filteredPosts.map(post => (
                <div key={post.id}>
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                </div>
            ))}
        </div>
    );
};

export default Hi;