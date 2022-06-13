import { Component } from "react";
import Search from "../search";
import RepoList from "../repoList";
import RepoInfoIssues from "../repoInfoIssues";
import ErrorBoundary from "../errorBoundary";
import RepoService from "../../services/repoService";


class App extends Component {
    constructor(props) {
        super(props);

        this.repoService = new RepoService();
        this.state = {
            selectedRepoName: '',
            selectedRepoOwner: '',
            isFirstRequest: true,
            repoList: [],
            loading: false,
            error: false,
            searchMoviesLoaded: false,
            term: ''
        }
    }


    componentDidMount() {
        if(this.state.term.length > 0){
            this.onRequest();
        }

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevState.term !== this.state.term && this.state.term.length > 0){
            this.onRequest();
        }
    }

    onRequest = (offset) => {
        this.onRepoListLoading();
        this.repoService.getAllRepositories(offset, this.state.term)
            .then(this.onRepoListLoaded)
            .catch(this.onError)
    }

    onRepoListLoading = () => {
        this.setState({
            loading: true
        })
    }

    onRepoListLoaded = (newRepoList) => {
        this.setState(() => ({
            repoList: [...newRepoList],
            loading: false,
            isFirstRequest: false
        }))
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }

    onRepoSelected = (name, owner) => {
        console.log('select');
        this.setState({
            selectedRepoName: name,
            selectedRepoOwner: owner,
            isFirstRequest: false
        })
    }
    onUpdateSearch = (term) => {
        if(term.length > 0){
            this.setState({term});
        }
        else{
            this.setState({
                term: term,
                isFirstRequest: true,
                selectedRepoName: '',
                selectedRepoOwner: ''
            })
        }


    }
    render() {
        const {repoList, loading, error, isFirstRequest} = this.state;
        return (
            <div className="app">
                <Search onUpdateSearch={this.onUpdateSearch}/>
                <main>
                    <div className="repo__content">
                        <ErrorBoundary>
                            <RepoList repoList={repoList}
                                      loading = {loading}
                                      error = {error}
                                      onRepoSelected={this.onRepoSelected}
                                      isFirstRequest={isFirstRequest}/>
                        </ErrorBoundary>
                        <ErrorBoundary>
                            <RepoInfoIssues isFirstRequest={isFirstRequest} selectedRepoName={this.state.selectedRepoName} selectedRepoOwner={this.state.selectedRepoOwner} />
                        </ErrorBoundary>
                    </div>

                </main>
            </div>
        )
    }
}

export default App;