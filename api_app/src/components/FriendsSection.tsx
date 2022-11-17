import { useQuery } from "@apollo/client";
import React from "react";
import { ListOfFriends, ThisUser } from "../api/queries";

type Friend = {
	Nickname: string;
	friend: {
		ID: number;
		Username: string;
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
		const db: Friend = data.firends.find((obj: Friend) => {
			return obj.friend.ID === id;
		});

		const date: string[] = db.friend.date_of_birth.split("-");

		return td.getFullYear() - Number(date[0]);
	}

	function getYear(id: number): string {
		//Return actual year from DB
		const db: Friend = data.firends.find((obj: Friend) => {
			return obj.friend.ID === id;
		});

		return db.friend.date_of_birth;
	}

	function compare(dateOne: string, dateTwo: string): boolean {
		const t1: string[] = dateOne.split("-");
		const t2: string[] = dateTwo.split("-");

		if (t2[1] > t1[1]) {
			return true;
		} else if (t2[1] === t1[1]) {
			if (t2[2] >= t1[2]) return true;
			else return false;
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
			Nickname: fr.Nickname,
			friend: {
				ID: fr.friend.ID,
				Username: fr.friend.Username,
				date_of_birth: newDate,
			},
		};

		return newFriend;
	}

	function compareWithYear(dateOne: string, dateTwo: string): boolean {
		const t1: string[] = dateOne.split("-");
		const t2: string[] = dateTwo.split("-");

		if (t2[0] > t1[0]) return true;
		else if (t2[0] === t1[0])
			if (t2[1] > t1[1]) {
				return true;
			} else if (t2[1] === t1[1]) {
				if (t2[2] >= t1[2]) return true;
				else return false;
			}
		return false;
	}

	function SortDates() {
		let newDates: Friend[] = [];
		if (!loading) {
			data.firends.map((fr: Friend) => {
				newDates.push(replace(compare(today, fr.friend.date_of_birth), fr));
			});

			newDates.sort((a: Friend, b: Friend) => {
				if (compareWithYear(a.friend.date_of_birth, b.friend.date_of_birth))
					return -1;
				else return 1;
			});
		}
		return newDates;
	}

	return (
		<div>
			<h3>Friends ... {today.toString()}</h3>
			{loading ? (
				<p>loading...</p>
			) : error ? (
				<span className="error"> ERROR </span>
			) : (
				<div className="friendBDCardContainer">
					{SortDates().map((fr: Friend) => (
						<div key={fr.friend.ID} className="friendBDCard">
							<span className="Name">
								{fr.Nickname ? fr.Nickname : fr.friend.Username}
							</span>
							<p>
								<span className="Age">{getAge(fr.friend.ID)}</span>
								{/*{fr.friend.date_of_birth.split("-")[0]}{" "}*/}
								<span className="Date">{getYear(fr.friend.ID)}</span>
							</p>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

export default FriendsSection;
