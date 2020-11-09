import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Routes from './Routes';
import SubComponent from './components/sub-component';

function App () {

    return (
      <Routes/>
      //<div>
      //  <h1>Hello React!</h1>
      //  <SubComponent name="My Counter for TypeScript" />
      //</div>
    );
  
}

ReactDOM.render(<App />, document.querySelector('#app'));
