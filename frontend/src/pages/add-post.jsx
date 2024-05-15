import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom'; // Import useHistory hook

function AddPost() {
    const history = useHistory(); // Initialize useHistory hook
    const [formData, setFormData] = useState({
        title: '',
        category: '0', // Default category value is set to 'News'
        body: '',
        is_featured: false,
        thumbnail: null,
        errorMessage: '',
        successMessage: ''
    });

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        const val = type === 'checkbox' ? (checked ? '1' : '0') : type === 'file' ? files[0] : name === 'category' ? (value === 'News' ? '0' : '1') : name === 'title' ? value : value;
        setFormData({ ...formData, [name]: val });
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('title', formData.title);
            formDataToSend.append('category', formData.category);
            formDataToSend.append('body', formData.body);
            formDataToSend.append('is_featured', formData.is_featured);
            formDataToSend.append('thumbnail', formData.thumbnail);

            const response = await axios.post('http://localhost/PROJECT/backend/addPost.php', formDataToSend);
            console.log(response.data);
            setFormData({
                ...formData,
                successMessage: 'Post added successfully',
                errorMessage: ''
            });
            
            // Redirect to /admin/manage-post upon successful submission
            history.push('/admin/manage-post');
        } catch (error) {
            console.error('Error adding post:', error);
            setFormData({
                ...formData,
                errorMessage: 'Failed to add post',
                successMessage: ''
            });
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const extension = file.name.split('.').pop().toLowerCase();
            if (extension !== 'png' && extension !== 'jpg') {
                setFormData({
                    ...formData,
                    thumbnail: null,
                    errorMessage: 'File must be a PNG or JPG image',
                    successMessage: ''
                });
            } else {
                setFormData({
                    ...formData,
                    thumbnail: file,
                    errorMessage: '',
                    successMessage: ''
                });
            }
        }
    };

    return (
        <section className="form__section">
            <div className="container form__section-container">
                <h2>Add Post</h2>
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
                <form className="form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                    />
                    <select
                        name="category"
                        value={formData.category === '0' ? 'News' : 'Branches'} // Display correct category value
                        onChange={handleChange}
                    >
                        <option value="News">News</option>
                        <option value="Branches">Branches</option>
                    </select>
                    <textarea
                        rows="10"
                        placeholder="Body"
                        name="body"
                        value={formData.body}
                        onChange={handleChange}
                    ></textarea>
                    <div className="form__control inline">
                        <input
                            type="checkbox"
                            id="is_featured"
                            name="is_featured"
                            checked={formData.is_featured}
                            onChange={handleChange}
                        />
                        <label htmlFor="is_featured">Featured</label>
                    </div>
                    <div className="form__control">
                        <label htmlFor="thumbnail">Add thumbnail</label>
                        <input
                            type="file"
                            id="thumbnail"
                            name="thumbnail"
                            onChange={handleFileChange}
                        />
                    </div>
                    <button type="submit" className="btn">Add Post</button>
                </form>
            </div>
        </section>
    );
}

export default AddPost;
