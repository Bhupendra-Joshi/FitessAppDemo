import { USER_SCHEMA_NAME } from "./User";

export const STEPS_SCHEMA_NAME = 'Steps';

const ID = 'id';
const USER_ID = "userId";
const DATE = 'date';
const COUNT = 'count';
const TARGET = 'target';

export const STEPS_SCHEMA_ATTRIBUTES = {
    ID,
    USER_ID,
    DATE,
    COUNT,
    TARGET,
}

const StepsSchema = {
    name: STEPS_SCHEMA_NAME,
    primaryKey: 'id',
    properties: {
        [ID]: 'string',
        [USER_ID]: 'string',
        [DATE]: 'int',
        [COUNT]: 'int',
        [TARGET]: 'int',
    }
}

export default StepsSchema;