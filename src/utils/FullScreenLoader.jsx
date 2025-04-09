import Loader from "./Loader";
const FullScreenLoader=({bgTransparent})=>{
    return (<div className={`w-full h-[100vh] flex items-center justify-center ${!bgTransparent?'bg-white':''} fixed left-0 top-0 z-[999]`}>
        <Loader />
    </div>);
}


export default FullScreenLoader;
