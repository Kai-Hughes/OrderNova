import axios from "axios";

export const otherAPIAuth = async () => {
    try {
        const registerResponse = await axios.post(
        "https://seng2021-t11a-gg.9n5c02mxxr5nc.ap-southeast-2.cs.amazonlightsail.com/register",
            {
                username: "FantasticFive",
                email: "kaijohnhughes2004@gmail.com",
                password: "ILOVEMONEY1!"
            }
        );
        const loginResponse = await axios.post(
            "https://seng2021-t11a-gg.9n5c02mxxr5nc.ap-southeast-2.cs.amazonlightsail.com/login",
                {
                    email: "kaijohnhughes2004@gmail.com",
                    password: "ILOVEMONEY1!"
                }
            );
        return loginResponse.data.token;
    } catch (error) {
        const loginResponse = await axios.post(
            "https://seng2021-t11a-gg.9n5c02mxxr5nc.ap-southeast-2.cs.amazonlightsail.com/login",
                {
                    email: "kaijohnhughes2004@gmail.com",
                    password: "ILOVEMONEY1!"
                }
            );
        return loginResponse.data.token;
    }
};
