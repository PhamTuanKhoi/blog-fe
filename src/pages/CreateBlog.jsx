import Form from "react-bootstrap/Form";
import { Select } from "antd";
import { useState } from "react";
import { useWeb3 } from "../context/useUser";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { CREATE_POST } from "../redux/gobal";

function CreateBlog() {
   const [post, setPost] = useState({
      title: "",
      content: "",
   });
   const [tags, setTags] = useState([]);
   const dispatch = useDispatch();
   const { user } = useWeb3();

   const handleChange = (value) => {
      setTags(value);
   };

   async function handleSubmit() {
      try {
         if (user?._id) {
            await dispatch({ type: CREATE_POST, payload: { ...post, tags, owner: user?._id }, toast });
         }
         setPost({
            title: "",
            content: "",
         });
         setTags([]);
      } catch (error) {
         console.log(error);
      }
   }

   return (
      <div className="container">
         {" "}
         <div className="signup">
            <Form.Group className="mb-3" controlId="formBasicEmail">
               <Form.Label>Title</Form.Label>
               <input
                  value={post.title}
                  onChange={(e) => setPost({ ...post, title: e.target.value })}
                  className="input-all"
                  type="text"
               />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
               <Form.Label>Tag</Form.Label>
               <Select
                  mode="multiple"
                  allowClear
                  style={{ width: "100%" }}
                  placeholder="Please select"
                  value={tags}
                  //   defaultValue={["a10", "c12"]}
                  onChange={handleChange}
                  options={[
                     { label: "magenta", value: "magenta" },
                     { label: "red", value: "red" },
                     { label: "volcano", value: "volcano" },
                     { label: "orange", value: "orange" },
                     { label: "gold", value: "gold" },
                     { label: "lime", value: "lime" },
                  ]}
               />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
               <Form.Label>Content</Form.Label> <br />
               <textarea
                  value={post.content}
                  onChange={(e) => setPost({ ...post, content: e.target.value })}
                  rows="5"
                  style={{ width: "100%" }}
               />
            </Form.Group>

            <div className="submit" onClick={handleSubmit}>
               Submit
            </div>
         </div>
      </div>
   );
}

export default CreateBlog;
