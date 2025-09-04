import Link from "next/link";
import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";

// Widgets
const LocationWidget = () => (
  <div className="text-black">
    📍 আমাদের ঠিকানা: {' '}
     <a className="font-semibold" href="https://maps.app.goo.gl/kWZ3ShvqBB4e68JUA" target="_blank">Level-4 | Block - A | Shop 029B,Jamuna Future Park Dhaka.</a>
  </div>
);

const ContactWidget = () => (
  <div className="text-black">
    📞 আমাদের যোগাযোগ নম্বর: <strong>+8801898931468</strong>
  </div>
);

const OffersWidget = () => (
  <div className="text-black">
    🎉 <strong>বিশেষ অফার!</strong>
    <br /> আমাদের অফার গুলো দেখতে <Link className="hover:underline font-medium text-blue-500" href="offer">এখানে</Link> ক্লিক করুন
  </div>
);

const OptionsWidget = (props) => {
  return (
    <div className="flex gap-2 flex-col justify-center ml-4">
      <button className="bg-gradient-to-t from-[#115e59] to-[#9c1405] pr-2 rounded-xl p-1" onClick={() => props.actionProvider.showLocation()}>📍 শপ লোকেশন</button>
      <button className="bg-gradient-to-t from-[#9c1405] to-[#115e59] pr-2 rounded-xl p-1" onClick={() => props.actionProvider.showContact()}>📞 যোগাযোগ</button>
      <button className="bg-gradient-to-t from-[#115e59] to-[#9c1405] pr-2 rounded-xl p-1" onClick={() => props.actionProvider.showOffers()}>🎉 অফার</button>
    </div>
  );
};


// Chatbot config
const config = {
  botName: "Apple Newton",
  initialMessages: [
    createChatBotMessage("স্যার, কিভাবে সহযোগিতা করতে পারি?", {
      widget: "options",
    }),
  ],
  widgets: [
    { widgetName: "location", widgetFunc: (props) => <LocationWidget {...props} /> },
    { widgetName: "contact", widgetFunc: (props) => <ContactWidget {...props} /> },
    { widgetName: "offers", widgetFunc: (props) => <OffersWidget {...props} /> },
    { widgetName: "options", widgetFunc: (props) => <OptionsWidget {...props} /> },
  ],
};

// Message Parser
class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  parse(message) {
    const lowerCaseMessage = message.toLowerCase();

    if (lowerCaseMessage.includes("ঠিকানা") || lowerCaseMessage.includes("location")) {
      this.actionProvider.showLocation();
    } else if (lowerCaseMessage.includes("যোগাযোগ") || lowerCaseMessage.includes("contact")) {
      this.actionProvider.showContact();
    } else if (lowerCaseMessage.includes("অফার") || lowerCaseMessage.includes("offer")) {
      this.actionProvider.showOffers();
    } else {
      this.actionProvider.defaultResponse();
    }
  }
}

// Action Provider
class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  showLocation() {
    const message = this.createChatBotMessage("আমাদের শপের অবস্থান:", { widget: "location" });
    this.setState((prev) => ({ ...prev, messages: [...prev.messages, message] }));
  }

  showContact() {
    const message = this.createChatBotMessage("আমাদের যোগাযোগ নম্বর:", { widget: "contact" });
    this.setState((prev) => ({ ...prev, messages: [...prev.messages, message] }));
  }

  showOffers() {
    const message = this.createChatBotMessage("বিশেষ অফার:", { widget: "offers" });
    this.setState((prev) => ({ ...prev, messages: [...prev.messages, message] }));
  }

  defaultResponse() {
    const message = this.createChatBotMessage("দুঃখিত, আমি বুঝতে পারিনি। দয়া করে পুনরায় চেষ্টা করুন!");
    this.setState((prev) => ({ ...prev, messages: [...prev.messages, message] }));
  }
}

// Chatbot Component
const ChatbotComponent = () => {
  return (
    <div style={{ maxWidth: "300px" }}>
      <Chatbot config={config} messageParser={MessageParser} actionProvider={ActionProvider} />
    </div>
  );
};

export default ChatbotComponent;
