import React, { useState } from 'react'
import Constants from '../Utilities/Constants';

export default function PostCreateForm(props) {
    const initialFormData = Object.freeze({
        title: "Post x",
        content: "This is post x and it has some very interesting content. I have liked the video and subscribed."
    });

    const [formData, setFormData] = useState(initialFormData);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const postToCreate = {
            postId: 0,
            title: formData.title,
            content: formData.content
        };

        const URL = Constants.API_URL_CREATE_POST;

        fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postToCreate)
        }).then(response => {
            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }

            return response.json();
        })
        .then(responseFromServer => {
            console.log("responseFromServer: ", responseFromServer);
        })
        .catch((error) => {
            console.log("Error => ", error);
            alert(error);
        });

        props.onPostCreated(postToCreate);
    };

    return (
        <div className="container mt-5">
            <form className="form-group border border-dark w-100 px-5 rounded">
                <h3 className="text-center mt-3">Create New Post</h3>

                <div className="mt-5">
                    <label htmlFor="postTitle" className="h3 form-label">Post Title</label>
                    <input value={formData.title} name='title' type="text" className="form-control" onChange={handleInputChange} />
                </div>

                <div className="mt-5">
                    <label htmlFor="postContent" className="h3 form-label">Post Content</label>
                    <textarea value={formData.content} name='content' className="form-control" onChange={handleInputChange}></textarea>
                </div>

                <button type="submit" onClick={handleSubmit} className="btn btn-primary btn-lg w-100 mt-5 mb-2">Submit</button>
                <button type="button" onClick={() => props.onPostCreated(null)} className="btn btn-secondary btn-lg w-100 mt-1 mb-5">Cancel</button>
            </form>
        </div>
    );
}
