import React from 'react';
// import { Link } from 'react-router';

class MainLayout extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default MainLayout