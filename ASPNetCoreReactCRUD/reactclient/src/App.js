import React, { useState } from "react";

function App() {
  // initialize state variable for posts to store data.
  const [posts, setPosts] = useState([]);

  // function to fetch post data from server.
  const getPosts = () => {
    const url = "https://localhost:7048/get-all-posts";

    fetch(url, {
      method: 'GET',
    })
      .then(response => response.json())
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
            <tr>
              <th scope="col">PostId (PK)</th>
              <th scope="col">Title</th>
              <th scope="col">Content</th>
              <th scope="col">CRUD Action</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Post 1 Title</td>
              <td>Post 1 Content</td>
              <td>
                <button className="btn btn-dark btn-lg mx-3 my-3">UPDATE</button>
                <button className="btn btn-danger btn-lg">DELETE</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row min-vh-100">
        <div className="col d-flex flex-column justify-content-center align-items-center">
          <div>
            <h1>ASP.NET Core React with Web APIs</h1>
          </div>

          <div className="mt-5">
            <button onClick={getPosts} className="btn btn-dark btn-lg w-100">Get Posts From Server!</button>
            <button onClick={() => {}} className="btn btn-secondary btn-lg w-100 mt-4">Create New Post</button>
          </div>

          {renderPostsTable()}
        </div>
      </div>
    </div>
  );
}

export default App;