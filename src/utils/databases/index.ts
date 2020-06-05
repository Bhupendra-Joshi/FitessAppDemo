import Realm from 'realm';
import Schemas from './schemas'
import UserSchema from './schemas/User';

export const getData = (schema: any, condition?: string) => {
    return new Promise(
        (resolve, reject) => {
            Realm.open({
                schema: Schemas,
                deleteRealmIfMigrationNeeded: true
            }).then(
                realm => {
                    try {
                        if (condition) {
                            resolve(realm.objects(schema.name).filtered(condition));
                        } else {
                            resolve(realm.objects(schema.name));
                        }
                    } catch (error) {
                        reject("REALM =>" + error);
                    }
                });
        }
    )
}

export const fetchDataForPrimaryKey = (schema: any, primaryKey: string) => {
    return new Promise(
        (resolve, reject) => {
            Realm.open({
                schema: Schemas,
                deleteRealmIfMigrationNeeded: true
            }).then(
                realm => {
                    try {
                        resolve(realm.objectForPrimaryKey(schema.name, primaryKey));
                    } catch (error) {
                        reject("REALM =>" + error);
                    }
                });
        }
    )
}

export const saveData = (schema: any, data: any) => {
    return new Promise(
        (resolve, reject) => {
            Realm.open({
                schema: Schemas,
                deleteRealmIfMigrationNeeded: true
            }).then(
                realm => {
                    try {
                        console.log("REALM_PATH", realm.path);
                        realm.write(() => {
                            if (Array.isArray(data)) {
                                data.forEach(
                                    item => {
                                        resolve(realm.create(schema.name, item));
                                    });
                            } else {
                                resolve(realm.create(schema.name, data));
                            }
                        });
                    } catch (error) {
                        reject("REALM =>" + error);
                    }
                });
        }
    )
}

export const updateData = (object: any, updatedKey: string, updatedValue: any) => {
    return new Promise(
        (resolve, reject) => {
            Realm.open({
                schema: Schemas,
                deleteRealmIfMigrationNeeded: true
            }).then(
                realm => {
                    try {
                        realm.write(() => {
                            object[updatedKey] = updatedValue
                        });
                        resolve(object);
                    } catch (error) {
                        reject("REALM =>" + error);
                    }
                });
        }
    )
}

export const deleteAll = (schema: any, condition?: string) => {
    return new Promise(
        (resolve, reject) => {
            Realm.open({
                schema: Schemas,
                deleteRealmIfMigrationNeeded: true
            }).then(
                realm => {
                    try {
                        realm.write(() => {
                            if (condition) {
                                const data = realm.objects(schema.name).filtered(condition);
                                resolve(realm.delete(data));
                            } else {
                                resolve(realm.deleteAll());
                            }
                        })
                    } catch (error) {
                        reject("REALM =>" + error);
                    }
                });
        }
    )
}

export const setUpFriendsListAndGroups = () => {
    return new Promise(
        (resolve, reject) => {
            Realm.open({
                schema: Schemas,
                deleteRealmIfMigrationNeeded: true
            }).then(
                realm => {
                    try {
                        realm.write(() => {
                            const users = realm.objects(UserSchema.name);
                            console.log("DATA=>", users);
                            users[0].friends = [users[1], users[2], users[3]];
                            users[0].groups = [{
                                id: "1",
                                name: "Fitness Group 1",
                                members: [users[1], users[3]]
                            },
                            {
                                id: "2",
                                name: "Fitness Group 2",
                                members: [users[1], users[2]]
                            }];
                        })
                    } catch (error) {
                        reject("REALM =>" + error);
                    }
                });
        }
    )
}


export default {
    getData,
    fetchDataForPrimaryKey,
    saveData,
    deleteAll,
}