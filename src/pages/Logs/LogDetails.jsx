import React, { useState, useEffect } from "react"
import { COLORS } from "../../utils/colors";
import CollapseComponent from "../../components/common/CollapseComponent";
import CommonTableLogs from "../../components/common/CommonTableLogs";
import { Apis } from "../../services/apis/Logs/Api";
import FullScreenLoader from "../../utils/FullScreenLoader";
import { useParams } from "react-router-dom";
import HeaderComponent from "../../components/common/HeaderComponent";

const LogDetails = () => {
    const { id } = useParams();
    const [loader, setLoader] = useState(false);
    const [errorResponse, setErrorResponse] = useState([]);
    useEffect(() => {
        Apis.transactionLogsDetails(id, setLoader, setErrorResponse);
    }, [id]);

    const buttons = [
        {
            label: "Download Template",
            link: "",
            icon: "",
            type: "label",
            bgColor: null,
            textColor: COLORS.darkCharcoal,
            fontSize: "18px",
            fontWeight: "bold",
        },
        {
            label: "Start Importing",
            link: "",
            icon: "icons/download.png",
            type: "submit",
            bgColor: COLORS.bgPrimary,
            textColor: "white",
            textSize: "14px",
            fontWeight: "normal",
        },
    ];
    const th2 = [
        {
            'title': 'Label',
        },
        {
            'title': 'Value',
        }


    ];

    return (
        <>{loader ? <FullScreenLoader bgTransparent={true} /> : ''}
            <HeaderComponent label="Log details" span="" buttons={buttons} />
            {/* Collapsible Section */}
            <CollapseComponent title="Import Description">
                <CommonTableLogs tableHeading={th2} datas={!!errorResponse && errorResponse.data} showFilter={false} />
            </CollapseComponent>


        </>
    )
}

export default React.memo(LogDetails)