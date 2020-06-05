import { Navigation } from "react-native-navigation";
import { Provider } from 'react-redux';
import store from "../store";

import {
    LOGIN_SCREEN,
    SPLASH_SCREEN,
    CURRENT_PROGRESS,
    FRIENDS_LIST,
    USER_PROFILE,
    GROUPS_SCREEN,
} from "./constants";

import SplashScreen from "../ui/screens/SplashScreen";
import LoginScreen from "../ui/screens/LoginScreen";
import CurrentProgress from "../ui/screens/CurrentProgress";
import FriendsScreen from "../ui/screens/FriendsScreen";
import GroupsScreen from "../ui/screens/GroupsScreen";
import UserProfile from "../ui/screens/UserProfile";

Navigation.registerComponentWithRedux(SPLASH_SCREEN, () => SplashScreen, Provider, store);
Navigation.registerComponentWithRedux(LOGIN_SCREEN, () => LoginScreen, Provider, store);
Navigation.registerComponentWithRedux(CURRENT_PROGRESS, () => CurrentProgress, Provider, store);
Navigation.registerComponentWithRedux(FRIENDS_LIST, () => FriendsScreen, Provider, store);
Navigation.registerComponentWithRedux(GROUPS_SCREEN, () => GroupsScreen, Provider, store);
Navigation.registerComponentWithRedux(USER_PROFILE, () => UserProfile, Provider, store);

export const splashRoot = {
    root: {
        stack: {
            children: [
                {
                    component: {
                        id: SPLASH_SCREEN,
                        name: SPLASH_SCREEN,
                    }

                }
            ]
        }
    }
}

export const loginRoot = {
    root: {
        stack: {
            children: [
                {
                    component: {
                        id: LOGIN_SCREEN,
                        name: LOGIN_SCREEN,
                    }

                }
            ]
        }
    }
}

export const mainRoot = {
    root: {
        bottomTabs: {
            id: 'BOTTOM_TABS',
            children: [
                {
                    stack: {
                        id: 'DETAILS_TAB',
                        children: [
                            {
                                component: {
                                    id: CURRENT_PROGRESS,
                                    name: CURRENT_PROGRESS,
                                }

                            }
                        ],
                        options: {
                            bottomTab: {
                                icon: require('../assets/images/running/running.png'),
                                selectedIcon: require('../assets/images/running/runningSelected.png')
                            }
                        }
                    }
                },
                {
                    stack: {
                        id: 'FRIENDS_TAB',
                        children: [
                            {
                                component: {
                                    id: GROUPS_SCREEN,
                                    name: GROUPS_SCREEN,
                                }

                            }
                        ],
                        options: {
                            bottomTab: {
                                icon: require('../assets/images/friends/friends.png'),
                                selectedIcon: require('../assets/images/friends/friendsSelected.png')
                            }
                        }
                    }
                },
                {
                    stack: {
                        id: 'PROFILE_TAB',
                        children: [
                            {
                                component: {
                                    id: USER_PROFILE,
                                    name: USER_PROFILE,
                                }

                            }
                        ],
                        options: {
                            bottomTab: {
                                icon: require('../assets/images/profile/profile.png'),
                                selectedIcon: require('../assets/images/profile/profileSelected.png')
                            }
                        }
                    }
                }
            ]
        }
    }
}

export default () => {
    Navigation.setRoot(splashRoot);
}


