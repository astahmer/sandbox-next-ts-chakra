import axios, { AxiosRequestConfig } from "axios";

export async function sampleFetchWrapper(url: string, config?: AxiosRequestConfig) {
    try {
        const data = await axios(url, config).then((res) => res.data);
        return data;
    } catch (err) {
        throw new Error(err.message);
    }
}
