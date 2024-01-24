import Api from "./Api"

const useMoch = () => {
    Api.post("/login",{token:'ebdsjcdkosoqe3r4gnfvnwoe2g94nvsjka23f0vslvnsk39jsncje239'});
    Api.post("/get_Login_code",{message:'Mobile number is not registered'});
    Api.post("/register",{});
}

export default useMoch