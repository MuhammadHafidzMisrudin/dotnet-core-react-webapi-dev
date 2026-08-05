import React, { useState } from "react";
import Constants from "./Utilities/Constants";
import PostCreateForm from "./Components/PostCreateForm";
import "./css/site.css";

function App() {
  
  // initialize state variable for posts to store data.
  const [posts, setPosts] = useState([]);
  const [showingCreateNewPost, setShowingCreateNewPost] = useState(false);

  // function to fetch post data from server.
  const getPosts = () => {
    const URL = Constants.API_URL_GET_ALL_POSTS;

    fetch(URL, {
      method: 'GET',
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      return response.json();
    })
    .then(postsFromServer => {
      console.log("postsFromServer: ", postsFromServer);
      setPosts(postsFromServer);
    })
    .catch((error) => {
      console.log("Error => ", error);
      alert(error);
    });
  }

  // function to render Post table.
  const renderPostsTable = () => {
    return (
      <div className="table-responsive mt-5">
        <table className="table table-bordered border-dark">
          <thead>
            <tr className="table-col-header">
              <th scope="col">PostId (PK)</th>
              <th scope="col">Title</th>
              <th scope="col">Content</th>
              <th scope="col">CRUD Action</th>
            </tr>
          </thead>

          <tbody>

            {posts.map((post) => (
              <tr key={post.postId}>
                <th scope="row">{post.postId}</th>
                <td>{post.title}</td>
                <td>{post.content}</td>
                <td>
                  <button type="button" className="btn btn-dark btn-lg mx-2 my-2">UPDATE</button>
                  <button type="button" className="btn btn-danger btn-lg mx-2 my-2">DELETE</button>
                </td>
              </tr>
            ))}
      
          </tbody>
        </table>

        <button type="button" onClick={() => setPosts([])} className="btn btn-dark btn-lg w-100 mt-2 mb-5">Clear Posts</button>
      </div>
    );
  }

  const onPostCreated = (createdPost) => {
    setShowingCreateNewPost(false);

    if (createdPost === null) {
      console.log("Post creation cancelled.");
      return;
    }

    alert(`Post created successfully! After clicking OK, Title: ${createdPost.title}, Content: ${createdPost.content} will show up in the table.`);

    getPosts();
  }

  return (
    <div className="container">
      <div className="row min-vh-100">
        <div className="col d-flex flex-column justify-content-center align-items-center">
          
          {showingCreateNewPost === false && (
            <div>
              <h1>ASP.NET Core React with Web APIs</h1>

              <div className="mt-5">
                <button type="button" onClick={getPosts} className="btn btn-dark btn-lg w-100">Get Posts From Server!</button>
                <button type="button" onClick={() => setShowingCreateNewPost(true)} className="btn btn-secondary btn-lg w-100 mt-2">Create New Post</button>
              </div>
            </div>
          )}
          

          { (posts.length > 0 && showingCreateNewPost === false) && renderPostsTable() }

          { showingCreateNewPost && <PostCreateForm onPostCreated={onPostCreated} /> }
        </div>
      </div>
    </div>
  );
}

export default App;