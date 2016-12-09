import React from 'react';

import Button from '/imports/ui/components/button';

const Elements = () => (
  <div className="app-content app-elements">
    <div className="separator">
      <div className="container">
        <div className="title">
          <h1>UI style guide <span>Version 0.1</span></h1>
        </div>
      </div>
    </div>
    <div className="container">
      <div className="title">
        <h2>Colors</h2>
      </div>
      <div>
        <div className="elements-box dark" style={{ background: '#f8f8f8' }}>#f8f8f8</div>
        <div className="elements-box dark" style={{ background: '#dbd9d9' }}>#dbd9d9</div>
        <div className="elements-box" style={{ background: '#747373' }}>#747373</div>
        <div className="elements-box" style={{ background: '#605f5f' }}>#605f5f</div>
        <div className="elements-box" style={{ background: '#4c4b4b' }}>#4c4b4b</div>
        <div className="elements-box" style={{ background: '#252323' }}>#252323</div>
        <div className="elements-box" style={{ background: '#4c5c68' }}>#4c5c68</div>
        <div className="elements-box" style={{ background: '#227dac' }}>#227dac</div>
        <div className="elements-box" style={{ background: '#185879' }}>#185879</div>
      </div>

      <div className="title">
        <h2>Buttons</h2>
      </div>
      <code>
        <p>
          <span style={{ color: '#2060a0' }}>import</span> Button from <span style={{ color: '#c03030' }}>&apos;/imports/ui/components/button&apos;</span>;
        </p>
      </code>
      <Button disabled>Disabled button</Button>
      <Button rounded>Rounded button</Button>
      <Button small color={'red'}>Small button</Button>
      <Button small rounded>Small rounded button</Button>
      <Button bordered color={'blue'} small>Bordered button</Button>
      <Button bordered color={'green'} small rounded>Bordered button</Button>

      <div className="title">
        <h2>Text fields</h2>
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
);

export default Elements;
