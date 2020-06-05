import { getData } from ".."
import UserSchema, { USER_SCHEMA_ATTRIBUTES } from "../schemas/User"


export const authenticateUser = (userName: string, password: string) => {
    return getData(UserSchema,
        `(${USER_SCHEMA_ATTRIBUTES.EMAIL} = ${userName} OR ${USER_SCHEMA_ATTRIBUTES.MOBILE} = ${userName})
            AND ${USER_SCHEMA_ATTRIBUTES.PASSWORD} = ${password}`)
}