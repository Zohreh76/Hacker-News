import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stories: []
    }
  } 

  componentDidMount() {
    // to get our data that is a list of stories that we want to store it in our state
  // we use fetch to get data from Hacker new API,we making string for the url that i want get request to
    const topStories = 'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty';
    const storyUrlBase = 'https://hacker-news.firebaseio.com/v0/item/';

    fetch(topStories)
      .then(data => data.json()) // then we convert our data to json 
      .then(data => data.map(id => { // the result of making this request is an array of id so we map over this array 
        const url = `${storyUrlBase}${id}.json`;
        return fetch(url).then(d => d.json()); //return array //each one of this request requires to convert out data to json 
      }))
      .then(promises => Promise.all(promises))
      .then(stories => this.setState({ stories }));// now that our promises result we have array of stories
  }

  render() {
    let views = <div>Loading...</div>;
    const { stories } = this.state;
    if (stories && (stories.length > 0)) {
      views = stories.map(s => (
        <p key={s.id}>
          <a href={s.url}>{s.title}</a> from <strong>{s.by}</strong>
        </p>
      ));
    }
    return (
      <div className="App">
        <h2>Hacker News Top Stories </h2>
        {views}
      </div>

    );
  }

}

export default App;


