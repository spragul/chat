import React from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";

import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import * as yup from "yup";

import { Link } from "react-router-dom/cjs/react-router-dom";
import { url } from "../App";

//error Schema
const userSchemaValidation = yup.object({
  name: yup.string().required("Please fill in your Name"),
  email: yup.string().required("Please fill in your Email"),
  password: yup.string().required("please write proper password"),
  mobile: yup.string().required("Enter your mobile number"),
});

export function Signup() {
  const history = useHistory();
  //add new user
  const sign = async ({ newuser }) => {
    try {
      const response = await fetch(`${url}/user/signup`, {
        method: "POST",
        body: JSON.stringify(newuser),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      history.push("/login");
      toast.success("User Data Add");
    } catch (error) {
      console.log(error);
      toast.error(`error :${error}`);
    }
  };
  const { values, handleChange, handleSubmit, handleBlur, errors, touched } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        mobile: "",
        password: "",
      },
      validationSchema: userSchemaValidation,
      onSubmit: (newuser) => {
        sign({ newuser });
      },
    });

  return (
    <div className="bg-cl back">
      <MDBContainer fluid style={{ height: "100vh", height: "auto" }}>
        <MDBRow className="d-flex justify-content-center align-items-center h-100">
          <MDBCol col="12">
            <MDBCard
              className="bg-white my-5 mx-auto"
              style={{ borderRadius: "1rem", maxWidth: "500px" }}
            >
              <MDBCardBody className="p-5 w-100 d-flex flex-column">
                <h2 className="fw-bold mb-2 text-center">Signup</h2>
                <p className="text-white-50 mb-3">Please Register Details</p>
                <form onSubmit={handleSubmit} className="text-areas">
                  <MDBInput
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    wrapperClass="mb-4 w-100"
                    label="Name"
                    id="formControlLg"
                    placeholder="Enter your Name"
                    type="text"
                    name="name"
                    size="lg"
                  />
                  {touched.name && errors.name ? (
                    <p style={{ color: "crimson" }}>{errors.name}</p>
                  ) : (
                    ""
                  )}
                  <MDBInput
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.mobile}
                    wrapperClass="mb-4 w-100"
                    label="mobile"
                    id="formControlLg"
                    type="text"
                    name="mobile"
                    placeholder="Enter your mobile number"
                    size="lg"
                  />
                  {touched.mobile && errors.mobile ? (
                    <p style={{ color: "crimson" }}>{errors.mobile}</p>
                  ) : (
                    ""
                  )}
                  <MDBInput
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    wrapperClass="mb-4 w-100"
                    label="Email address"
                    id="formControlLg"
                    type="email"
                    name="email"
                    placeholder="Enter your emailid"
                    size="lg"
                  />
                  {touched.email && errors.email ? (
                    <p style={{ color: "crimson" }}>{errors.email}</p>
                  ) : (
                    ""
                  )}
                  <MDBInput
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    wrapperClass="mb-4 w-100"
                    label="Password"
                    id="formControlLg"
                    type="password"
                    placeholder="Enter your password"
                    name="password"
                    size="lg"
                  />
                  {touched.password && errors.password ? (
                    <p style={{ color: "crimson" }}>{errors.password}</p>
                  ) : (
                    ""
                  )}

                  <MDBBtn type="submit" size="lg">
                    Signup
                  </MDBBtn>
                </form>
                <hr></hr>
                <div>
                  <Link to="/login">Already have an account? Login!</Link>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}
