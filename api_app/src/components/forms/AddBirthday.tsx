import React, { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutation } from "@apollo/client";
import { CREATE_FRIEND, CREATE_USER } from "../../api/queries";
import { ID } from "@/global/variables";
import { DatePickerForm } from "../navigation/DatePicker";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const FormSchema = z.object({
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
  name: z.string().min(1, { message: "Name is required" }),
  nickname: z.string().optional(),
});

const AddBirthday: React.FC = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [createUser, { loading: createUserLoading, error: createUserError }] =
    useMutation(CREATE_USER);
  const [
    createFriend,
    { loading: createFriendLoading, error: createFriendError },
  ] = useMutation(CREATE_FRIEND);

  const createLoading = createUserLoading || createFriendLoading;
  const createError = createUserError || createFriendError;

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    toast("You submitted the following values:");
    console.log(data);

    const { dob, name, nickname } = data;
    const birthday = dob.toISOString().split("T")[0];
    const createdUser = await createUser({
      variables: {
        name: name,
        date_of_birth: birthday,
        UID: ID,
      },
    });

    await createFriend({
      variables: {
        UID: ID,
        FID: createdUser.data.insert_users.returning[0].ID,
        nickname: nickname ?? null,
      },
    });

    form.reset();
    setIsModalOpen(false);
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Button
          size="icon"
          className="fixed bottom-4 right-4 rounded-full p-2 text-2xl shadow-lg"
        >
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add birthday</DialogTitle>
          <DialogDescription>Add a new birthday</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <FormLabel htmlFor="name" className="text-right">
                  Name
                </FormLabel>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="col-span-3">
                      <FormControl>
                        <Input id="name" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <FormLabel htmlFor="nickname" className="text-right">
                  Nickname
                </FormLabel>
                <FormField
                  control={form.control}
                  name="nickname"
                  render={({ field }) => (
                    <FormItem className="col-span-3">
                      <FormControl>
                        <Input id="nickname" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <FormLabel htmlFor="dob" className="text-right">
                  Date of Birth
                </FormLabel>
                <DatePickerForm control={form.control} name="dob" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={createLoading}>
                {createLoading ? "Adding..." : "Add"}
              </Button>
            </DialogFooter>
          </form>
          <FormMessage />
        </Form>
        {createError && <p className="text-red-500">{createError.message}</p>}
      </DialogContent>
    </Dialog>
  );
};

export default AddBirthday;
