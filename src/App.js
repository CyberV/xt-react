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
      byName: '',
      sort: 'asc',
      loading: false
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
    this.nameIntervalToken = setTimeout(function () {
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
    let indx = fltrs.findIndex((f) => f[Object.keys(f)[0]] === filter[Object.keys(f)[0]]);
    fltrs.splice(indx, 1);
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
      sort: 'asc',
      initialData: data
    });
  }

  sortDescending() {
    let data = this.state.initialData;

    data.sort((a, b) => {
      return b.id - a.id;
    });

    this.setState({
      sort: 'desc',
      initialData: data
    });
  }

  fetchDataFromApi() {
    this.setState( {
      loading: true
    })
    const { filters, byName } = this.state;
    if (filters.length === 0 && byName === '') {
      fetch(this.charUrl)
        .then(res => res.json())
        .then((out) => {
          let results = out.results;
          if (this.state.sort === 'desc') {
            results.reverse();
          }
          this.setState({
            initialData: results
          }
          );

          setTimeout( ()=> {
            this.setState( {
              loading: false
            })
          }, 1000);
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
          let results = out.results;
          if (this.state.sort === 'desc') {
            results.reverse();
          }
          this.setState({
            initialData: results
          }
          );

          setTimeout( ()=> {
            this.setState( {
              loading: false
            })
          }, 1000);
        }).catch(err => console.error(err));
    }
  }

  componentDidMount() {
    this.fetchDataFromApi();
  }
  render() {

    const { sort } = this.state;
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
                      <input type="text" onChange={this.setName} class="form-control" name="filter-name" id="filter-name" placeholder="Search by name..." />
                    </div>
                    {/* <span>Search By Name </span> <input type="text" name="filter-name" id="filter-name" onChange={this.handleNameChange} ></input> */}
                  </div>
                  <div className="col-sm-4  col-md-6 offset-lg-2 col-lg-6">
                    <div className="row">
                      <div className="col-sm-4"><span style={{textDecoration:'underline'}}>Sorted by ID </span></div>
                      <div className="col-sm-4">
                        <div class="custom-control custom-radio custom-control-inline" >
                          <input checked={sort === 'asc'} type="radio" class="custom-control-input" id="sortAscending" name="example1" />
                          <label class="custom-control-label" for="sortAscending" onClick={this.sortAscending}>Ascending</label>
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div class="custom-control custom-radio custom-control-inline" >
                          <input checked={sort === 'desc'} type="radio" class="custom-control-input" id="sortDescending" name="example1" />
                          <label class="custom-control-label" for="sortDescending" onClick={this.sortDescending}>Descending</label>
                        </div>
                      </div>

                    </div>

                  </div>
                  <div className="col-sm-12 char-list">

                    {this.state.loading && (<img src="https://media.giphy.com/media/LOcQMUSJnTbirK0nOR/giphy.gif"></img>)}
                    {!this.state.loading && <CharacterList data={this.state.initialData}></CharacterList>}
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
