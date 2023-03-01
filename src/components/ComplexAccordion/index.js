import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';

export default function ComplexAccordion({ introduction, children, main = false }) {
    const [openState, setOpenState] = useState(main);

    return (
        <div className="w-full">
            <Accordion expanded={openState}>
                <AccordionSummary
                    onClick={(e) => {
                        setOpenState(!openState);
                    }}
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>{introduction}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>{children}</Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}
