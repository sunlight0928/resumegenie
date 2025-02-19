"use client";
import React from "react";
import HeadMain from "@/app/components/HeadMain"; // Import the HeadMain component
import BreadcrumbDashboard from "../components/layouts/BreadcrumbDashboard"; // Import the BreadcrumbDashboard component
import { Chat } from "@/app/components/Chat/Chat";
import { Message } from "@/app/types";
import { useEffect, useRef, useState } from "react";

type Props = {};

const CHATBOT = (props: Props) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async (message: Message) => {
    const updatedMessages = [...messages, message];

    setMessages(updatedMessages);
    setLoading(true);

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: updatedMessages,
      }),
    });

    if (!response.ok) {
      setLoading(false);
      throw new Error(response.statusText);
    }

    const data = response.body;

    if (!data) {
      return;
    }

    setLoading(false);

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;
    let isFirst = true;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);

      if (isFirst) {
        isFirst = false;
        setMessages((messages) => [
          ...messages,
          {
            role: "assistant",
            content: chunkValue,
          },
        ]);
      } else {
        setMessages((messages) => {
          const lastMessage = messages[messages.length - 1];
          const updatedMessage = {
            ...lastMessage,
            content: lastMessage.content + chunkValue,
          };
          return [...messages.slice(0, -1), updatedMessage];
        });
      }
    }
  };

  const handleReset = () => {
    setMessages([
      {
        role: "assistant",
        content: `Hi Roscoe! I'm an AI assistant. I can help you with things like answering questions, providing information, and helping with tasks. How can I help you?`,
      },
    ]);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    setMessages([
      {
        role: "assistant",
        content: `Hi Roscoe! I'm an AI assistant. I can help you with things like answering questions, providing information, and helping with tasks. How can I help you?`,
      },
    ]);
  }, []);

  return (
    <>
      {/* Set the title and meta description of the page */}
      <HeadMain title="Jobs - Management | Dashboard - ResumeGenie" description="Dashboard - ResumeGenie" />

      {/* Display the breadcrumb */}
      <BreadcrumbDashboard title="AI assistant" />

      {/* Main content of the FAQ page */}
      <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-white dark:border-gray-700 sm:p-6 dark:bg-gray-800">
        {/* <div className="font-bold text-lg">FAQ</div> */}

        {/* List of FAQs */}
        <div id="list-faq" className="mt-4">
          <div className="flex flex-col mt-6">
            <div className="overflow-x-auto">
              <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden shadow">
                  {/* Render the FAQ table */}
                  <div className="flex-1 overflow-auto sm:px-10 pb-4 sm:pb-10">
                    <div className="max-w-[800px] mx-auto mt-4 sm:mt-12">
                      <Chat messages={messages} loading={loading} onSend={handleSend} onReset={handleReset} />
                      <div ref={messagesEndRef} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CHATBOT;
