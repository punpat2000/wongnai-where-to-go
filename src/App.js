import React from 'react';
import './App.css';
import Card from './Card/Card';
import './Loading.css'

const jsonServerUrl = 'https://wongnai-json-server.herokuapp.com';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      matchedTrips: null,
      loading: true,
      keyword: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch(`${jsonServerUrl}/trips`)
      .then(res => res.json())
      .then(data => this.setState({matchedTrips: data.trips, loading: false}));
  }

  handleChange(event) {
    this.setState({keyword: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({loading: true});
    fetch(`${jsonServerUrl}/api/trips?keywords=${this.state.keyword}`)
      .then(res => res.json())
      .then(data => this.setState({matchedTrips: data.trips, loading: false}));
  }

  renderCards() {
    if (this.state.loading) { // loading state
      return <div className="loader">Loading...</div>;
    } else {
      const matchedTrips = this.state.matchedTrips;
      return (matchedTrips.length === 0) // found zero matched trips
        ? <div style={{padding: "3%"}}>ไม่พบรายการนี้</div>
        : matchedTrips.map((trip, index) => <Card key={index} trip={trip}></Card>);
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <div className="main-title">เที่ยวไหนดี</div>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text" 
              value={this.state.keyword}
              placeholder="หาที่เที่ยวแล้วไปกัน..."
              onFocus={e => e.target.placeholder = ''} 
              onBlur={e => e.target.placeholder = 'หาที่เที่ยวแล้วไปกัน...'}
              onChange={this.handleChange} />
            <input type="submit" value="Submit" style={{display: 'none'}}/>
          </form>
          {this.renderCards()}
        </div>
      </div>
    );
  }
}

export default App;
