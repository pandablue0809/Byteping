interface LoginType {
  email: string;
  password: string;
}

export const loginSubmitHandler = async ({ data }: { data: LoginType }) => {
  const response = await fetch("http://localhost:5000/api/user/login", {
    method: "post",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(data)
  });
  if (!response.ok) {
    const error = new Error("Failed to authenticate");
    throw error;
  }
  const responseData = await response.json();
  return responseData;
};
