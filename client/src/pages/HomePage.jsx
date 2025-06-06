import { useState, useEffect } from 'react';
import JobList from '../components/JobList';
//import { jobs } from '../lib/fake-data';
import { getJobs } from '../lib/graphql/queries';

function HomePage() {
    const [jobs, setJobs] = useState([]);
    useEffect(() => {
        getJobs().then(setJobs);
    }, []);

    return (
        <div>
            <h1 className="title">
                Job Board
            </h1>
            <JobList jobs={jobs} />
        </div>
    );
}

export default HomePage;
