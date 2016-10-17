import React from 'react';

const Elements = () => (
  <main className="page-content page-elements">
    <div className="container">
      <div className="page-title">
        <h1>UI style guide <span>Version 0.1</span></h1>
      </div>
      <div className="page-content">
        <div className="page-title">
          <h2>Colours</h2>
        </div>
        <div className="page-title">
          <h2>Typography &ndash; Open Sans</h2>
        </div>
        <div className="page-title">
          <h2>Forms</h2>
        </div>
        <div className="page-title">
          <h3>Buttons</h3>
        </div>

        <a href="/" className="button">Default button</a>
        <a href="/" className="button green">Green button</a>
        <a href="/" className="button blue">Blue button</a>

        <input type="submit" defaultValue="Submit" className="button" />

        <div className="page-title">
          <h3>Text fields</h3>
        </div>

        <input type="text" placeholder="Type something..." />
        <input id="project-name" type="text" defaultValue="My first project" />
        <input type="text" placeholder="Disabled" disabled />
        <input type="text" defaultValue="Success" className="success" />
        <input type="text" placeholder="Error" className="error" />
        <input type="text" placeholder="Full width" className="fullwidth" />

        <div className="page-title">
          <h2>Lists</h2>
        </div>
      </div>
    </div>
  </main>
);

export default Elements;
