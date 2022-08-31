import client from "ipfs-http-client";

export const auth =
    "Basic " +
    Buffer.from(
        process.env.INFURA_ID + ":" + process.env.INFURA_SECRET
    ).toString("base64");

export const uploadToIPFS = async (file: any) => {
    const ipfs = client.create({
        host: "ipfs.infura.io",
        port: 5001,
        protocol: "https",

        headers: {
            authorization: auth,
        },
    });
    const files = await ipfs.add(file);
    return files[0].hash;
};
