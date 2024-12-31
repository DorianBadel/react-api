type User = {
  date_of_birth: string;
};

type Friend = {
  friend: {
    date_of_birth: string;
  }
};

type BirthdaysByMonth = {
  friends: Friend[];
  users: User[];
};

export function getBirthdaysByMonth(data: BirthdaysByMonth) {
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const birthdaysCount: number[] = new Array(12).fill(0);

  // Count birthdays from friends
  data.friends.forEach((friend: any) => {
    const month = new Date(friend.friend.date_of_birth).getMonth();
    birthdaysCount[month]++;
  });

  // Count birthday of the user
  const userBirthday = data.users[0]?.date_of_birth;
  if (userBirthday) {
    const month = new Date(userBirthday).getMonth();
    birthdaysCount[month]++;
  }

  return monthNames.map((month, index) => ({
    month,
    amount: birthdaysCount[index]
  }));
}
