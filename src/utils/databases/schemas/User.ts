import { STEPS_SCHEMA_NAME } from "./Steps";
import { GROUP_SCHEMA_NAME } from "./Groups";

const ID = 'id';
const EMAIL = "email";
const MOBILE = 'mobile';
const PASSWORD = 'password';
const TOKEN = 'token';
const NAME = 'name';
const PROFILE_IMAGE = 'profileImage';
const FRIENDS = 'friends';
const GROUPS = 'groups';
const STEPS = 'steps';
const CURRENT_TARGET = 'currentTarget';

export const USER_SCHEMA_NAME = 'User';
export const USER_SCHEMA_ATTRIBUTES = {
    ID,
    EMAIL,
    MOBILE,
    PASSWORD,
    TOKEN,
    NAME,
    PROFILE_IMAGE,
    FRIENDS,
    GROUPS,
    STEPS,
    CURRENT_TARGET,
}

const UserSchema = {
    name: USER_SCHEMA_NAME,
    primaryKey: 'id',
    properties: {
        [ID]: 'string',
        [EMAIL]: 'string',
        [MOBILE]: 'string',
        [PASSWORD]: 'string',
        [TOKEN]: 'string?',
        [NAME]: 'string',
        [PROFILE_IMAGE]: 'string?',
        [FRIENDS]: `${USER_SCHEMA_NAME}[]`,
        [GROUPS]: `${GROUP_SCHEMA_NAME}[]`,
        [STEPS]: `${STEPS_SCHEMA_NAME}[]`,
        [CURRENT_TARGET]: 'int?',
    }
}

export default UserSchema;