import { useState, useEffect } from "react";

function EffectDemoCounter() {
  const [count, setCount] = useState(0);

  // Runs after EVERY render (no dependency array)
  useEffect(() => {
    console.log("Effect ran! Count is:", count);
  });

  // Runs only ONCE, on mount (empty dependency array)
  useEffect(() => {
    console.log("Component mounted!");
  }, []);

  // Runs only when `count` changes
  useEffect(() => {
    console.log("Count changed to:", count);
    document.title = `Count: ${count}`;
  }, [count]);

  // Cleanup function: runs on unmount, and before every re-run
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Tick");
    }, 1000);

    return () => {
      clearInterval(interval);
      console.log("Cleaned up!");
    };
  }, []);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

export default EffectDemoCounter;
