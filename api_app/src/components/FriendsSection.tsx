import { useQuery } from "@apollo/client";
import { ListOfFriends /*ThisUser*/ } from "../api/queries";
import "./css/FriendsSection.css";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type Friend = {
  nickname: string;
  friend: {
    ID: number;
    name: string;
    date_of_birth: string;
  };
};

function FriendsSection({ ID }: { ID: number }) {
  const { loading, data, error } = useQuery(ListOfFriends(ID));
  const td = new Date();
  const today =
    td.getFullYear() + "-" + (td.getMonth() + 1) + "-" + td.getDate();

  function getAge(id: number): number {
    //Return actual year from DB
    const db: Friend = data.friends.find((obj: Friend) => {
      return obj.friend.ID === id;
    });

    const date: string[] = db.friend.date_of_birth.split("-");

    return td.getFullYear() - Number(date[0]);
  }

  function getYear(id: number): string {
    //Return actual year from DB
    const db: Friend = data.friends.find((obj: Friend) => {
      return obj.friend.ID === id;
    });

    const dateParts = db.friend.date_of_birth.split("-");
    const formattedDate = `${dateParts[2]}. ${dateParts[1]}. ${dateParts[0]}.`;

    return formattedDate;
  }

  function compareDates(
    dateOne: string,
    dateTwo: string,
    compareYear: boolean = false
  ): boolean {
    const t1: number[] = dateOne.split("-").map((a) => Number(a));
    const t2: number[] = dateTwo.split("-").map((a) => Number(a));

    if (compareYear) {
      if (t2[0] > t1[0]) return true;
      else if (t2[0] !== t1[0]) return false;
    }
    if (t2[1] > t1[1]) {
      return true;
    } else if (t2[1] === t1[1]) {
      if (t2[2] >= t1[2]) {
        return true;
      } else return false;
    }
    return false;
  }

  function replace(passed: boolean, fr: Friend): Friend {
    let newDate = "0000-0-0";
    const temp: string[] = fr.friend.date_of_birth.split("-");
    if (passed) {
      newDate = td.getFullYear() + "-" + temp[1] + "-" + temp[2];
    } else newDate = td.getFullYear() + 1 + "-" + temp[1] + "-" + temp[2];

    const newFriend: Friend = {
      nickname: fr.nickname,
      friend: {
        ID: fr.friend.ID,
        name: fr.friend.name,
        date_of_birth: newDate,
      },
    };

    return newFriend;
  }

  function SortDates() {
    let newDates: Friend[] = [];
    if (!loading) {
      data.friends.map((fr: Friend) => {
        newDates.push(
          replace(compareDates(today, fr.friend.date_of_birth), fr)
        );
      });

      newDates.sort((a: Friend, b: Friend) => {
        if (compareDates(a.friend.date_of_birth, b.friend.date_of_birth, true))
          return -1;
        else return 1;
      });
    }
    return newDates;
  }

  console.log(SortDates());

  return (
    <div>
      {loading ? (
        <p>loading...</p>
      ) : error ? (
        <span className="error"> ERROR - {error.message} </span>
      ) : (
        // ) : (
        //   <div className="friends_container">
        //     {SortDates().map((fr: Friend) => (
        //       <div key={fr.friend.ID} className="friends_card">
        //         <span className="friends_card__name">
        //           {fr.nickname ? fr.nickname : fr.friend.name}
        //         </span>
        //         <span className="friends_card__age">{getAge(fr.friend.ID)}</span>
        //         {/*{fr.friend.date_of_birth.split("-")[0]}{" "}*/}
        //         <span className="friends_card__date">
        //           {getYear(fr.friend.ID)}
        //         </span>
        //       </div>
        //     ))}
        //   </div>
        // )}
        <div className="flex flex-wrap gap-4 items-center w-full px-[15%]">
          {SortDates().map((fr: Friend) => (
            <Card
              key={fr.friend.ID}
              className="flex-grow flex-row flex justify-between align-middle transition-transform transform hover:scale-105"
            >
              <CardHeader>
                <CardTitle>
                  {fr.nickname ? fr.nickname : fr.friend.name}
                </CardTitle>
                <span>{getYear(fr.friend.ID)}</span>
              </CardHeader>
              <CardContent className="flex items-center justify-center text-center">
                <span className="text-2xl">{getAge(fr.friend.ID)}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default FriendsSection;
