import { useQuery } from "@apollo/client";
import MainPage from "../../components/MainPage";
import FriendsSection from "../../components/FriendsSection";
import { ThisUser } from "../../api/queries";
import MainBody from "../../components/MainBody";
import { ID } from "@/global/variables";
import AddBirthday from "@/components/forms/AddBirthday";
import { Toaster } from "sonner";

export const Page = () => {
  const { loading, data, error } = useQuery(ThisUser(ID));

  return (
    <MainBody>
      {loading ? (
        <div> loading . . .</div>
      ) : !error ? (
        <section className="pb-10">
          <MainPage name={data.users[0].name} />
          <FriendsSection ID={ID} />
          <AddBirthday />
        </section>
      ) : (
        <h1> ERROR - {error.message}</h1>
      )}
      <Toaster />
    </MainBody>
  );
};
