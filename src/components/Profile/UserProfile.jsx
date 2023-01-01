import {
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBCardImage,
  MDBCardText,
  MDBCol,
  MDBContainer,
  MDBRow,
} from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { TextField } from "@mui/material";
import { motion } from 'framer-motion'

import { useFormik } from "formik";
import { toast } from "react-toastify";
// Hook
import { useDispatch, useSelector } from "react-redux";

import { NavLink } from "react-router-dom";

// import async function from redux

import { getStoreJson, USER_PROFILE, USER_LOGIN } from "../../util/config";
import { getProfileApi, updateProfile } from "../../redux/reducers/userReducer";

//Image
import avatar1 from "../../assets/images/avatar1.jpg";
import avatar2 from "../../assets/images/avatar2.jpg";
import avatar3 from "../../assets/images/avatar3.jpg";
import avatar4 from "../../assets/images/avatar4.jpg";
import avatar5 from "../../assets/images/avatar5.jpg";

const arrImage = [avatar1, avatar2, avatar3, avatar4, avatar5];

const UserProfile = () => {
  const disatch = useDispatch();
  const getProfile = getStoreJson(USER_PROFILE);
  const { userProfile } = useSelector((state) => state.userReducer);
  const [profile, setProfile] = useState(getProfile);

  useEffect(() => {
    disatch(getProfileApi())
  }, [])

  useEffect(() => {
    setProfile(getProfile);
  }, [userProfile]);

  const emailLocalStore = getStoreJson(USER_LOGIN)?.email;
  const formik = useFormik({
    initialValues: {
      email: userProfile?.email || '',
      password: userProfile?.password || '',
      name: userProfile?.name || '',
      gender: true,
      phone: userProfile?.phone || '',
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
      name: Yup.string().required("Required"),
      phone: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      try {
        if (values.email === emailLocalStore) {
          console.log(emailLocalStore, values.email)
          disatch(updateProfile(values));
        } else {
          toast.fail("Update profile fail");
        }
      }
      catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <section style={{ backgroundColor: "#eee", padding: "50px 0 0 0" }}>
      <MDBContainer>
        <MDBRow>
          <MDBCol>
            <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
              <MDBBreadcrumbItem>
                <NavLink to="/">Home</NavLink>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem to="/profile" active>
                User Profile
              </MDBBreadcrumbItem>
            </MDBBreadcrumb>
          </MDBCol>
        </MDBRow>

        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4 pb-3">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src={profile?.avatar}
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: "150px", height: "150px" }}
                  fluid
                />
                <p className="text-muted mb-1 mt-2">
                  Hi, xin chào các bạn mình là {formik.values?.name}{" "}
                </p>
                <p className="text-muted mb-4">
                  Mình là học viên tại Cybersoft
                </p>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <form action="" onSubmit={formik.handleSubmit}>
                  <MDBRow style={{ display: 'flex', alignItems: 'center' }}>
                    <MDBCol sm="3">
                      <MDBCardText>Email</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <TextField
                        id="outlined-basic"
                        value={formik.values.email}
                        label="Email"
                        variant="outlined"
                        className="form-control form-control-lg my-2"
                        name="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.errors.email ?? (
                        <p className="text-danger">{formik.errors.email}</p>
                      )}
                    </MDBCol>

                  </MDBRow>
                  <hr />
                  <MDBRow style={{ display: 'flex', alignItems: 'center' }}>
                    <MDBCol sm="3">
                      <MDBCardText>Name</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <TextField
                        id="outlined-basic"
                        value={formik.values.name}
                        label="Username"
                        variant="outlined"
                        className="form-control form-control-lg my-2"
                        name="name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.errors.name ?? (
                        <p className="text-warning">{formik.errors.name}</p>
                      )}
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow style={{ display: 'flex', alignItems: 'center' }}>
                    <MDBCol sm="3">
                      <MDBCardText>Phone</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <TextField
                        id="outlined-basic"
                        value={formik.values.phone}
                        label="Phone Number"
                        variant="outlined"
                        className="form-control form-control-lg my-2"
                        name="phone"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.errors.phone ?? (
                        <p className="text-danger">{formik.errors.phone}</p>
                      )}
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow style={{ display: 'flex', alignItems: 'center' }}>
                    <MDBCol sm="3">
                      <MDBCardText>Password</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <TextField
                        id="outlined-basic"
                        value={formik.values.password}
                        label="Password"
                        variant="outlined"
                        className="form-control form-control-lg my-2"
                        name="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />{" "}
                      {formik.errors.password ?? (
                        <p className="text-danger">{formik.errors.password}</p>
                      )}
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3" style={{ display: 'flex', alignItems: 'center' }}>
                      <MDBCardText>Gender</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            defaultValue="true"
                            onChange={formik.handleChange}
                            defaultChecked
                            type="radio"
                            name="gender"
                            id="inlineRadio1"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="inlineRadio1"
                          >
                            Male
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            onChange={formik.handleChange}
                            type="radio"
                            defaultValue="false"
                            name="gender"
                            id="inlineRadio2"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="inlineRadio2"
                          >
                            Female
                          </label>
                        </div>
                      </div>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="12" style={{ display: 'flex', alignItems: 'center' }}>
                      <motion.button whileTap={{ scale: 1.2 }} type="submit" className="addToCart__btn fs-5 fw-bold">
                        Update
                      </motion.button>
                    </MDBCol>
                  </MDBRow>
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
};

export default UserProfile;
