import { getCompany } from './db/companies.js';
import { getJob, getJobs } from './db/jobs.js';

export const resolvers = {
    Query: {
        company: (_root, { id }) => getCompany(id),
        job: (_root, { id }) => getJob(id),
        jobs: () => getJobs()
    },
    Job: {
        date: (job) => {
            console.log(`Resolving date for job ${job.id}`)
            return toISODate(job.createdAt);
        },
        company: (job) => getCompany(job.companyId)
    }
};

function toISODate(date) {
    return date.slice(0, 'yyyy-mm-dd'.length);
}