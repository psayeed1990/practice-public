const client = require("ipfs-http-client");

const auth =
    "Basic " +
    Buffer.from(
        "2BQGX8vqismAYkAYdYNI3kR1aaw" + ":" + "ad80e3c9fc980614e35015b4b560891f"
    ).toString("base64");

const uploadToIPFS = async (file) => {
    const ipfs = client.create({
        host: "ipfs.infura.io",
        port: 5001,
        protocol: "https",

        headers: {
            authorization: auth,
        },
    });
    const files = await ipfs.add("Hello World");
    return files[0].hash;
};
