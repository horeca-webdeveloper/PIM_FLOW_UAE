import React, { useState } from "react"
import HeaderComponent from "../../components/common/HeaderComponent"
import { COLORS } from "../../utils/colors";
import CommonTable from "../../components/common/CommonTable";
import CollapseComponent from "../../components/common/CollapseComponent";
import CommonTableLogs from "../../components/common/CommonTableLogs";
const ImportProductLog = () => {
    const options = ["Option One", "Option Two", "Option Three", "Option Four"];
    const buttons = [
        {
            'label': 'Download Template',
            'link': '',
            'icon': '',
            'type': 'label',
            'bgColor': null,
            'textColor': COLORS.darkCharcoal,
            'fontSize': '18px',
            'fontWeight': 'bold'
        },
        {
            'label': 'Download',
            'link': '/product/import',
            'icon': 'icons/download.png',
            'type': 'button',
            'bgColor': COLORS.bgPrimary,
            'textColor': 'white',
            'textSize': '14px',
            'fontWeight': 'normal'
        }

    ];

    const [formState, setFormState] = useState({
        file: "",
        fileType: "",

    });



    const th = [
        {
            title: 'ID',
            key: 'id',
        },
        {
            title: 'Module',
            key: 'module',
        },
        {
            title: 'Action',
            key: 'action',
        },
        {
            title: 'Status',
            key: 'status',
        },
        {
            title: 'Identifier',
            key: 'identifier',
        },
        {
            title: 'Created By',
            key: 'createdBy',
        },
        {
            title: 'Created Time',
            key: 'createdTime',
        }
    ];

    const datas = [
        {
            id: 1,
            module: "User Management",
            action: "Created",
            status: "Active",
            identifier: "USR123",
            createdBy: "Admin",
            createdTime: "2025-02-26 10:00 AM",
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



    const datas2 = [
        {
            'Total Count': 1500,
            'Success Count': 0,
            'Failed Count': 0,
            'Errors': `<span class="font-bold text-black">Row Number :2</span> <br/>
            Lorem ipsum dolor sit amet consectetur Vel tellus ultricies integer nunc.
            Orci aliquam ornare at at donec egestas sit facilisi augue. Magnis morbi dolor aenean sed sit libero enim egestas ac Et nulla.
            Lorem ipsum dolor sit amet consectetur Vel tellus ultricies integer nunc. Orci aliquam ornare at at donec egestas sit facilisi augue. 
            Magnis morbi dolor aenean sed sit libero enim egestas ac Et nulla.
            <br/>
            <br/>
            <br/>
            <span class="font-bold text-black">Row Number :25</span> <br/>
            Lorem ipsum dolor sit amet consectetur Vel tellus ultricies integer nunc.
            Orci aliquam ornare at at donec egestas sit facilisi augue. Magnis morbi dolor aenean sed sit libero enim egestas ac Et nulla.
            Lorem ipsum dolor sit amet consectetur Vel tellus ultricies integer nunc. Orci aliquam ornare at at donec egestas sit facilisi augue. 
            Magnis morbi dolor aenean sed sit libero enim egestas ac Et nulla.
            `,
        },
    ];
    return (
        <>
            <HeaderComponent label="Import Log" span="" buttons={buttons} />
            <CommonTable tableHeading={th} datas={datas} options={options} showFilter={true} />
            {/* Collapsible Section */}
            <CollapseComponent title="Import Description">
                <CommonTableLogs tableHeading={th2} datas={datas2} showFilter={false} />
            </CollapseComponent>


        </>
    )
}

export default React.memo(ImportProductLog)