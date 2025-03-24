import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
//import { GraphQLClient, gql } from 'graphql-request';
import { getAccessToken } from '../auth';

/*
const client = new GraphQLClient('http://localhost:9000/graphql', {
    headers: () => {
        const token = getAccessToken();

        if (token) {
            return {
                'Authorization': `Bearer ${token}`
            };
        }

        return {};
    }


export async function getJobs() {
    const query = gql`
    query Jobs {
        jobs {
            id
            title
            date
            company {
                id
                name
            }
        }
    }  
    `;

    const { jobs } = await client.request(query);

    return jobs;
}

export async function getJob(id) {
    const query = gql`
    query JobById($id: ID!) {
        job(id: $id) {
            id
            title
            date
            company {
                id
                name
            }
        }
    }`;

    const { job } = await client.request(query, { id });

    return job;
}

export async function getCompany(id) {
    const query = gql`
    query CompanyById($id: ID!) {
        company(id: $id) {
            id
            name
            description
            jobs {
                id
                title
            }
        }
    }`;

    const { company } = await client.request(query, { id });

    return company;
}
});
 */

const client = new ApolloClient({
    uri: 'http://localhost:9000/graphql',
    cache: new InMemoryCache(),
});

export async function getJob(id) {
    const query = gql`
    query JobById($id: ID!) {
        job(id: $id) {
            id
            title
            date
            company {
                id
                name
            }
        }
    }`;

    const { data: job } = await client.query({ query, variables: { id } });

    return job;
}

export async function getJobs() {
    const query = gql`
    query Jobs {
        jobs {
            id
            title
            date
            company {
                id
                name
            }
        }
    }  
    `;

    const { data: jobs } = await client.query({ query });

    return jobs;
}

export async function getCompany(id) {
    const query = gql`
    query CompanyById($id: ID!) {
        company(id: $id) {
            id
            name
            description
            jobs {
                id
                title
            }
        }
    }`;

    const { data: company } = await client.query({ query, variables: { id } });

    return company;
}