import React, { useEffect, useState } from "react";

const ExampleComponent = () => {
  const [message, setMessage] = useState("Waiting...");
  const [set,setSet] =useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage("Timeout completed!");
      console.log("Timeout completed");
    }, 5000); // 5 seconds

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (set) {
    return <div>Set</div>
  }

  return (
    <div>
        <button onClick={e=>setSet(true)}>set</button>
      <p>{message}</p>
    </div>
  );
};

export default ExampleComponent;
