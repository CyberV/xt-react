import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { cyan } from 'color-name';


class AvailableFilters extends Component {

    static propTypes = {
        onFilterChange: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);

        this.filters = {
            status: ['alive', 'dead', 'unknown'],
            gender: ['male', 'female', 'genderless', 'unknown'],
            species: ['human', 'alien', 'robot', 'unknown']
        };
    }

    render() {

        const { onFilterChange } = this.props;
        const { filters } = this;

        const filterKeys = Object.keys(filters);

        const filterCategoryStyle = {
            textTransform: 'capitalize',
            borderTop: '2px solid',
            marginTop: '1em',
            color: '#61dafb'

          };

        const filterFieldStyle = {
            textAlign: 'left',
            textTransform: 'capitalize',
            fontSize: '80%'
        };

        const filterLabelStyle = {
            cursor: 'pointer',
        };

        return (
            <React.Fragment>
                <p style={{textDecoration:'underline'}} >Available Filters</p>

                {filterKeys && filterKeys.map((key) => {
                    return (<React.Fragment>
                        <div className="row">
                            <div style={filterCategoryStyle} className="col-sm-12">
                                <span className="filter-category">{key}</span>
                            </div>
                        {filters[key].map((filterField) => {
                            return (
                                <div className="col-sm-12">
                                    <div style={filterFieldStyle} class="filter-field custom-control custom-checkbox ">
                                        <input onChange={onFilterChange} type="checkbox" class="custom-control-input" id={`filter-${key}-${filterField}`} name={`filter-${key}-${filterField}`} />
                                        <label style={filterLabelStyle} class="custom-control-label" for={`filter-${key}-${filterField}`}>{filterField}</label>
                                    </div>
                                </div>)
                        })}
                        </div>
                    </React.Fragment>)
                })}
            </React.Fragment>
           

        )
    };

}

export default AvailableFilters;