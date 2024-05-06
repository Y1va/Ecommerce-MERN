// Jumbotron component
function Jumbotron({ children }) {
  return (
    // Render a div element with styles for a Jumbotron
    <div
      style={{ height: 560, clear: "both", paddingTop: 120, textAlign: "center" }}
    >
      {/* Render any children components inside the Jumbotron */}
      {children}
    </div>
  );
}

// Export the Jumbotron component
export default Jumbotron;
