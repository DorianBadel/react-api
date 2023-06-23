import { useState, useContext } from "react";
import { AuthContext } from "../../api/context/authContext";
import { useForm } from "../../assets/hooks";
import { useMutation } from "@apollo/react-hooks";

import { gql } from "graphql-tag";
import { useNavigate } from "react-router-dom";

import { TextField, Button, Container, Stack, Alert } from "@mui/material";
import MainBody from "../../components/MainBody";

const REGISTER_USER = gql`
  mutation Mutation($registerInput: RegisterInput) {
    registerUser(registerInput: $registerInput) {
      username
    }
  }
`;

function Register() {
  const context = useContext(AuthContext);
  let navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  function registerUserCallback() {
    console.log("Callback hit");
    registerUser();
  }

  const { onChange, onSubmit, values } = useForm(registerUserCallback, {
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, { data: { registerUser: userData } }) {
      context.login(userData);
      navigate("/");
    },
    onError({ graphQLErrors }) {
      //setErrors(graphQLErrors);
      console.log(graphQLErrors);
    },
    variables: {
      registerInput: values,
    },
  });

  return (
    <MainBody>
      <Container maxWidth="sm">
        <h3>Register</h3>
        <p>Register bellow:</p>
        <Stack spacing={2} paddingBottom={2}>
          <TextField label="Username" name="username" onChange={onChange} />
          <TextField label="Password" name="password" onChange={onChange} />
          <TextField
            label="Confirm password"
            name="confirmPassword"
            onChange={onChange}
          />
        </Stack>

        {/* {errors.map(function(error){
          return (
            <Alert severity="error">
              {error.message}
            </Alert>
          )
        })} */}

        <Button variant="contained" onClick={onSubmit}>
          Register
        </Button>
      </Container>
    </MainBody>
  );
}

export default Register;
