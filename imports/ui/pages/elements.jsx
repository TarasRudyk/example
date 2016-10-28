import React from 'react';

const Elements = () => (
  <div className="page-main-content page-elements">
    <div className="page-separator">
      <div className="container">
        <div className="title">
          <h1>UI style guide <span>Version 0.1</span></h1>
        </div>
      </div>
    </div>
    <div className="container">
      <div className="page-main-content">
        <div className="title">
          <h2>Colors</h2>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div className="elements-box" style={{ background: '#000' }}>#000</div>
          <div className="elements-box" style={{ background: '#657587' }}>#657587</div>
          <div className="elements-box" style={{ background: '#838f9e' }}>#838f9e</div>
          <div className="elements-box" style={{ background: '#e4ecf0', color: '#a9a9b1' }}>#e4ecf0</div>
          <div className="elements-box" style={{ background: '#45b931' }}>#45b931</div>
          <div className="elements-box" style={{ background: '#1da9fc' }}>#1da9fc</div>
          <div className="elements-box" style={{ background: '#f14142' }}>#f14142</div>
        </div>
        <div className="title">
          <h2>Forms</h2>
        </div>
        <div className="title">
          <h3>Buttons</h3>
        </div>

        <a href="/" className="button">Default button</a>
        <a href="/" className="button green">Green button</a>
        <a href="/" className="button blue">Blue button</a>
        <a href="/" className="button red">Red button</a>
        <input type="submit" defaultValue="Submit" className="button" />

        <div className="title">
          <h3>Text fields</h3>
        </div>

        <input type="text" placeholder="Type something..." />
        <input id="project-name" type="text" defaultValue="My first project" />
        <input type="text" placeholder="Disabled" disabled />
        <input type="text" defaultValue="Success" className="success" />
        <input type="text" placeholder="Error" className="error" />
        <input type="text" placeholder="Full width" className="fullwidth" />

        <div className="title">
          <h2>Lists</h2>
        </div>

        <div className="list">
          <div className="list-item">Default list item</div>
          <div className="list-item clickable">Clickable list item</div>
          <div className="list-item disabled">Disabled list item</div>
        </div>
      </div>
    </div>
  </div>
);

export default Elements;
