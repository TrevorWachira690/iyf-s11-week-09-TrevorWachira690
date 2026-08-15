import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreatePostForm() {
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
    navigate("/posts");
  };

  return (
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
  );
}

export default CreatePostForm;
