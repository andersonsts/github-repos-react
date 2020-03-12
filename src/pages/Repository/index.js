import React, { Component } from 'react';
import {
  FaArrowRight, FaArrowLeft, FaSpinner, FaStar, FaRegFileAlt,
} from 'react-icons/fa';
import { GoRepoForked } from 'react-icons/go';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import api from '../../services/api';

import Container from '../../components/Container';
import {
  Loading, Owner, IssueList, FilterList, PageNav, OwnerProfile, RepoInfo, IssueLabel,
} from './styles';

class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  }

  state = {
    repository: {},
    loading: true,
    issues: [],
    filters: [
      { state: 'all', label: 'All Issues', active: true },
      { state: 'open', label: 'Open', active: false },
      { state: 'closed', label: 'Closed', active: false },
    ],
    filterIndex: 0,
    page: 1,
  }

  async componentDidMount() {
    const { match } = this.props;
    const { filters } = this.state;

    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: filters.find((filter) => filter.active).state,
          per_page: 4,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  loadFilters = async () => {
    const { match } = this.props;
    const { filters, filterIndex, page } = this.state;

    const repoName = decodeURIComponent(match.params.repository);

    const response = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state: filters[filterIndex].state,
        per_page: 4,
        page,
      },
    });

    this.setState({ issues: response.data });
  }

  handleFilters = async (filterIndex) => {
    await this.setState({ filterIndex });
    this.loadFilters();
  }

  handlePage = async (action) => {
    const { page } = this.state;
    await this.setState({ page: action === 'back' ? page - 1 : page + 1 });
    this.loadFilters();
  }

  render() {
    const {
      repository, issues, loading, filters, filterIndex, page,
    } = this.state;

    if (loading) {
      return (
        <Loading loading={loading ? 1 : 0}>
          <FaSpinner />
        </Loading>
      );
    }

    return (
      <Container>
        <Owner>
          <div>
            <Link to="/">
              <FaArrowLeft />
              Back
            </Link>
          </div>
          <OwnerProfile>
            <a
              href={repository.owner.html_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={repository.owner.avatar_url} alt={repository.owner.login} />
            </a>
            <h2>{repository.owner.login}</h2>
          </OwnerProfile>

          <RepoInfo>
            <h1>
              <a href={repository.html_url} target="_blank" rel="noopener noreferrer">
                {repository.name}
              </a>
            </h1>
            <div>
              {repository.license && (
                <span>
                  <FaRegFileAlt />
                  {repository.license.name}
                </span>
              )}
              {repository.stargazers_count !== 0 && (
                <span>
                  <FaStar />
                  {`${Number(repository.stargazers_count).toLocaleString(undefined, {
                    minimumIntegerDigits: 2,
                  })} ${repository.stargazers_count === 1 ? 'star' : 'stars'} `}
                </span>
              )}
              {repository.forks !== 0 && (
                <span>
                  <GoRepoForked />
                  {`${Number(repository.forks_count).toLocaleString()} ${
                    repository.forks_count === 1 ? 'fork' : 'forks'
                  }`}
                </span>
              )}
            </div>
            <p>{repository.description}</p>
          </RepoInfo>
        </Owner>

        <IssueList>
          <FilterList active={filterIndex}>
            {filters.map((filter, index) => (
              <button
                type="button"
                key={filter.state}
                onClick={() => this.handleFilters(index)}
              >
                {filter.label}
              </button>
            ))}
          </FilterList>
          {issues.map((issue) => (
            <li key={String(issue.id)}>
              <a
                href={issue.html_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={issue.user.avatar_url} alt={issue.user.login} />
                <div>
                  <strong>
                    <span>{issue.title}</span>
                    {issue.labels.map((label) => (
                      <IssueLabel key={String(label.id)} color={label.color}>
                        {label.name}
                      </IssueLabel>
                    ))}
                  </strong>
                  <p>{issue.user.login}</p>
                </div>
              </a>
            </li>
          ))}
          <PageNav>
            <button
              type="button"
              disabled={page < 2}
              onClick={() => this.handlePage('back')}
            >
              <FaArrowLeft />
            </button>
            <button
              type="button"
              disabled={page > 5}
              onClick={() => this.handlePage('next')}
            >
              <FaArrowRight />
            </button>
          </PageNav>
        </IssueList>
      </Container>
    );
  }
}

export default Repository;
