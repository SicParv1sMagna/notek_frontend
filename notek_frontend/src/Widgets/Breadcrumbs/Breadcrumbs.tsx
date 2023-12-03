import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

const Breadcrumbs = () => {
    const location = useLocation();
    const [breadcrumbs, setBreadcrumbs] = useState([]);

    useEffect(() => {
        // Update breadcrumbs whenever the location changes
        const pathnames: any = location.pathname.split('/').filter((x) => x);
        setBreadcrumbs(pathnames);
    }, [location]);

    return (
        <Breadcrumb>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/notek_frontend' }}>
                Home
            </Breadcrumb.Item>
            {breadcrumbs.map((breadcrumb, index) => (
                <Breadcrumb.Item
                    key={breadcrumb}
                    linkAs={Link}
                    linkProps={{ to: `/${breadcrumbs.slice(0, index + 1).join('/')}` }}
                >
                    {breadcrumb}
                </Breadcrumb.Item>
            ))}
        </Breadcrumb>
    );
};

export default Breadcrumbs;
