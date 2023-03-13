import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import DoneIcon from '@mui/icons-material/Done';

const steps = [
    {
        name: 'Xác nhận thông tin thanh toán',
    },
    {
        name: 'Xử lý đơn hàng',
    },
    {
        name: 'Chờ lấy hàng',
    },
    {
        name: 'Đang giao',
    },
    {
        name: 'Giao thành công',
    },
];

export default function OrderStepper({ status = 1 }) {
    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={status} alternativeLabel>
                {steps.map((label, index) => (
                    <Step key={index}>
                        <StepLabel StepIconComponent={label.icon}>{label.name}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Box>
    );
}
