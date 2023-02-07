import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { Link } from "react-router-dom";
import { useUserAuth } from "../auth/UserAuthContext";
import { async } from "@firebase/util";

const PhoneSign = () => {
  const [number, setNumber] = useState("");
  const [error, setError] = useState("");
  const { setUpRecaptcha } = useUserAuth();
  const getoTp = async (e) => {
    e.preventDefault();
    setError("");
    if (number === "" || number === undefined)
      return setError("please enter a valid phone number");
    try {
      const response = await setUpRecaptcha(number);
      console.log(response);
    } catch (err) {
      setError(err.message);
    }
    console.log(number);
  };
  return (
    <>
      <div className="box">
        <h2 className="mb3">Можешь зарегаться через номер</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={getoTp}>
          <Form.Group className="mb3" controlId="formBasicPhoneNumber">
            <PhoneInput
              defaultCountry=""
              value={number}
              onChange={setNumber}
              placeholder="enter your phone number"
            />
            <div id="recaptcha-container" />
          </Form.Group>
          <div className="button-rigth">
            <Link to="/">
              <Button variant="secondary">cancel</Button> &nbsp;
            </Link>
            <Button variant="secondary" type="submit">
              send otp
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default PhoneSign;
///////////ne rabochi code 
// import React, { useState } from "react";
// import { Button, Form, Alert } from "react-bootstrap";
// import PhoneInput from "react-phone-number-input";
// import "react-phone-number-input/style.css";
// import { Link, useNavigate } from "react-router-dom";
// import { useUserAuth } from "../auth/UserAuthContext";

// const PhoneSignUp = () => {
//   const [number, setNumber] = useState("");
//   const [otp, setOtp] = useState("");
//   const [error, setError] = useState("");
//   const { setUpRecaptcha } = useUserAuth();
//   const [flag, setFlag] = useState(false);
//   const [confirmObj, setConfirmObj] = useState("");
//   const navigate = useNavigate();

//   const getOtp = async (e) => {
//     e.preventDefault();
//     setError("");
//     if (number === "" || number === undefined)
//       return setError("please enter a valid phone number");
//     try {
//       const response = await setUpRecaptcha(number);
//       console.log(response);
  //     setConfirmObj(response);
  //     setFlag(true);
  //   } catch (err) {
  //     setError(err.message);
  //   }
  //   console.log(number);
  // };

  // const verifyOtp = async (e) => {
  //   e.preventDefault();
  //   console.log(otp);
  //   if (otp === "" || otp === null) return;
  //   try {
  //     setError("");
  //     await confirmObj.confirm(otp);
  //     navigate("/home");
  //   } catch (err) {
  //     setError(err.message);
  //   }
  // };

  // return (
  //   <>
  //     <div className="p-4 box">
  //       <h2 className="mb-3">Firebase Auth phone</h2>
  //       {error && <Alert variant="danger">{error}</Alert>}
//         <Form onSubmit={getOtp}>
//           <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
//             <PhoneInput
//               defaultCountry="KG"
//               value={number}
//               onChange={setNumber}
//               placeholder="enter your phone"
//             />
//           </Form.Group>
//           <div id="recaptcha-container" />
//           <div className="button-right">
//             <Link to="/">
//               <Button variant="secondary">cancel</Button> &nbsp;
//             </Link>
//             <Button variant="primary" type="submit">
//               send
//             </Button>
//           </div>
//         </Form>

//         <Form onSubmit={verifyOtp}>
//           <Form.Group className="mb-3" controlId="formBasicPhone">
//             <Form.Control>
//               type="text" placeholder="enter" onChange ={""}
//               {(e) => setOtp(e.target.value)}
//             </Form.Control>
//           </Form.Group>
//           <div className="button-right">
//             <Link to="/">
//               <Button variant="secondary">cancel</Button> &nbsp;
//             </Link>
//             <Button variant="primary" type="submit">
//               send
//             </Button>
//           </div>
//         </Form>
//       </div>
//     </>
//   );
// };

// export default PhoneSignUp;
