import { gql } from "@apollo/client";

export const TestQuery = gql`
	query MyQuery {
		test {
			ID
			password
			name
		}
	}
`;

export function ThisUser(id: number) {
	const ThisUserQuery = gql`
    query GetUsername {
      users(where: {ID: {_eq: ${id}}}) {
        name
      }
    }
  `;
	return ThisUserQuery;
}

export function ListOfFriends(id: number) {
	const LOFQuery = gql`
    query GetFL($uid: Int = ${id}) {
      friends(where: {UID: {_eq: $uid}}) {
        nickname
        friend {
          ID
          name
          date_of_birth
        }
      }
    }
  `;

	return LOFQuery;
}

export const RegisterInput = gql`
	input RegisterInput {
		username: String
		password: String
		confirmationPassword: String
	}
`;

export const LoginInput = gql`
	input LoginInput {
		username: String
		password: String
	}
`;

export const Mutus = gql`
	type Mutation {
		registerUser(registerInput: RegisterInput): User
		loginUser(loginInput: LoginInput): User
	}
`;

export const Brutus = gql`
	type Query {
		user(id: ID!): User
	}
`;

export const CREATE_USER = gql`
  mutation CreateUser($name: String = "", $date_of_birth: date = "", $UID: Int = 7) {
    insert_users(objects: {date_of_birth: $date_of_birth, name: $name}) {
      returning {
        ID
      }
    }
  }
`;

export const CREATE_FRIEND = gql`
  mutation CreateFriend($UID: Int = 7, $FID: Int = 7, $nickname: String = NULL) {
    insert_friends(objects: {UID: $UID, FID: $FID, nickname: $nickname}) {
      returning {
        ID
      }
    }
  }
`;

{
	/*

https://dev-srckxtyodcjv1xtb.us.auth0.com/authorize?response_type=token&scope=openid%20profile&client_id=eDfMAnTOSV78xBmv8FXRpbiKJ06MCb4j&redirect_uri=http://localhost:3000&connection=Username-Password-Authentication
*/
}
