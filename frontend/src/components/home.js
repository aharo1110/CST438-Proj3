import React from 'react';

function Home() {
  return (
    <div className="home-container" style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to the Home Page</h1>
      <p>This is the landing page after you log in.</p>
      <button onClick={() => alert("You clicked the button!")}>Click Me</button>
    </div>
  );
}

export default Home;
