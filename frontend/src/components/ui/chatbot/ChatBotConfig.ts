import { createChatBotMessage } from "react-chatbot-kit";
import MessageParser from "./MessageParser";
import ActionProvider from "./ActionProvider";

const ChatBotConfig = {
  botName: "OrderNova", // Updated bot name
  initialMessages: [
    createChatBotMessage("Hi! I'm OrderNova. What is your name?", {}),
  ],
  customStyles: {
    botMessageBox: {
      backgroundColor: "#5A9",
    },
    chatButton: {
      backgroundColor: "#5A9",
    },
  },
};

export default ChatBotConfig;