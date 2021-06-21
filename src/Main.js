import React from 'react';
import Albums from './Albums';
import Artists from './Artists';
import Header from './Header';
import axios from 'axios';

class Main extends React.Component {
    constructor() {
        super();
        this.state = {
            artists: [],
            albums: [],
            viewe: ''
        },
        this.changeView=this.changeView.bind(this);
    }

    async changeView(view){
        this.setState({ view })
    }

    async componentDidMount() {
        try {
            const _data = await axios.get('/api/artists');
            const artists = _data.data;
            this.setState({ artists });
        }
        catch(ex) {
            console.log('ERROR reading artists - ', ex);
        }
        try {
            const _data = await axios.get('/api/albums');
            const albums = _data.data;
            this.setState({ albums });
        }
        catch(ex) {
            console.log('ERROR reading albums - ', ex);
        }
    }

    render() {
        return (
            <div>
                <Header view={this.state.view} artists={ this.state.artists } albums={ this.state.albums } changeView={ this.changeView }/>
                <h1>Welcome to Acme Music World!</h1>

                { this.state.view === 'albums' ? <Albums albums={ this.state.albums }/> : <Artists artists={ this.state.artists }/>
                }

            </div>
        )
    }
}

export default Main;
