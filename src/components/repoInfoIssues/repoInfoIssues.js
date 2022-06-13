import React, { Component } from 'react';
import PropTypes from 'prop-types';

import RepoService from "../../services/repoService";
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';


//import './charInfo.scss';

class RepoInfoIssues extends Component {

    constructor(props) {
        super(props);

        this.state = {
            repoIssues: [],
            loading: false,
            error: false
        }

        this.repoService = new RepoService();
    }

    componentDidMount() {
        if (this.props.selectedRepoOwner && this.props.selectedRepoName){
            this.updateRepo();
        }

    }

    componentDidUpdate(prevProps){
        if (this.props.selectedRepoName !== prevProps.selectedRepoName) {
            this.updateRepo();
        }
    }

    updateRepo = () => {
        const {selectedRepoOwner, selectedRepoName} = this.props;
        if (!selectedRepoOwner.length > 0 && !selectedRepoName.length > 0) {
            return;
        }

        this.onRepoLoading();

        this.repoService
            .getRepoIssues(selectedRepoOwner, selectedRepoName)
            .then(this.onRepoLoaded)
            .catch(this.onError);
    }

    onRepoLoaded = (repoIssues) => {
        this.setState({
            repoIssues,
            loading: false
        })
    }

    onRepoLoading = () => {
        this.setState({
            loading: true
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }
    renderItems(arr) {
        if(this.props.isFirstRequest){
            return <div className="repo__empty">There are not issues</div>
        }
        if(arr.length > 0){
            const items =  arr.map((item, i) => {
                return (
                    <li
                        className="repo__item"
                        key={i}
                    >
                        <div className="repo__wrapper">
                            <div className="repo__info-issue">
                                <div className="repo__name">{item.title ? item.title : 'There is no header'}</div>
                                <div className="repo__description">{item.body ? item.body : 'There is no description'}</div>
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
        else{
            return <div className="repo__empty">There are not issues</div>
        }

    }
    render() {
        const {repoIssues, loading, error} = this.state;

        const items = this.renderItems(repoIssues);
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? items : null;

        let title = '';
        if(this.props.selectedRepoOwner && this.props.selectedRepoName){
            title = <div className="repo__list-title" >
                {this.props.selectedRepoOwner+'/'+this.props.selectedRepoName}
            </div>;
        }
        return (
            <div className="repo__list">
                {title}
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    }
}


RepoInfoIssues.propTypes = {
    selectedRepoOwner: PropTypes.string.isRequired,
    selectedRepoName: PropTypes.string.isRequired,
    isFirstRequest: PropTypes.bool.isRequired
}

export default RepoInfoIssues;