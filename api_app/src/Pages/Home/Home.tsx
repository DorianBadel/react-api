//import { useMyQueryQuery } from '../utils/__generated__/graphql'
import { useMutation, useQuery } from "@apollo/client";
import MainPage from "../../components/MainPage";
import FriendsSection from "../../components/FriendsSection";
import { CREATE_FRIEND, CREATE_USER, ThisUser } from "../../api/queries";
import MainBody from "../../components/MainBody";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react";

const id = 7;
export const Page = () => {
  const { loading, data, error } = useQuery(ThisUser(id));

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [birthday, setBirthday] = useState("");

  const [createUser, { loading: createUserLoading, error: createUserError }] = useMutation(CREATE_USER);
  const [createFriend, { loading: createFriendLoading, error: createFriendError }] = useMutation(CREATE_FRIEND);

  const createLoading = createUserLoading || createFriendLoading;
  const createError = createUserError || createFriendError;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const createdUser = await createUser({
        variables: {
          name: name,
          date_of_birth: birthday,
          UID: id,
        },
      });
      console.log(createdUser);

      await createFriend({
        variables: {
          UID: id,
          FID: createdUser.data.insert_users.returning[0].ID,
          nickname: nickname ?? null,
        },
      });
      setIsModalOpen(false);
      // Optionally, you can refetch the user's data to update the UI
    } catch (error) {
      console.error("Error creating friend:", error);
    }
  };

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
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
      <Button size="icon" className="fixed bottom-4 right-4 rounded-full p-2 text-2xl shadow-lg">+</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add birthday</DialogTitle>
          <DialogDescription>
            Add a new birthday
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nickname" className="text-right">
                Nickname
              </Label>
              <Input id="nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dob" className="text-right">
                Date of Birth
              </Label>
              <Input id="dob" value={birthday} onChange={(e) => setBirthday(e.target.value)} className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={createLoading}>
              {createLoading ? "Adding..." : "Add"}
            </Button>
          </DialogFooter>
        </form>
        {createError && <p className="text-red-500">{createError.message}</p>}
      </DialogContent>
    </Dialog>
    </MainBody>
  );
};
