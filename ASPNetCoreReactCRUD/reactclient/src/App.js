import React, { useState } from "react";

function App() {
  const renderPostsTable = () =>{
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
          <h1>Hello React Client Side!</h1>

          {renderPostsTable()}
        </div>
      </div>
    </div>
  );
}

export default App;