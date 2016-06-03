import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class App extends React.Component {
    render() {
        return (
            <div>
                <button onClick={() => {
                    axios.post('/open');
                }}>Open</button>
            </div>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));
