import React from 'react';
//import PropTypes from 'prop-types';

import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

import './repoList.scss';
import PropTypes from "prop-types";

const RepoList = ({repoList, loading, error, onRepoSelected,  isFirstRequest}) => {


    function renderItems(arr) {
        if(isFirstRequest){
            return <div className="repo__empty">Enter the name of the organization in the search field</div>
        }
        if(arr.length > 0){
            const items =  arr.map((item, i) => {

                return (
                    <li
                        className="repo__item"
                        tabIndex={0}
                        key={i}
                    >
                        <div className="repo__wrapper">
                            <div className="repo__info">
                                <div className="repo__name">{item.full_name}</div>
                                <div className="repo__description">{item.description}</div>
                                <div className="repo__branch">Default branch: {item.default_branch}</div>
                            </div>
                            <div className="repo__button" >
                                <button style={{'display': item.open_issues < 1 ? 'none' : 'block'}} onClick={() => {
                                    onRepoSelected(item.name, item.owner.login);
                                }}>Show issues</button>
                                <div className="repo__not-issues" style={{'display': item.open_issues < 1 ? 'block' : 'none'}}>Not issues</div>
                            </div>

                        </div>


                    </li>
                )
            });
            return (
                <ul>
                    {items}
                </ul>
            )

        }
        return <div className="repo__empty">This organization has no repositories</div>

     }

    const items = renderItems(repoList);
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? items : null;

    return (
        <div className="repo__list">
            <div className="repo__list-title" >
                Repositories
            </div>
            {errorMessage}
            {spinner}
            {content}
        </div>
    )

}

RepoList.propTypes = {
    repoList: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
    onRepoSelected: PropTypes.func.isRequired,
    isFirstRequest: PropTypes.bool.isRequired
}

export default RepoList;