import { faMoneyBill1 } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactPDF, { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { useRef } from 'react';

function RenderPDF({ children }) {
    const documentRef = useRef();

    const actionClick = () => {
        ReactPDF.render(documentRef.current, `download.pdf`);
    };

    return <></>;
}

export default RenderPDF;
