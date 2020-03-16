import React, {useState, useEffect, useCallback} from 'react';
import Lists from './components/lists'
import './app.scss';



const  App = () => {

    function callback(key) {
        console.log(key);
    }
    return (
        <div className="App">
          <div className="container">
            <Lists/>
          </div>
        </div>
  );
}

export default App;
