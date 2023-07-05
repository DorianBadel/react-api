import MainBody from "../../components/MainBody";
import { useContext } from "react";
import { AuthContext } from "../../api/context/authContext";
import { useForm } from "../../assets/hooks";
import { useMutation } from "@apollo/react-hooks";

import { gql } from "graphql-tag";
import { useNavigate } from "react-router-dom";

//TODO choose between bootrap and MUI
// i assume bootstrap is easier to keep because this will be replaced by Auth0
//yarn remove @mui/material
// import { TextField, Button, Container, Stack, Alert } from "@mui/material";

const LOGIN_USER = gql`
	mutation login($loginInput: LoginInput) {
		loginUser(loginInput: $loginInput) {
			username
		}
	}
`;

function Login() {
	let navigate = useNavigate();
	const context = useContext(AuthContext);
	// const [errors, setErrors] = useState([]);

	function loginUserCallback() {
		loginUser();
	}

	const { /*onChange, onSubmit,*/ values } = useForm(loginUserCallback, {
		username: "",
		password: "",
	});

	const [loginUser /*{ loading }*/] = useMutation(LOGIN_USER, {
		update(_proxy /*,{ data: { loginUser: userData } }*/) {
			context.login(/*userData*/);
			navigate("/");
		},
		onError(/*{ graphQLErrors }*/) {
			//setErrors(graphQLErrors);
			console.log("oops");
		},
		variables: {
			loginInput: values,
		},
	});

	return (
		<MainBody>
			{/* <Container maxWidth="sm">
        <h3>Login</h3>
        <p>Login bellow:</p>
        <Stack spacing={2} paddingBottom={2}>
          <TextField label="Username" name="username" onChange={onChange} />
          <TextField label="Password" name="password" onChange={onChange} />
        </Stack> */}
			{/* {errors.map(function(error){
          return (
            <Alert severity="error">
              {error.message}
            </Alert>
          )
        })} */}

			{/* <Button variant="contained" onClick={onSubmit}>
          Login
        </Button>
      </Container> */}
		</MainBody>
	);
}

export default Login;
