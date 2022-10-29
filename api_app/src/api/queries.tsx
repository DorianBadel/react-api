import { gql} from '@apollo/client';

export const TestQuery = gql`
  query MyQuery {
    test {
      ID
      password
      username
    }
  }
`;

export function ThisUser(id:number){
  const ThisUserQuery = gql`
    query GetUsername {
      user(where: {ID: {_eq: ${id}}}) {
        Username
      }
    }
  `
  return ThisUserQuery;
}

export function ListOfFriends(id:number){
  const LOFQuery = gql`
    query GetFL($uid: Int = ${id}) {
      firends(where: {UID: {_eq: $uid}}) {
        Nickname
        friend {
          ID
          Username
          date_of_birth
        }
      }
    }
  `

  return LOFQuery;
}
