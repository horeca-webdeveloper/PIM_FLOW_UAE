import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Apis } from "../../services/apis/ImportExport/Api";
import HeaderComponent from "../../components/common/HeaderComponent";
import { COLORS } from "../../utils/colors";
import CommonTable from "../../components/common/CommonTable";
import InputComponent from "../../components/common/InputComponent";
import CollapseComponent from "../../components/common/CollapseComponent";
import FullScreenLoader from "../../utils/FullScreenLoader";
import { notify } from "../../utils/notify";
import Logs from "../Logs/Logs";
import ImportZipLogs from "../../components/ui/Logs/ImportZipLogs";

const ImportImages = () => {
    const [loader, setLoader] = useState(false);
    const [response, setResponse] = useState([]);
    const [module, setModule] = useState('Product');
    const [action, setAction] = useState('Import');
    const [showLogs, setShowLogs] = useState(true);
    const url = "/product/upload-images";
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
        formData.append("zip_file", file);
        await Apis.importImages(formData, setLoader, setResponse, url);
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
        }
    }, [response])
    console.log("res",response);
    return (
        <>
            {loader && <FullScreenLoader bgTransparent={true} />}
            <form onSubmit={handleSubmit(onSubmit)}>
                <HeaderComponent label="Import Images" span="" buttons={buttons} />

                {/* Collapsible Section */}
                <CollapseComponent title="Import">
                    <div className="space-y-4">
                        <label>ZIP file containing product images organized in folders by SKU</label>
                        <InputComponent
                            label="Upload File"
                            type="file"
                           accept=".zip"
                            {...register("file", { required: "File is required" })}
                        />
                        {errors.file && <p className="text-red-500">{errors.file.message}</p>}
                    </div>
                </CollapseComponent>
    <CollapseComponent title="Import History">
    <ImportZipLogs datas={!!response && response?.processed_skus}/>

    </CollapseComponent>
             

            </form>
        </>
    );
};

export default React.memo(ImportImages);
