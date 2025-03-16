import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getCompany } from '../lib/graphql/queries';

function CompanyPage() {
    const { companyId } = useParams();
    const [company, setCompany] = useState({});
    const getCompanyById = useCallback(async () => {
        const result = await getCompany(companyId);

        setCompany(result);
    }, [companyId]);

    useEffect(() => {
        getCompanyById(companyId);
    }, [companyId]);

    if (!company) {
        return <div>Loading...</div>
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
