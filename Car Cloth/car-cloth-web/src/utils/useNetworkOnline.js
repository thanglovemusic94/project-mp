import {Network} from "@capacitor/network";

export const useNetworkOnline =  async () => {
    const status = await Network.getStatus();
    return Promise.resolve(status)
};
