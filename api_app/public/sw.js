console.log("Herrooo from service workor");

if (Notification.permission != "granted") {
  Notification.requestPermission();
}
self.addEventListener("fetch", (event) => {
  if (event.request.url.includes("/graphql")) {
    console.log("Intercepted GraphQL request:", event.request.url);
    event.respondWith(
      fetch(event.request).then((response) => {
        const clonedResponse = response.clone();
        clonedResponse.json().then((data) => {
          console.log("GraphQL response data:", data);
          // Check if the response contains the friends array
          if (data.data && Array.isArray(data.data.friends)) {
            const birthdays = data.data.friends.map(
              (friend) => friend.friend.date_of_birth
            );
            console.log("Extracted birthdays:", birthdays);
            if (birthdays && birthdays.length > 0) {
              const now = new Date();
              let closestBirthday = null;
              let birthdayPerson = null;
              let minDiff = Infinity;

              birthdays.forEach((birthdayStr) => {
                const birthday = new Date(birthdayStr);
                birthday.setFullYear(now.getFullYear());
                if (birthday < now) {
                  birthday.setFullYear(now.getFullYear() + 1);
                }
                const diff = birthday - now;
                if (diff < minDiff) {
                  minDiff = diff;
                  closestBirthday = birthday;
                  birthdayPerson =
                    data.data.friends[birthdays.indexOf(birthdayStr)].friend;
                }
              });
              console.log("Closest birthday:", closestBirthday);

              if (closestBirthday) {
                const timeUntilNotification = 5 * 60 * 100; // 5 minutes in milliseconds

                setTimeout(() => {
                  console.log("Showing notification");
                  self.registration.showNotification("Upcoming Birthday", {
                    body: `It is ${birthdayPerson.name}'s birthday soon`,
                    icon: "/assets/pwa_logo.png",
                  });
                }, timeUntilNotification);
              }
            }
          }
        });
        return response;
      })
    );
  }
});
