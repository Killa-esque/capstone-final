import { MDBBreadcrumb, MDBBreadcrumbItem, MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCol, MDBContainer, MDBRow } from 'mdb-react-ui-kit';
import React, { useEffect } from 'react'
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
  console.log(userProfile)
  const [profile, setProfile] = useState(getProfile);

  useEffect(() => {
    disatch(getProfileApi())
  }, [])
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
                  src={arrImage[Math.floor(Math.random() * arrImage.length)]}
                  alt="avatar"
                  className="rounded-circle"  
                  style={{ width: '150px', height:'150px' }}
                  fluid />
                <p className="text-muted mb-1 mt-2">Hi, xin chào các bạn mình là {userProfile?.name} </p>
                <p className="text-muted mb-4">Mình là học viên tại Cybersoft</p>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{userProfile?.name}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{userProfile?.email}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Phone</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{userProfile?.phone}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Carrer</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">Web developer</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Address</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">Ho Chi Minh</MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>

            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  )
}

export default UserProfile;
