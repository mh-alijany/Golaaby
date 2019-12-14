const os = require('os');

const useNetwork = () => {
    var [InterfaceChang, setInterfaceChang] = React.useState(true);
    let interfaces = Object.keys(os.networkInterfaces());

    React.useEffect(() => {
        var timer = setInterval(() => {
            let newInterfaces = Object.keys(os.networkInterfaces());
            if (newInterfaces.toString() != interfaces.toString()) {
                setInterfaceChang(!InterfaceChang);
                console.log("change");
            }
            interfaces = newInterfaces;
        }, 3000);
        return () => clearInterval(timer);
    }, []);


    return InterfaceChang;
}

export default useNetwork;
