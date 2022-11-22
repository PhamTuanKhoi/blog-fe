import Form from "react-bootstrap/Form";

function Signup() {
   return (
      <div className="container">
         {" "}
         <div className="signup">
            <Form.Group className="mb-3" controlId="formBasicEmail">
               <Form.Label>Username</Form.Label>
               <input className="input-all" type="text" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
               <Form.Label>Password</Form.Label>
               <input className="input-all" type="password" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
               <Form.Label>Name</Form.Label>
               <input className="input-all" type="text" />
            </Form.Group>

            <div className="submit">Submit</div>
         </div>
      </div>
   );
}

export default Signup;
