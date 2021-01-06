import React, { useState, useEffect } from 'react';
import SidebarView from './SidebarView';
import axiosWithAuth from './utils/axiosWithAuth';
import { Card, Input, Icon } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

const Home = (props) => {
  console.log(props);
  const [user, setUser] = useState();
  const [posts, setPosts] = useState();
  const [copyPosts, setCopyPosts] = useState();
  const [search, setSearch] = useState('');

  const history = useHistory();

  const handleChanges = (event) => {
    console.log(event.target.value);
    setSearch(event.target.value);
    console.log(search);
    searchPosts(event.target.value);
  };

  console.log(search);

  const getUserData = () => {
    axiosWithAuth()
      .get(
        'https://strangers-things.herokuapp.com/api/2007-UNF-RM-WEB-PT/users/me'
      )
      .then((response) => {
        console.log(response);
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      });
  };

  const getPosts = () => {
    axiosWithAuth()
      .get(
        'https://strangers-things.herokuapp.com/api/2007-UNF-RM-WEB-PT/posts'
      )
      .then((response) => {
        //console.log("all posts", response);
        setPosts(response.data.data.posts);
        setCopyPosts(response.data.data.posts);
      })
      .catch((error) => {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      });
  };

  const deletePost = (postId) => {
    axiosWithAuth()
      .delete(
        `https://strangers-things.herokuapp.com/api/2007-UNF-RM-WEB-PT/posts/${postId}`
      )
      .then((response) => {
        console.log(response);
        const filteredPost = posts.filter((post) => !post._id.includes(postId));
        setPosts(filteredPost);
      })
      .catch((error) => {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      });
  };

  const sendPost = (postId) => {
    history.push(`/sendmessage/${postId}`);
  };

  const viewMessages = (postId) => {
    history.push(`/view/${postId}`);
  };

  useEffect(() => {
    getUserData();
    getPosts();
  }, []);

  const searchPosts = (term) => {
    console.log('searchfired');
    console.log('searchTerm', term);
    const filteredPosts = copyPosts.filter((post) => {
      return post.title.toLowerCase().includes(term.toLowerCase());
    });
    setPosts(filteredPosts);
    console.log(filteredPosts);
  };

  console.log('username', user);
  console.log('props', props);
  return (
    <>
      {localStorage.getItem('token') ? (
        <div className='flexbox home'>
          <SidebarView />
          <div className='home-content'>
            {user ? <h1>Welcome {user.data.username}</h1> : <h1>Loading </h1>}

            {posts
              ? posts.map((post) => {
                  return (
                    <div className='post' key={post._id}>
                      <Card>
                        <Card.Content style={{ border: '3px solid black' }}>
                          <Card.Header>{post.title}</Card.Header>
                          <Card.Meta>
                            <span className='date'>
                              {post.createdAt.slice(0, 10)}
                            </span>
                          </Card.Meta>
                          <Card.Description className='delete-post'>
                            {post.location}{' '}
                            {post.isAuthor && (
                              <Icon
                                onClick={() => deletePost(post._id)}
                                name='trash'
                              />
                            )}
                            {post.isAuthor && (
                              <Icon
                                onClick={() => viewMessages(post._id)}
                                name='eye'
                              />
                            )}{' '}
                            {!post.isAuthor && (
                              <Icon
                                onClick={() => sendPost(post._id)}
                                name='chat'
                              />
                            )}
                          </Card.Description>
                          {post.price}
                          <div>
                            {post.description.length < 100
                              ? post.description
                              : null}{' '}
                          </div>
                        </Card.Content>
                        <Card.Content></Card.Content>
                      </Card>
                    </div>
                  );
                })
              : null}
          </div>
        </div>
      ) : (
        <div className='flexbox home'>
          <SidebarView />
          <div className='home-content'>
            <div className='search-bar'>
              <Input 
                placeholder='Search'
                value={search}
                onChange={handleChanges}
              />
            </div>
            <div className='post-listings'>
              {posts
                ? posts.map((post) => {
                    return (
                      <div className='post' key={post._id}>
                        <Card>
                          <Card.Content style={{ border: '3px solid' }}>
                            <Card.Header>{post.title}</Card.Header>
                            <Card.Meta>
                              <span className='date'>
                                {post.createdAt.slice(0, 10)}
                              </span>
                            </Card.Meta>
                            <Card.Description>{post.location}</Card.Description>
                            <div className='post-price'>{post.price}</div>
                            <div>
                              {post.description.length < 100
                                ? post.description
                                : null}{' '}
                            </div>
                          </Card.Content>
                          <Card.Content className='post-bottom'></Card.Content>
                        </Card>
                      </div>
                    );
                  })
                : null}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
