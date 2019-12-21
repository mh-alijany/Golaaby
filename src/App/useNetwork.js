const os = require('os');
/**
 * this hook reflect all networks changes to useDNS_Info
 */
const useNetwork = () => {
    // this state represent Changes of Interface by toggle itself
    var [InterfaceChang, setInterfaceChang] = React.useState(true);
    // get connected interfaces of system
    let interfaces = Object.keys(os.networkInterfaces());

    React.useEffect(() => {
        // check for network changes in every 3 second
        var timer = setInterval(() => {
            // get list of connected interfaces 
            let newInterfaces = Object.keys(os.networkInterfaces());
            // if connected interface has been changed
            if (newInterfaces.toString() != interfaces.toString()) {
                setInterfaceChang(InterfaceChang => !InterfaceChang);
            }
            // update interfaces
            interfaces = newInterfaces;
        }, 3000);

        return () => clearInterval(timer);
    }, []);


    return InterfaceChang;
}

export default useNetwork;
