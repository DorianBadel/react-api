console.log("Herrooo from service workor");

self.addEventListener("fetch", (event) => {
  if (event.request.url.includes("/graphql")) {
    console.log("Intercepted GraphQL request:", event.request.url);
    event.respondWith(
      fetch(event.request).then((response) => {
        const clonedResponse = response.clone();
        clonedResponse.text().then((text) => {
          try {
            const data = JSON.parse(text);
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
                  const oneWeekInMilliseconds = 7 * 24 * 60 * 60 * 1000; // 1 week in milliseconds

                  const birthdayDate = new Date(birthdayPerson.date_of_birth);
                  const currentDate = new Date();
                  const timeDiff =
                    birthdayDate.getTime() - currentDate.getTime();

                  if (timeDiff > 0 && timeDiff <= oneWeekInMilliseconds) {
                    console.log("Showing notification");
                    self.registration.showNotification("Upcoming Birthday", {
                      body: `It is ${birthdayPerson.name}'s birthday in one week`,
                      icon: "/assets/pwa_logo.png",
                    });
                  }
                }
              }
            }
          } catch (error) {
            console.error("Failed to parse JSON:", error);
          }
        });
        return response;
      })
    );
  }
});
