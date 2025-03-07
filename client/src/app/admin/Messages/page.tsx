'use client';
import React from "react"; 
import { TitleBox } from "@/components/Admin/Messages/TitleBox"; 
import MessageCard from "@/components/Admin/Messages/MessageCard";

export default function MessagesPage() { 
  const messages = [
    {
      name: "Tahsan Ahmed",
      college: "Notre Dame College",
      email: "tahsanahmed@gmail.com",
      date: "31 February, 2072 3:00 PM",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    },
    {
      name: "Ayesha Rahman",
      college: "Dhaka University",
      email: "ayesha.rahman@example.com",
      date: "12 January, 2072 10:15 AM",
      text: "Hey, I wanted to discuss the project updates. Let me know when you're free.",
    },
    {
      name: "Rafiq Karim",
      college: "BUET",
      email: "rafiq.karim@example.com",
      date: "5 March, 2072 6:45 PM",
      text: "The new features look amazing! We should add more security measures as wellThe new features look amazing! We should add more security measures as wellThe new features look amazing! We should add more security measures as wellThe new features look amazing! We should add more security measures as wellThe new features look amazing! We should add more security measures as wellThe new features look amazing! We should add more security measures as wellThe new features look amazing! We should add more security measures as wellThe new features look amazing! We should add more security measures as wellThe new features look amazing! We should add more security measures as wellThe new features look amazing! We should add more security measures as well.",
    },
  ];
  
  return (
    <main className="max-w-screen bg-primary-900 relative overflow-x-clip text-primary-200">
      <section className="container-c mb-32 mt-40 flex min-h-screen w-full flex-col antialiased">
      <div className="mb-8">
        <TitleBox />
      </div>
     <div className="mb-8 space-y-8">
     {messages.map((msg, index) => (
        <MessageCard key={index} message={msg} />
      ))}
     </div>
   </section>
  </main>
  );
}