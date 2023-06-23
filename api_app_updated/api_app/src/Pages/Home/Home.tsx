//import { useMyQueryQuery } from '../utils/__generated__/graphql'
import { useQuery } from "@apollo/client";
import MainPage from "../../components/MainPage";
import FriendsSection from "../../components/FriendsSection";
import { ThisUser } from "../../api/queries";
import MainBody from "../../components/MainBody";

let id = 7;
export const Page = () => {
  const { loading, data, error } = useQuery(ThisUser(id));

  return (
    <MainBody>
      {loading ? (
        <div> loading . . .</div>
      ) : !error ? (
        <section>
          <MainPage name={data.users[0].name} />
          <FriendsSection ID={id} />
        </section>
      ) : (
        <h1> ERROR - {error.message}</h1>
      )}
    </MainBody>
  );
};
