import { useState } from 'react';

const FileCopyLayout = () => {
  return (
    <div style={{ 
      minHeight: "100vh", 
      backgroundColor: "white", 
      padding: "2rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <div style={{ 
        maxWidth: "1000px", 
        width: "100%"
      }}>
        {/* Top row - 2 boxes */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "1fr 1fr", 
          gap: "2rem",
          marginBottom: "2rem" 
        }}>
          <div style={{ 
            height: "150px", 
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", 
            borderRadius: "8px" 
          }}></div>
          
          <div style={{ 
            height: "150px", 
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", 
            borderRadius: "8px" 
          }}></div>
        </div>
        
        {/* Middle row - 1 box */}
        <div style={{ 
          marginBottom: "2rem" 
        }}>
          <div style={{ 
            height: "150px", 
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", 
            borderRadius: "8px" 
          }}></div>
        </div>
        
        {/* Bottom row - 2 boxes */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "1fr 1fr", 
          gap: "2rem" 
        }}>
          <div style={{ 
            height: "150px", 
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", 
            borderRadius: "8px" 
          }}></div>
          
          <div style={{ 
            height: "150px", 
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", 
            borderRadius: "8px" 
          }}></div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [show404, setShow404] = useState(false);

  const handleClick = async (id) => {
    try {
      const res = await fetch(`/file${id}.txt`);
      const text = await res.text();
      await navigator.clipboard.writeText(text);
      setShow404(true);
      setTimeout(() => setShow404(false), 2000);
    } catch (err) {
      console.error('Error copying file content:', err);
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "white", padding: "2rem", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative" }}>
      {/* 404 Message */}
      {show404 && (
        <div style={{ position: "absolute", top: "4%", left: "50%", transform: "translateX(-50%)", color: "red", fontSize: "2rem", fontWeight: "bold" }}>
          404
        </div>
      )}

      {/* Grid Layout for Buttons */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr 1fr", gap: "2rem", width: "100%", maxWidth: "1000px" }}>
        {/* Top row */}
        <button onClick={() => handleClick(1)} style={{ ...buttonStyle, cursor: "pointer" }}></button>
        <button onClick={() => handleClick(2)} style={{ ...buttonStyle, cursor: "move" }}></button>

        {/* Center row */}
        <div style={{ gridColumn: "span 2", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <button onClick={() => handleClick(3)} style={{ ...buttonStyle, width: "50%", height: "150px", cursor: "crosshair" }}></button>
        </div>

        {/* Bottom row */}
        <button onClick={() => handleClick(4)} style={{ ...buttonStyle, cursor: "wait" }}></button>
        <button onClick={() => handleClick(5)} style={{ ...buttonStyle, cursor: "help" }}></button>
      </div>

      {/* File Copy Layout (below buttons) */}
      <FileCopyLayout />
    </div>
  );
};

const buttonStyle = {
  backgroundColor: "white",
  color: "transparent",
  fontSize: "1.25rem",
  padding: "1rem",
  borderRadius: "8px",
  border: "1px solid rgba(0, 0, 0, 0)", // Initially invisible border
  boxShadow: "0 4px 0 rgba(0, 0, 0, 0)", // Initially invisible shadow
  transition: "all 0.3s ease",
  width: "100%",
  height: "100%",
  cursor: "pointer",
  outline: "none",
};

/* CSS for Hover Effect */
const hoverEffect = `
  button:hover {
    border: 1px solid rgba(0, 0, 0, 0.2); /* Subtle visible border */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); /* Subtle visible shadow */
  }
`;

export default App;
