import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getCompany } from '../lib/graphql/queries';

function CompanyPage() {
    const { companyId } = useParams();
    const [state, setState] = useState({ company: undefined, loading: true, error: false });
    const getCompanyById = useCallback(async () => {
        try {
            const company = await getCompany(companyId);

            setState({ company, loading: false, error: false });
        }
        catch (error) {
            setState({ company: undefined, loading: false, error: true });
        }
    }, [companyId]);

    useEffect(() => {
        getCompanyById(companyId);
    }, [companyId]);

    const { company, loading, error } = state;

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div className='has-text-danger'>Data unavailable</div>
    }

    return (
        <div>
            <h1 className="title">
                {company.name}
            </h1>
            <div className="box">
                {company.description}
            </div>
            <h2 className="title is-5">
                Jobs:
            </h2>
            {company.jobs.map(j => (<li key={j.title}>{j.title}</li>))}
        </div>
    );
}

export default CompanyPage;
