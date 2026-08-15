import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const [form, setForm] = useState({ title: "", content: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    console.log("New post:", form);
    // In the real app this would be lifted up to shared state.
    navigate("/posts");
  };

  return (
    <div>
      <h1>Create a Post</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
        />
        <textarea
          name="content"
          placeholder="Content"
          value={form.content}
          onChange={handleChange}
        />
        <button type="submit">Publish</button>
      </form>
    </div>
  );
}

export default CreatePost;
