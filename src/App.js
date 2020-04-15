import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.css';

//import { Provider } from 'react-redux';
//import store from './redux/store';

import CharacterCard from './components/characterCard';
import CharacterList from './components/characterList';
import { filter } from 'minimatch';

let initialData = [];

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      initialData: [],
      filters: [],
      byName: ''
    };

    this.charUrl = 'https://rickandmortyapi.com/api/character/';

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.sortAscending = this.sortAscending.bind(this);
    this.sortDescending = this.sortDescending.bind(this);

    this.addFilter = this.addFilter.bind(this);
    this.removeFilter = this.removeFilter.bind(this);

    this.fetchDataFromApi = this.fetchDataFromApi.bind(this);
  }

  handleNameChange(e) {
    e.target.value.trim().length ? 
    this.setState( {
      byName : e.target.value.trim()
    }) : this.setState( {
      byName: ''
    });
    this.fetchDataFromApi();
  }

  addFilter(filter) {
    this.state.filters.push(filter);

    this.fetchDataFromApi();
  }

  removeFilter(filter) {
    let fltrs = this.state.filters;
    fltrs.splice(fltrs.indexOf(filter), 1);
    this.setState( {
      filters: fltrs
    });
    this.fetchDataFromApi();

  }

  handleFilterChange(e) {
    let fragments = e.target.name.split('-');

    let filter = {};

    filter[fragments[fragments.length -2]] = fragments[fragments.length -1];

    e.target.checked ? this.addFilter(filter) : this.removeFilter(filter);
  }

  sortAscending() {
    let data = this.state.initialData;

    data.sort((a, b) => {
      return a.id - b.id;
    });

    this.setState( {
      initialData: data
    });
  }

  sortDescending() {
    let data = this.state.initialData;

    data.sort((a, b) => {
      return b.id - a.id;
    });

    
    this.setState( {
      initialData: data
    });
  }

  fetchDataFromApi() {
    const {filters, byName} = this.state;
    if(filters.length === 0 && byName === '' ) {
      fetch(this.charUrl)
      .then(res => res.json())
      .then((out) => {
        console.log('Output: ', out);
        this.setState({
          initialData: out.results
        }
        );
      }).catch(err => console.error(err));
    } else {
      let stub = '?';

      if (filters.length) {
      filters.forEach((filter) => {
        stub += Object.keys(filter)[0] + '=' + filter[Object.keys(filter)[0]] + '&';
      });
      }

      if (byName.length) {
        stub += 'name=' + byName + '&';
      }
    
      fetch(this.charUrl + stub)
      .then(res => res.json())
      .then((out) => {
        console.log('Output: ', out);
        this.setState({
          initialData: out.results
        }
        );
      }).catch(err => console.error(err));
    }
  }

  componentDidMount() {
    this.fetchDataFromApi();
  }
  render() {
    return (

      //<Provider store={store}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div className="main-body container">
            <div className="row avlbl-filters">
              <div className="col-sm-12 col-md-3">
              <p>Available Filters</p>
              <p>Status</p>
              <p><input type="checkbox" name="filter-status-alive" onChange={this.handleFilterChange}></input> Alive</p>
              <p><input type="checkbox" name="filter-status-dead" onChange={this.handleFilterChange}></input> Dead</p>
              <p><input type="checkbox" name="filter-status-unknown" onChange={this.handleFilterChange}></input> Unknown</p>
              <p>Gender</p>
              <p><input type="checkbox" name="filter-gender-male" onChange={this.handleFilterChange}></input> Male</p>
              <p><input type="checkbox" name="filter-gender-female" onChange={this.handleFilterChange}></input> Female</p>
              <p><input type="checkbox" name="filter-gender-genderless" onChange={this.handleFilterChange}></input> Genderless</p>
              <p><input type="checkbox" name="filter-gender-unknown" onChange={this.handleFilterChange}></input> Unknown</p>
              <p>Species</p>
              <p><input type="checkbox" name="filter-species-human" onChange={this.handleFilterChange}></input> Human</p>
              <p><input type="checkbox" name="filter-species-alien" onChange={this.handleFilterChange}></input> Alien</p>
              <p><input type="checkbox" name="filter-species-robot" onChange={this.handleFilterChange}></input> Robot</p>
              <p><input type="checkbox" name="filter-species-unknown" onChange={this.handleFilterChange}></input> Unknown</p>
              

              </div>
              <div className="col-sm-12 col-md-9">
                <div className="row">
                  <div className="col-sm-12 slctd-filters">

                  <span>Search By Name </span> <input type="text" name="filter-name" id="filter-name"  onChange={this.handleNameChange} ></input>
                  Sort <button onClick={this.sortAscending}>asc</button> <button onClick={this.sortDescending}>desc</button>
                  </div>
                  <div className="col-sm-12 char-list">Char List
                    <CharacterList data={this.state.initialData}></CharacterList>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </header>

      </div>

      //</Provider>
    );
  }

}



export default App;
