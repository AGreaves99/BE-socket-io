import axios from "axios";

const baseApi = axios.create({
  baseURL: "https://be-sportmeets-py.onrender.com/api/sportmeets",
});

export function getEventMessages(event_id) {
  return baseApi
    .get(`/messages/${event_id}`)
    .then(({ data }) => {
      const { messages } = data;
      return messages.map((message) => {
        return {
          ...message,
          created_at: new Date(message.created_at).toLocaleString(),
        };
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

export function postNewMessage(message) {
  
  const formattedMessage = { ...message };
  delete formattedMessage.created_at
  delete formattedMessage.message_id
  return baseApi.post("/messages", formattedMessage).then(({data}) => {
    return data.PostedMessage
  })
  .catch((err) => {
    console.dir(err);
  })
}