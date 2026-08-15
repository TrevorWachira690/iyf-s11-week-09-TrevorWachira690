import { useState } from "react";

function Tabs({ tabs }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div>
      <div style={{ display: "flex", gap: "8px", borderBottom: "1px solid #ddd" }}>
        {tabs.map((tab, index) => (
          <button
            key={tab.label}
            onClick={() => setActiveIndex(index)}
            style={{
              padding: "8px 16px",
              border: "none",
              borderBottom: index === activeIndex ? "2px solid #2563eb" : "2px solid transparent",
              background: "none",
              cursor: "pointer",
              fontWeight: index === activeIndex ? "bold" : "normal",
              transition: "border-color 0.2s ease, font-weight 0.2s ease",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div
        key={activeIndex}
        style={{
          padding: "16px 0",
          animation: "fadeIn 0.2s ease",
        }}
      >
        {tabs[activeIndex].content}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default Tabs;

// Usage example:
// <Tabs tabs={[
//   { label: "Profile", content: <p>Profile content</p> },
//   { label: "Posts", content: <p>Posts content</p> },
//   { label: "Settings", content: <p>Settings content</p> },
// ]} />
