const os = require('os');

const useNetwork = () => {
    // state which represent Interface Changes by toggle
    var [InterfaceChang, setInterfaceChang] = React.useState(true);
    // get connected interfaces of system
    let interfaces = Object.keys(os.networkInterfaces());

    React.useEffect(() => {
        // check for network changes every 3 second
        var timer = setInterval(() => {
            // get connected interfaces list
            let newInterfaces = Object.keys(os.networkInterfaces());
            // if connected interface has changed
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
