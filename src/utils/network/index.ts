import { getData, updateData } from "../databases";
import UserSchema, { USER_SCHEMA_ATTRIBUTES } from "../databases/schemas/User";
import { LOGIN, GET_USER_DATA, UPDATE_USER_STEPS } from "./constants";
const commonHeaders = {

}

const fetchRequest = (
    url: string,
    options?: any
) => {
    return new Promise((resolve, reject) => {
        const {
            method = "GET",
            headers = {},
            payload,
        } = options || {};

        const requestOptions = {
            method,
            headers: { ...commonHeaders, ...headers },
            body: payload && JSON.stringify(payload)
        }

        if (url == LOGIN) {
            const query = `(${USER_SCHEMA_ATTRIBUTES.EMAIL} = "${payload.userName}"`
                + ` OR ${USER_SCHEMA_ATTRIBUTES.MOBILE} = "${payload.userName}")`
                + ` AND ${USER_SCHEMA_ATTRIBUTES.PASSWORD} = "${payload.password}"`
            getData(UserSchema, query)
                .then(user => {
                    if (user) {
                        resolve(user);
                    } else {
                        reject();
                    }
                });
        } else if (url == GET_USER_DATA) {
            const query = `${USER_SCHEMA_ATTRIBUTES.TOKEN} = "${payload.token}"`

            getData(UserSchema, query)
                .then(user => {
                    if (user) {
                        resolve(user);
                    } else {
                        reject();
                    }
                });
        } else if (url == UPDATE_USER_STEPS) {

            updateData(payload.realmObject, payload.key, payload.value)
                .then(user => {
                    if (user) {
                        resolve(user);
                    } else {
                        reject();
                    }
                });
        } else {
            fetch(url, requestOptions)
                .then(response => {
                    if (response.status >= 200 && response.status < 300) {
                        resolve(response.json())
                    } else {
                        reject("Something went wrong!!");
                    }
                }
                ).catch(error => {
                    reject(error);
                });
        }
    })

}

export default fetchRequest;