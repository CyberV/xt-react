import React, { Component } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import 'bootstrap/dist/css/bootstrap.css';

//import { Provider } from 'react-redux';
//import store from './redux/store';

import CharacterCard from './components/characterCard';
import CharacterList from './components/characterList';

import AvailableFilters from './components/availableFilters';

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

    this.setName = this.setName.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.sortAscending = this.sortAscending.bind(this);
    this.sortDescending = this.sortDescending.bind(this);

    this.addFilter = this.addFilter.bind(this);
    this.removeFilter = this.removeFilter.bind(this);

    this.fetchDataFromApi = this.fetchDataFromApi.bind(this);
  }

  setName(e) {
    clearTimeout(this.nameIntervalToken);

    this.setState({
      byName: e.target.value.trim()
    });
    let that = this;
    this.nameIntervalToken = setTimeout( function() {
      that.fetchDataFromApi();
    }, 100);
  }

  handleNameChange(e) {
    this.fetchDataFromApi();
  }

  addFilter(filter) {
    this.state.filters.push(filter);

    this.fetchDataFromApi();
  }

  removeFilter(filter) {
    let fltrs = this.state.filters;
    fltrs.splice(fltrs.indexOf(filter), 1);
    this.setState({
      filters: fltrs
    });
    this.fetchDataFromApi();

  }

  handleFilterChange(e) {
    let fragments = e.target.name.split('-');

    let filter = {};

    filter[fragments[fragments.length - 2]] = fragments[fragments.length - 1];

    e.target.checked ? this.addFilter(filter) : this.removeFilter(filter);
  }

  sortAscending() {
    let data = this.state.initialData;

    data.sort((a, b) => {
      return a.id - b.id;
    });

    this.setState({
      initialData: data
    });
  }

  sortDescending() {
    let data = this.state.initialData;

    data.sort((a, b) => {
      return b.id - a.id;
    });

    this.setState({
      initialData: data
    });
  }

  fetchDataFromApi() {
    const { filters, byName } = this.state;
    if (filters.length === 0 && byName === '') {
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
          <div className="main-body container-fluid">
            <div className="row avlbl-filters">
              <div className="col-sm-12 col-md-2">
                <AvailableFilters onFilterChange={this.handleFilterChange}></AvailableFilters>

              </div>
              <div className="col-sm-12 col-md-10">
                <div className="row">
                  <div className="col-sm-8 col-md-6 col-lg-4 slctd-filters">

                    <div class="input-group">
                      <input type="text" onChange={this.setName} class="form-control" name="filter-name" id="filter-name" placeholder="Search for..." />
                    </div>
                    {/* <span>Search By Name </span> <input type="text" name="filter-name" id="filter-name" onChange={this.handleNameChange} ></input> */}
                  </div>
                  <div className="col-sm-4">
                  Sorted by ID <br/>
                  <div class="custom-control custom-radio custom-control-inline" >
                    <input checked="true" type="radio" class="custom-control-input" id="customRadio1" name="example1" />
                    <label class="custom-control-label" for="customRadio1" onClick={this.sortAscending}>Ascending</label>
                </div>
                  <div class="custom-control custom-radio custom-control-inline" >
                    <input type="radio" class="custom-control-input" id="customRadio2" name="example1" />
                    <label class="custom-control-label" for="customRadio2" onClick={this.sortDescending}>Descending</label>
                  </div>

                  </div>
                  <div className="col-sm-12 char-list">
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
