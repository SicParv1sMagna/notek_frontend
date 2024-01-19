import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

const translateBreadcrumb = (breadcrumb) => {
    // Ваш словарь сопоставления английских и русских названий
    const translationDict = {
        notek_frontend: 'Главная',
        "edit-markdown": 'Редактор',
        "history": "Запросы на редактирование",
        "editor": "Редактор"
        // Добавьте другие сопоставления по мере необходимости
    };

    return translationDict[breadcrumb] || breadcrumb;
};

const Breadcrumbs = () => {
    const location = useLocation();
    const [breadcrumbs, setBreadcrumbs] = useState([]);

    useEffect(() => {
        // Update breadcrumbs whenever the location changes
        const pathnames = location.pathname.split('/').filter((x) => x);
        setBreadcrumbs(pathnames);
    }, [location]);

    return (
        <Breadcrumb style={{ display: 'flex', alignItems: 'center'}}>
            <>
                {breadcrumbs.map((breadcrumb, index) => (
                    <Breadcrumb.Item
                        key={breadcrumb}
                        linkAs={Link}
                        linkProps={{ to: `/${breadcrumbs.slice(0, index + 1).join('/')}` }}
                        style={{ margin: 'auto' }}
                    >
                        {translateBreadcrumb(breadcrumb)}
                    </Breadcrumb.Item>
                ))}
            </>
        </Breadcrumb>
    );
};

export default Breadcrumbs;
