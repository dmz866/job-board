import { getJobs } from './db/jobs.js';
import { getCompany } from './db/companies.js';

export const resolvers = {
    Query: {
        job: () => ({
            id: '123',
            title: 'The Title',
            description: 'The Description'
        }),
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