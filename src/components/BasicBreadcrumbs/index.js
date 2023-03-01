import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
}

export default function BasicBreadcrumbs({ list = [] }) {
    return (
        <div role="presentation" onClick={handleClick}>
            <Breadcrumbs aria-label="breadcrumb">
                {list.map((item) => {
                    return (
                        <Link underline="hover" color="inherit" href={item.url}>
                            {item.title}
                        </Link>
                    );
                })}

                <Link underline="hover" color="inherit" href="/material-ui/getting-started/installation/">
                    Core
                </Link>
                <Typography color="text.primary">Breadcrumbs</Typography>
            </Breadcrumbs>
        </div>
    );
}
