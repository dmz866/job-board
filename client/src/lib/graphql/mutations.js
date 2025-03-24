import { GraphQLClient, gql } from 'graphql-request';

const client = new GraphQLClient('http://localhost:9000/graphql');

export async function createJob({ title, description }) {
    const mutation = gql`
    mutation CreateJob($input: CreateJobInput!) {
        createJob(input: $input) {
            id
        }
    }`;

    const { createJob: job } = await client.request(mutation, { input: { title, description } });

    return job;
}