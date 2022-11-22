import { useState } from "react";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { CREATE_USER } from "../redux/gobal";
import { toast } from "react-toastify";

function Signup() {
   const dispatch = useDispatch();
   const [user, setUser] = useState({
      username: "",
      password: "",
      name: "",
   });

   async function handleSubmit() {
      try {
         await dispatch({ type: CREATE_USER, user: { ...user }, toast });
         // toast.success(`Signup success`);
         setUser({
            username: "",
            password: "",
            name: "",
         });
      } catch (error) {
         console.log(error);
      }
   }
   return (
      <div className="container">
         {" "}
         <div className="signup">
            <Form.Group className="mb-3" controlId="formBasicEmail">
               <Form.Label>Username</Form.Label>
               <input
                  onChange={(e) => setUser({ ...user, username: e.target.value })}
                  className="input-all"
                  type="text"
                  value={user.username}
               />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
               <Form.Label>Password</Form.Label>
               <input
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                  className="input-all"
                  type="password"
                  value={user.password}
               />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
               <Form.Label>Name</Form.Label>
               <input
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                  className="input-all"
                  type="text"
                  value={user.name}
               />
            </Form.Group>

            <div className="submit" onClick={handleSubmit}>
               Submit
            </div>
         </div>
      </div>
   );
}

export default Signup;
