import React, {Component} from "react";
import './search.scss';
import PropTypes from "prop-types";
import RepoService from "../../services/repoService";

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            term: ''
        }
        this.count = 0;
    }


    onChangeSearch = (e) => {
        const term = e.target.value;
        this.setState({term});

        let a = ++this.count;

        const timeOut = setTimeout(() => {
            if(a == this.count){
                this.props.onUpdateSearch(term);

                clearTimeout(timeOut);
            }

        }, 1000);
    }


    render() {
        return (
            <div className="search">
                <input type="text"
                       className="form-control search-input"
                       placeholder="Organisation title..."
                       value={this.state.term}
                       onChange={this.onChangeSearch}/>
            </div>


        )
    }
}
Search.propTypes = {
    onUpdateSearch: PropTypes.func.isRequired
}

export default Search;