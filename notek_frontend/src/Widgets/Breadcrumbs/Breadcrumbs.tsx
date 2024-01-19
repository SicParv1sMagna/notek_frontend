import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

const Breadcrumbs = () => {
    const location = useLocation();
    const [breadcrumbs, setBreadcrumbs] = useState([]);

    useEffect(() => {
        // Update breadcrumbs whenever the location changes
        const pathnames = location.pathname.split('/').filter((x) => x);
        // @ts-ignore
        setBreadcrumbs(pathnames);
    }, [location]);

    const translations = {
        notek_frontend: 'На главную',
        editor: 'список маркдаунов'
        // Add more translations as needed
    };
    // @ts-ignore
    const translate = (key) => translations[key] || key;

    return (
        <Breadcrumb>
            {breadcrumbs.map((breadcrumb, index) => (
                <Breadcrumb.Item
                    key={breadcrumb}
                    linkAs={Link}
                    linkProps={{ to: `/${breadcrumbs.slice(0, index + 1).join('/')}` }}
                >
                    {translate(breadcrumb)}
                </Breadcrumb.Item>
            ))}
        </Breadcrumb>
    );
};

export default Breadcrumbs;
