import React, { useState, useEffect } from "react";

export default function Home({ data }: { data: { time: string } }) {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    // Fetch the current time from your API
    fetch("/api/time")
      .then((res) => res.json())
      .then((json) => {
        // Parse the time string into a Date object
        const timeString = json.time;
        const parsedTime = new Date(timeString);
        setTime(parsedTime);
      })
      .catch((error) => {
        console.error("Error fetching time:", error);
      });
  }, []);

  return (
    <div  className="flex flex-col h-screen justify-center items-center gap-2 bg-black">
      <h1 className=" text-3xl text-white">Welcome to Next.js hosted in Azure</h1>
      <h1 className=" text-2xl  text-white">
        {time &&
          `The time is ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`}
      </h1>
    </div>
  );
}

export async function getServerSideProps() {
  const data = JSON.stringify({ time: new Date() });
  return { props: { data } };
}
