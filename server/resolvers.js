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
        createJob: (_root, { input: { title, description } }, { user }) => {
            if (!user) {
                throw unauthorizedError('Missing Authentication');
            }

            createJob({ companyId: user.companyId, title, description });
        },
        deleteJob: async (_root, { id }, { user }) => {
            if (!user) {
                throw unauthorizedError('Missing Authentication');
            }

            const job = await deleteJob(id, user.companyId);

            if (!job) {
                throw new GraphQLError(`No job ${id} found`, { extensions: { code: 'NOT_FOUND' } });
            }

            return job;
        }
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