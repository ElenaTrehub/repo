import PropTypes from "prop-types";
import RepoList from "../components/repoList";

class RepoService {
    _apiBase = 'https://api.github.com/';
    _baseOffset = 10;

    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    getAllRepositories = async (offset = this._baseOffset, companyName) => {
        const res = await this.getResource(`${this._apiBase}orgs/${companyName}/repos?per_page=${offset}`);
        return res;
    }

    getRepoIssues = async (selectedRepoOwner, selectedRepoName) => {

        const res = await this.getResource(`${this._apiBase}repos/${selectedRepoOwner}/${selectedRepoName}/issues`);
        if(res.length > 9){
            return res.slice(-10);
        }
        return res;
    }


}

export default RepoService;