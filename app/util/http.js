export const fetchChats = async ({ signal, name = "" }) => {
  let url = "http://localhost:5000/api/chats";

  if (name !== "") {
    const trimmedName = name.replace(/\s/g, "").toLowerCase();
    url += `?name=${encodeURIComponent(trimmedName)}`;
  }

  const response = await fetch(url, { signal: signal });
  if (!response.ok) {
    const error = new Error("Failed to fetch the chats");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }
  const data = await response.json();
  return data;
};

export const loginSubmitHandler = async ({ data }) => {
  const response = await fetch("http://localhost:5000/api/user/login", {
    method: "post",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(data)
  });
  if (!response.ok) {
    const error = new Error("Failed to authenticate");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }
  const responseData = await response.json();
  return responseData;
};
