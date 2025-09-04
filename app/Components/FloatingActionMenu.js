import { Headset, MessageCircleMore } from "lucide-react";
import React, { useState } from "react";
import { ChildButton, FloatingMenu, MainButton } from "react-floating-button-menu";
import { FaPhoneAlt } from "react-icons/fa";

import { FaFacebook, FaFacebookMessenger } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io5";
import { MdAdd, MdClose, MdSupportAgent } from "react-icons/md";

const FloatingActionMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ zIndex: 0 }}>
      <FloatingMenu
        style={{ zIndex: 0 }}
        slideSpeed={500}
        direction="left"
        spacing={8}
        isOpen={isOpen}
      >
        <MainButton
        className="bg-white"
          iconResting={<MessageCircleMore style={{ fontSize: 25, color: "#115e59" }} />}
          iconActive={<MdClose style={{ fontSize: 20, color: "#115e59" }} />}
          backgroundColor="white"
          onClick={() => setIsOpen(!isOpen)}
          size={56}
        />
        {/* Facebook Button with Icon Background */}
        <ChildButton
        className="bg-white" 
          icon={<FaFacebook style={{ fontSize: 20, color: "blue", zIndex: 0,  backgroundColor: "white", }} />}
          backgroundColor="#0068ff" 
          size={40}
          onClick={() => window.open("https://www.facebook.com/morshed.mart2.0", "_blank")}
        />
        {/* WhatsApp Button with Icon Background */}
        <ChildButton
          icon={<IoLogoWhatsapp style={{ fontSize: 20, color: "green",  backgroundColor: "white", }} />}
          backgroundColor="white"
          className="bg-white" 
          size={40}
          onClick={() => window.open("https://wa.me/+8801970085954", "_blank")}
        />
        {/* Support/Contact Button with Icon Background */}
        <ChildButton
        className="bg-white" 
          icon={<FaPhoneAlt style={{ fontSize: 15, color: "#115e59" }} />}
          backgroundColor="white" 
          size={40}
          onClick={() => window.open("tel: +8801970085954")}
        />
      </FloatingMenu>
    </div>
  );
};

export default FloatingActionMenu;
