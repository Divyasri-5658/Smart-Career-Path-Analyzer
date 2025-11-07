import { useUser } from "@clerk/clerk-react";

function ProfileSync() {
  const { user } = useUser();

  async function sendUserData() {
    const userData = {
      id: user.id,
      email: user.primaryEmailAddress.emailAddress,
      name: user.fullName,
      imageUrl: user.imageUrl,
    };

    await fetch("http://127.0.0.1:8000/api/save_user/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
  }

  useEffect(() => {
    if (user) {
      sendUserData();
    }
  }, [user]);
}
