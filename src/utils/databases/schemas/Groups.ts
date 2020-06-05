import { USER_SCHEMA_NAME } from "./User";

const ID = 'id';
const NAME = 'name';
const MEMBERS = "members";

export const GROUP_SCHEMA_NAME = 'Group';
export const GROUP_SCHEMA_ATTRIBUTES = {
    ID,
    NAME,
    MEMBERS,
}

const GroupsSchema = {
    name: GROUP_SCHEMA_NAME,
    primaryKey: 'id',
    properties: {
        [ID]: 'string',
        [NAME]: 'string',
        [MEMBERS]: `User[]`,
    }
}

export default GroupsSchema;