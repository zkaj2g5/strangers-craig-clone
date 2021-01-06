import React, { useState } from 'react';
import axiosWithAuth from './utils/axiosWithAuth';
import { Input } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

const CreatePost = () => {
  const [postData, setPostData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
  });

  const [willDeliver, setWillDeliver] = useState(false);

  const history = useHistory();
  postData['willDeliver'] = willDeliver;
  console.log(willDeliver);

  const sendPost = (event) => {
    event.preventDefault();
    axiosWithAuth()
      .post(
        'https://strangers-things.herokuapp.com/api/2007-UNF-RM-WEB-PT/posts',
        { post: postData, willDeliver }
      )
      .then((response) => {
        console.log(response);
        history.push('/');
      })
      .catch((error) => {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      });
  };
  const handleChanges = (event) => {
    if (event.target.name === 'willDeliver') {
      setWillDeliver(event.target.checked);
    }
    console.log(event.target.name);

    setPostData({ ...postData, [event.target.name]: event.target.value });
  };

  console.log('postData', { post: postData });
  return (
    <div className='auth-box create-post send-container'>
      <h1 className='auth-header'>Create Post </h1>
      <div className='flexbox-column'>
        <Input
          className='input'
          name='title'
          value={postData.title}
          onChange={handleChanges}
          icon='info'
          placeholder='Title'
        />
        <Input
          icon='align justify'
          placeholder='Description'
          name='description'
          value={postData.description}
          onChange={handleChanges}
        />
        <Input
          icon='dollar sign'
          placeholder='Price'
          name='price'
          value={postData.price}
          onChange={handleChanges}
        />
        <Input
          icon='map marker'
          placeholder='Location'
          name='location'
          value={postData.location}
          onChange={handleChanges}
        />

        <button className='ui button' onClick={sendPost}>
          Post
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
