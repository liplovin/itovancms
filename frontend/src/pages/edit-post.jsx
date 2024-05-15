import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

function EditPost() {
    const { postId } = useParams();
    const history = useHistory();
    const [formData, setFormData] = useState({
        title: '',
        body: '',
        thumbnail: null,
        errorMessage: '',
        successMessage: ''
    });

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://localhost/PROJECT/backend/fetchPost.php?id=${postId}`);
                const postData = response.data;
                setFormData({
                    title: postData.title,
                    body: postData.body,
                    thumbnail: postData.thumbnail
                });
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        };
        fetchPost();
    }, [postId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, thumbnail: file });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('postId', postId);
            formDataToSend.append('title', formData.title);
            formDataToSend.append('body', formData.body);
            formDataToSend.append('thumbnail', formData.thumbnail);

            const response = await axios.post('http://localhost/PROJECT/backend/updatePost.php', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);
            setFormData({
                ...formData,
                successMessage: 'Post updated successfully',
                errorMessage: ''
            });
            // Redirect to /admin/manage-post upon successful submission
            history.push('/admin/manage-post');
        } catch (error) {
            console.error('Error updating post:', error);
            setFormData({
                ...formData,
                errorMessage: 'Failed to update post',
                successMessage: ''
            });
        }
    };

    return (
        <section className="form__section">
            <div className="container form__section-container">
                <h2>Edit Post</h2>
                {formData.errorMessage && (
                    <div className="alert__message error">
                        <p>{formData.errorMessage}</p>
                    </div>
                )}
                {formData.successMessage && (
                    <div className="alert__message success">
                        <p>{formData.successMessage}</p>
                    </div>
                )}
                <form className="form" onSubmit={handleSubmit} encType="multipart/form-data">
                    <input
                        type="text"
                        placeholder="Title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                    />
                    <textarea
                        rows="10"
                        placeholder="Body"
                        name="body"
                        value={formData.body}
                        onChange={handleChange}
                    ></textarea>
                    <div className="form__control">
                        <label htmlFor="thumbnail">Change thumbnail</label>
                        <input
                            type="file"
                            id="thumbnail"
                            name="thumbnail"
                            onChange={handleFileChange}
                        />
                    </div>
                    <button type="submit" className="btn">Update Post</button>
                </form>
            </div>
        </section>
    );
}

export default EditPost;
