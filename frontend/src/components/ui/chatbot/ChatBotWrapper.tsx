// ChatbotWrapper.tsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import ChatBotConfig from "./ChatBotConfig";
import MessageParser from "./MessageParser";
import ActionProvider from "./ActionProvider";

const ChatbotWrapper: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false); // Default to closed

  return (
    <div style={{ position: "fixed", bottom: 20, right: 20, zIndex: 999 }}>
      {/* Chatbot Panel with Animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={{
              position: "absolute", // Position relative to the button
              bottom: "60px", // Move the panel above the button
              right: "-90px", // Adjusted to move the panel further to the right
              width: "350px", // Set a fixed width for the chatbot
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              borderRadius: "8px",
              overflow: "hidden",
              backgroundColor: "#fff",
            }}
          >
            <Chatbot
              config={ChatBotConfig}
              messageParser={MessageParser}
              actionProvider={ActionProvider}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button with Animation */}
      <motion.button
        onClick={() => setIsOpen((prev) => !prev)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: "50px",
          height: "50px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "50%",
          cursor: "pointer",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.5rem",
        }}
        aria-label={isOpen ? "Close Chat" : "Open Chat"}
      >
        {isOpen ? "×" : "💬"}
      </motion.button>
    </div>
  );
};

export default ChatbotWrapper;
