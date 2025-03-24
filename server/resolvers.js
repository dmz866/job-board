import { GraphQLError } from 'graphql';
import { getCompany } from './db/companies.js';
import { createJob, deleteJob, getJob, getJobs, getJobsByCompanyId } from './db/jobs.js';

export const resolvers = {
    Query: {
        company: async (_root, { id }) => {
            const result = await getCompany(id);

            if (!result) {
                throw new GraphQLError(`No company ${id} found`, { extensions: { code: 'NOT_FOUND' } });
            }

            return result;
        },
        job: (_root, { id }) => getJob(id),
        jobs: () => getJobs()
    },
    Mutation: {
        createJob: (_root, { input: { title, description } }, { auth }) => {
            if (!auth) {
                throw unauthorizedError('Missing Authentication');
            }

            createJob({ companyId: 'FjcJCHJALA4i', title, description });
        },
        deleteJob: (_root, { id }) => deleteJob(id)
    },
    Job: {
        date: (job) => {
            console.log(`Resolving date for job ${job.id}`)
            return toISODate(job.createdAt);
        },
        company: (job) => getCompany(job.companyId)
    },
    Company: {
        jobs: (company) => getJobsByCompanyId(company.id)
    }
};

function toISODate(date) {
    return date.slice(0, 'yyyy-mm-dd'.length);
}

function unauthorizedError(message) {
    return new GraphQLError(message, { extensions: { code: 'UNAUTHORIZED' } });
}