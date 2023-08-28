import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import logo from "../../assets/icon.png";
import axios from "axios";
import { auth, database } from "../../config/firebase";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
  Input,
  Icon,
  Dropdown,
} from "semantic-ui-react";
import { baseURL } from "../../config.json";
import "./index.scss";

const Login = () => {
  let history = useHistory();
  const [Email, setEmail] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const [viewOTP, setViewOTP] = useState(false);
  const [password, setPassword] = useState(null);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);
  const countryCodes = [{ key: "+91", text: "+91", value: "+91" }];

  const handleSubmit = () => {
    setLoading(true);
    // let logged = false;
    auth
      .signInWithEmailAndPassword(Email, password)
      .then((res) => {
        // let temp = [];
        console.log(res);
        const user = auth.currentUser;
        database
          .ref("employees/")
          .orderByChild("email")
          .equalTo(Email.toLowerCase())
          .once("value")
          .then((snapshot) => {
            console.log(snapshot);
            if (snapshot.val() !== null) {
              snapshot.forEach((childSnapshot, index) => {
                console.log(childSnapshot.val());
                // temp.push({ key: childSnapshot.key, ...childSnapshot.val() });
                if (
                  childSnapshot.val().email === Email.toLowerCase() &&
                  childSnapshot.val().phone === password
                ) {
                  setLoading(false);
                  localStorage.setItem("token", childSnapshot.key);
                  history.push("/home");
                } else {
                  setErr("Email or Password Incorrect");
                  setEmail("");
                  setPassword("");
                  setLoading(false);
                }
              });
            } else {
              user
                .delete()
                .then(() => {
                  setEmail("");
                  setPassword("");
                  setErr("User Account Deleted by Admin. Contact Admin");
                  setLoading(false);
                })
                .catch((err) => {
                  setErr(err.message);
                });
            }
          });
      })
      .catch((err) => {
        setErr(err.message);
        setPassword("");
        setLoading(false);
      });
  };

  //

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="black" textAlign="center">
          <Image src={logo} size="large" /> Log-in to your account
        </Header>
        <Form size="large">
          <Segment stacked>
            <Input
              fluid
              className="mobileInput"
              placeholder="Email"
              name="mobile"
              onChange={(e) => {
                setErr(null);
                setOtpSent(false);
                setEmail(e.target.value);
              }}
            />
            <br />

            <Form.Input
              fluid
              icon={
                <Icon
                  name={viewOTP ? "eye" : "eye slash"}
                  link
                  onClick={() => setViewOTP(!viewOTP)}
                />
              }
              iconPosition="right"
              placeholder="Password"
              type={viewOTP ? "text" : "password"}
              onChange={(e) => {
                setErr(null);
                setPassword(e.target.value);
              }}
            />
            <br />

            <Button color="twitter" fluid size="large" onClick={handleSubmit}>
              Login
            </Button>
          </Segment>
        </Form>
        {err && (
          <Message warning>
            <Message.Header>{err}</Message.Header>
            <p>Please try again.</p>
          </Message>
        )}
      </Grid.Column>
    </Grid>
  );
};

export default Login;
