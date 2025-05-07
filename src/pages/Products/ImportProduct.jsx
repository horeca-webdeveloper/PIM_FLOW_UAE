import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Apis } from "../../services/apis/ImportExport/Api";
import HeaderComponent from "../../components/common/HeaderComponent";
import { COLORS } from "../../utils/colors";
import CommonTable from "../../components/common/CommonTable";
import InputComponent from "../../components/common/InputComponent";
import CollapseComponent from "../../components/common/CollapseComponent";
import FullScreenLoader from "../../utils/FullScreenLoader";
import { notify,notifyError } from "../../utils/notify";
import Logs from "../Logs/Logs";

const ImportProduct = () => {
    const [loader, setLoader] = useState(false);
    const [response, setResponse] = useState([]);
    const [module, setModule] = useState('Product');
    const [action, setAction] = useState('Import');
    const [showLogs, setShowLogs] = useState(true);
    const url = "/products/import";
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();



    const onSubmit = async (data) => {
        if (!data.file || data.file.length === 0) {
            console.error("No file selected!");
            return;
        }

        const file = data.file[0]; // Get the uploaded file
        // Create FormData object to send the file
        const formData = new FormData();
        formData.append("upload_file", file);
        await Apis.importData(formData, setLoader, setResponse, url);
        reset();
    };


    const buttons = [
        {
            label: "Download Template",
            link: `/template-product-export.csv`,
            download: true,
            icon: "",
            type: "label",
            bgColor: COLORS.bgPrimary,
            textColor: "white",
            textSize: "14px",
            fontWeight: "normal",
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



    useEffect(() => {
        if (response.success) {
            notify(response.message);
            setShowLogs(!showLogs);
        }else if(response.success===false){
            notifyError(response.message[0]);
        }
    }, [response])

   
    return (
        <>
            {loader && <FullScreenLoader bgTransparent={true} />}
            <form onSubmit={handleSubmit(onSubmit)}>
                <HeaderComponent label="Import Products" span="" buttons={buttons} />

                {/* Collapsible Section */}
                <CollapseComponent title="Import">
                    <div className="space-y-4">
                        <InputComponent
                            label="Upload File"
                            type="file"
                            accept=".csv,text/csv"
                            {...register("file", { required: "File is required" })}
                        />
                        {errors.file && <p className="text-red-500">{errors.file.message}</p>}
                    </div>
                </CollapseComponent>

                <Logs module={module} action={action} setShowLogs={setShowLogs} showLogs={showLogs} />

            </form>
        </>
    );
};

export default React.memo(ImportProduct);
