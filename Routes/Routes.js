import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { TouchableOpacity } from 'react-native';
import DrawerContent from '../Screens/User/Drawer/DrawerContent';
import DrawerContentAdmin from '../Screens/Admin/Drawer/DrawerContentAdmin';
import { authContext } from '../Context/context';
import Login from '../Screens/Auth/Login';
import Register from '../Screens/Auth/Register';
import Splash from '../Screens/Splash/Splash';
import { colors } from '../Colors/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Home from '../Screens/Admin/Home/Home';
import Live from '../Screens/Admin/Live/Live';
import Lives from '../Screens/User/LiveUser/Lives';
import Apply from '../Screens/User/Apply/Apply';
import Feed from '../Screens/User/Feed/Feed';
import addTournament from '../Screens/Admin/Tournament/AddTournament/addTournament';
import Club_Regis from '../Screens/Admin/Club/Club_Regis';
import Profile from '../Screens/User/Profile/Profile';
import Tournaments from '../Screens/Admin/Tournament/Tournaments/Tournaments';
import Update from '../Screens/Admin/Tournament/UpdateTournament/Update';
import Cricket from '../Screens/Admin/Games/Cricket/Cricket';
import addCricket from '../Screens/Admin/Games/Cricket/addCricket';
import updateCricket from '../Screens/Admin/Games/Cricket/updateCricket';
import scores from '../Screens/User/Scores/scores';
import games from '../Screens/User/Scores/games';
import _Cricket from '../Screens/User/Scores/Games/_Cricket'
import CricketScore from '../Screens/User/Scores/Games/CricketScore';

import joinClub from '../Screens/User/Club/joinClub';
import clubDetails from '../Screens/User/Club/clubDetails';
import myClub from '../Screens/User/Club/myClub';
import Club_Main from '../Screens/User/Club/Club_Main';

import clubMemAppr from '../Screens/Admin/Club/clubMemAppr';
import clubView from '../Screens/Admin/Club/clubView';
import memView from '../Screens/Admin/Club/memView';
import clubAdminMain from '../Screens/Admin/Club/clubAdminMain';

import Invite from '../Screens/Admin/Invite/Invite';
import ViewApplication from '../Screens/Admin/Invite/ViewApplication';
import inviteMain from '../Screens/Admin/Invite/inviteMain';
import ViewApproved from '../Screens/Admin/Invite/ViewApproved';


import groundBooking from '../Screens/User/Booking/groundBooking';

import regisTeam from '../Screens/User/Tournament/regisTeam';
import viewTournament from '../Screens/User/Tournament/viewTournament';


const Drawer = createDrawerNavigator();
const Tabs = createMaterialBottomTabNavigator();

const AuthStack = createStackNavigator();
const FeedStack = createStackNavigator();
const BookingStack = createStackNavigator();

const HomeStack = createStackNavigator();
const LiveStack = createStackNavigator();
const LiveUserStack = createStackNavigator();
const TournamentStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const ClubStack = createStackNavigator();
const ClubAdminStack = createStackNavigator();

const InviteStack = createStackNavigator();

const UserScoresStack = createStackNavigator();

const TournamentUserStack = createStackNavigator();


//user 

const FeedStackScreen = ({ navigation }) => (
    <FeedStack.Navigator
        screenOptions={{
            headerStyle: {
                elevation: 0,
                backgroundColor: colors.primaryColor
            },
            headerLeft: () => (
                <TouchableOpacity onPress={() => { navigation.openDrawer() }} style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <AntDesign name="menuunfold" size={23} color={'#fff'} style={{ marginLeft: 10 }} />
                </TouchableOpacity>
            )
        }}

    >
        <FeedStack.Screen
            name="Feed"
            component={Feed}
            options={{
                headerStatusBarHeight: 0,
                headerTintColor: '#fff'
            }}
        />
    </FeedStack.Navigator>
)
const LiveUserStackScreen = ({ navigation }) => (
    <LiveUserStack.Navigator
        screenOptions={{
            headerStyle: {
                elevation: 0,
                backgroundColor: colors.primaryColor
            },
            headerLeft: () => (
                <TouchableOpacity onPress={() => { navigation.openDrawer() }} style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <AntDesign name="menuunfold" size={23} color={'#fff'} style={{ marginLeft: 10 }} />
                </TouchableOpacity>
            )
        }}

    >
        <LiveUserStack.Screen
            name="Live"
            component={Lives}
            options={{
                headerStatusBarHeight: 0,
                headerTintColor: '#fff'
            }}
        />
    </LiveUserStack.Navigator>
)
const InviteStackScreen = ({ navigation }) => (
    <InviteStack.Navigator
        screenOptions={{
            headerStyle: {
                elevation: 0,
                backgroundColor: colors.primaryColor
            },
            headerLeft: () => (
                <TouchableOpacity onPress={() => { navigation.openDrawer() }} style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <AntDesign name="menuunfold" size={23} color={'#fff'} style={{ marginLeft: 10 }} />
                </TouchableOpacity>
            )
        }}

    >
        <InviteStack.Screen
            name="inviteMain"
            component={inviteMain}
            options={{
                headerStatusBarHeight: 0,
                headerTintColor: '#fff'
            }}
        />
        <InviteStack.Screen
            name="Invite"
            component={Invite}
            options={{
                headerStatusBarHeight: 0,
                headerTintColor: '#fff'
            }}
        />
        <InviteStack.Screen
            name="ViewApplication"
            component={ViewApplication}
            options={{
                headerStatusBarHeight: 0,
                headerTintColor: '#fff'
            }}
        />
        <InviteStack.Screen
            name="ViewApproved"
            component={ViewApproved}
            options={{
                headerStatusBarHeight: 0,
                headerTintColor: '#fff'
            }}
        />
    </InviteStack.Navigator>
)
const ProfileStackScreen = ({ navigation }) => (
    <ProfileStack.Navigator
        screenOptions={{
            headerStyle: {
                elevation: 0,
                backgroundColor: '#fff'
            },
            headerLeft: () => (
                <TouchableOpacity onPress={() => { navigation.openDrawer() }} style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <AntDesign name="menuunfold" size={23} color={'#576574'} style={{ marginLeft: 10 }} />
                </TouchableOpacity>
            )
        }}

    >
        <ProfileStack.Screen
            name="Profile"
            component={Profile}
            options={{
                headerStatusBarHeight: 0,
                headerTintColor: '#fff'
            }}
        />
    </ProfileStack.Navigator>
)

const ClubStackScreen = ({ navigation }) => (
    <ClubStack.Navigator
        screenOptions={{
            headerStyle: {
                elevation: 0,
                backgroundColor: colors.primaryColor
            },
            headerLeft: () => (
                <TouchableOpacity onPress={() => { navigation.openDrawer() }} style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <AntDesign name="menuunfold" size={23} color={'#fff'} style={{ marginLeft: 10 }} />
                </TouchableOpacity>
            )
        }}

    >
        <ClubStack.Screen
            name="clubMain"
            component={Club_Main}
            options={{
                headerStatusBarHeight: 0,
                headerTintColor: '#fff'
            }}
        />
        <ClubStack.Screen
            name="joinClub"
            component={joinClub}
            options={{
                headerStatusBarHeight: 0,
                headerTintColor: '#fff'
            }}
        />
        <ClubStack.Screen
            name="clubDetails"
            component={clubDetails}
            options={{
                headerStatusBarHeight: 0,
                headerTintColor: '#fff'
            }}
        />
        <ClubStack.Screen
            name="myClub"
            component={myClub}
            options={{
                headerStatusBarHeight: 0,
                headerTintColor: '#fff'
            }}
        />
    </ClubStack.Navigator>
)

const ScoreStackScreen = ({ navigation }) => (
    <UserScoresStack.Navigator
        screenOptions={{
            headerStyle: {
                elevation: 0,
                backgroundColor: colors.primaryColor
            },
            headerLeft: () => (
                <TouchableOpacity onPress={() => { navigation.openDrawer() }} style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <AntDesign name="menuunfold" size={23} color={'#fff'} style={{ marginLeft: 10 }} />
                </TouchableOpacity>
            )
        }}

    >
        <UserScoresStack.Screen
            name="Scores"
            component={scores}
            options={{
                headerStatusBarHeight: 0,
                headerTintColor: '#fff'
            }}
        />
        <UserScoresStack.Screen
            name="userGames"
            component={games}
            options={{
                headerStatusBarHeight: 0,
                headerTintColor: '#fff'
            }}
        />
        <UserScoresStack.Screen
            name="_Cricket"
            component={_Cricket}
            options={{
                headerStatusBarHeight: 0,
                headerTintColor: '#fff'
            }}
        />
        <UserScoresStack.Screen
            name="CricketScore"
            component={CricketScore}
            options={{
                headerStatusBarHeight: 0,
                headerTintColor: '#fff'
            }}
        />
    </UserScoresStack.Navigator>
)



const TabScreen = () => (
    <Tabs.Navigator
        initialRouteName='Feed'
        shifting={true}
        barStyle={{
            backgroundColor: '#fff'
        }}
        activeColor={colors.primaryColor}
    >
        <Tabs.Screen
            name="Feed"
            component={FeedStackScreen}
            options={{
                tabBarIcon: ({ color }) => (
                    <Icon name='newspaper-variant-outline' color={color} size={23} />
                )
            }}
        />
        <Tabs.Screen
            name="Live"
            component={LiveUserStackScreen}
            options={{
                tabBarIcon: ({ color }) => (
                    <MaterialIcons name='live-tv' color={color} size={23} style={{}} />
                )
            }}
        />
        <Tabs.Screen
            name="Scores"
            component={ScoreStackScreen}
            options={{
                tabBarIcon: ({ color }) => (
                    <Icon name='scoreboard-outline' color={color} size={23} style={{}} />
                )
            }}
        />

    </Tabs.Navigator>
)


const TournamentUserStackScreen = ({ navigation }) => (

    <TournamentUserStack.Navigator
        screenOptions={{
            headerStyle: {
                elevation: 0,
                backgroundColor: colors.primaryColor
            },
            headerLeft: () => (
                <TouchableOpacity onPress={() => { navigation.openDrawer() }} style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <AntDesign name="menuunfold" size={23} color={'#fff'} style={{ marginLeft: 10 }} />
                </TouchableOpacity>
            )
        }}

    >

        <TournamentUserStack.Screen
            name="viewTournament"
            component={viewTournament}
            options={{
                headerStatusBarHeight: 0,
                headerTintColor: '#fff'
            }}
        />

    </TournamentUserStack.Navigator>

)

// user end------------------------------------------------------------------

// admin----------------------------------------------------------------------

const HomeStackScreen = ({ navigation }) => (
    <HomeStack.Navigator
        screenOptions={{
            headerStyle: {
                elevation: 0,
                backgroundColor: colors.primaryColor
            },
            headerLeft: () => (
                <TouchableOpacity onPress={() => { navigation.openDrawer() }} style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <AntDesign name="menuunfold" size={23} color={'#fff'} style={{ marginLeft: 10 }} />
                </TouchableOpacity>
            )
        }}

    >
        <HomeStack.Screen
            name="Home"
            component={Home}
            options={{
                headerStatusBarHeight: 0,
                headerTintColor: '#fff'
            }}
        />
    </HomeStack.Navigator>
)

const LiveStackScreen = ({ navigation }) => (
    <LiveStack.Navigator
        screenOptions={{
            headerStyle: {
                elevation: 0,
                backgroundColor: colors.primaryColor
            },
            headerLeft: () => (
                <TouchableOpacity onPress={() => { navigation.openDrawer() }} style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <AntDesign name="menuunfold" size={23} color={'#fff'} style={{ marginLeft: 10 }} />
                </TouchableOpacity>
            )
        }}

    >
        <LiveStack.Screen
            name="Live"
            component={Live}
            options={{
                headerStatusBarHeight: 0,
                headerTintColor: '#fff'
            }}
        />
    </LiveStack.Navigator>
)

const TournamentStackScreen = ({ navigation }) => (
    <TournamentStack.Navigator
        screenOptions={{
            headerStyle: {
                elevation: 0,
                backgroundColor: colors.primaryColor
            },
            headerLeft: () => (
                <TouchableOpacity onPress={() => { navigation.openDrawer() }} style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <AntDesign name="menuunfold" size={23} color={'#fff'} style={{ marginLeft: 10 }} />
                </TouchableOpacity>
            )
        }}

    >
        <TournamentStack.Screen
            name="Tournaments"
            component={Tournaments}
            options={{
                headerStatusBarHeight: 0,
                headerTintColor: '#fff'
            }}
        />
        <TournamentStack.Screen
            name="AddTournaments"
            component={addTournament}
            options={{
                headerStatusBarHeight: 0,
                headerTintColor: '#fff'
            }}
        />
        <TournamentStack.Screen
            name="Update"
            component={Update}
            options={{
                headerStatusBarHeight: 0,
                headerTintColor: '#fff'
            }}
        />
        <TournamentStack.Screen
            name="Cricket"
            component={Cricket}
            options={{
                headerStatusBarHeight: 0,
                headerTintColor: '#fff'
            }}
        />
        <TournamentStack.Screen
            name="addCricket"
            component={addCricket}
            options={{
                headerStatusBarHeight: 0,
                headerTintColor: '#fff'
            }}
        />
        <TournamentStack.Screen
            name="updateCricket"
            component={updateCricket}
            options={{
                headerStatusBarHeight: 0,
                headerTintColor: '#fff'
            }}
        />

    </TournamentStack.Navigator>
)

const ClubAdminStackScreen = ({ navigation }) => (

    <ClubAdminStack.Navigator
        screenOptions={{
            headerStyle: {
                elevation: 0,
                backgroundColor: colors.primaryColor
            },
            headerLeft: () => (
                <TouchableOpacity onPress={() => { navigation.openDrawer() }} style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <AntDesign name="menuunfold" size={23} color={'#fff'} style={{ marginLeft: 10 }} />
                </TouchableOpacity>
            )
        }}

    >

        <ClubAdminStack.Screen
            name="clubAdminMain"
            component={clubAdminMain}
            options={{
                headerStatusBarHeight: 0,
                headerTintColor: '#fff'
            }}
        />

        <ClubAdminStack.Screen
            name="Club_Regis"
            component={Club_Regis}
            options={{
                headerStatusBarHeight: 0,
                headerTintColor: '#fff'
            }}
        />

        <ClubAdminStack.Screen
            name="clubMemAppr"
            component={clubMemAppr}
            options={{
                headerStatusBarHeight: 0,
                headerTintColor: '#fff'
            }}
        />

        <ClubAdminStack.Screen
            name="clubView"
            component={clubView}
            options={{
                headerStatusBarHeight: 0,
                headerTintColor: '#fff'
            }}
        />

        <ClubAdminStack.Screen
            name="memView"
            component={memView}
            options={{
                headerStatusBarHeight: 0,
                headerTintColor: '#fff'
            }}
        />

    </ClubAdminStack.Navigator>

)

const TabScreenAdmin = () => (
    <Tabs.Navigator
        initialRouteName='Home'
        shifting={true}
        barStyle={{
            backgroundColor: '#fff'
        }}
        activeColor={colors.primaryColor}
    >
        <Tabs.Screen
            name="Feed"
            component={HomeStackScreen}
            options={{
                tabBarIcon: ({ color }) => (
                    <Icon name='newspaper-variant-outline' color={color} size={23} />
                )
            }}
        />
        <Tabs.Screen
            name="Tournament"
            component={TournamentStackScreen}
            options={{
                tabBarIcon: ({ color }) => (
                    <Ionicons name='ios-trophy-outline' color={color} size={26} style={{}} />
                )
            }}
        />
        <Tabs.Screen
            name="Live"
            component={LiveStackScreen}
            options={{
                tabBarIcon: ({ color }) => (
                    <MaterialIcons name='live-tv' color={color} size={23} style={{}} />
                )
            }}
        />

        {/* <Tabs.Screen
            name="Invite"
            component={InviteStackScreen}
            options={{
                tabBarIcon: ({ color }) => (
                    <MaterialIcons name='live-tv' color={color} size={23} style={{}} />
                )
            }}
        /> */}
    </Tabs.Navigator>
)
// admin end

function Routes(props) {



    const [userToken, setUserToken] = useState(null);
    const [isAdmin, setIsAdmin] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        // setregStatus('registered');
        readUser();
        setTimeout(() => {
            setLoading(false);
        }, 2500)
    }, [])

    getData = async (key) => {
        try {
            const jsonValue = await AsyncStorage.getItem(key)
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            // error reading value
        }
    }

    readUser = () => {
        getData('Login').then(result => {
            console.log('routes')
            console.log(result);
            setUserToken(result.status);
        })
        getData('IsAdmin').then(result => {
            setIsAdmin(result.status);
        })
    }


    // inside context direct function calls are not working thats why all function is written
    const context = React.useMemo(() => {
        return {
            login: () => {
                getData('IsAdmin').then(result => {
                    setIsAdmin(result.status);
                })
                getData('Login').then(result => {
                    console.log('routes')
                    console.log(result);
                    setUserToken(result.status);
                })
                setLoading(false);
            },
            logout: () => {
                getData('Login').then(result => {
                    console.log('routes')
                    console.log(result);
                    setUserToken(result.status);
                })
                setLoading(false);
            }
        }
    }, [])
    return (
        loading ? <Splash /> :
            <authContext.Provider value={context}>
                <NavigationContainer>

                    {
                        userToken !== null ?

                            isAdmin == false ?

                                // if the drawer type is not back there will be glitch when loading
                                <Drawer.Navigator drawerType="back" drawerContent={props => <DrawerContent {...props} />}>
                                    <Drawer.Screen
                                        name="FeedDrawer"
                                        component={TabScreen}
                                    />

                                    <Drawer.Screen
                                        name="Apply"
                                        component={Apply}
                                    />
                                    <Drawer.Screen
                                        name="Club_Main"
                                        component={ClubStackScreen}
                                    />
                                    <Drawer.Screen
                                        name="Profile"
                                        component={ProfileStackScreen}
                                    />
                                    <Drawer.Screen
                                        name="groundBooking"
                                        component={groundBooking}
                                    />
                                    <Drawer.Screen
                                        name="TournamentUserStackScreen"
                                        component={TournamentUserStackScreen}
                                    />
                                </Drawer.Navigator>

                                :

                                <Drawer.Navigator drawerType="back" drawerContent={props => <DrawerContentAdmin {...props} />}>
                                    <Drawer.Screen
                                        name="FeedDrawer"
                                        component={TabScreenAdmin}
                                    />
                                    <Drawer.Screen
                                        name="InviteStackScreen"
                                        component={InviteStackScreen}
                                    />
                                    {/* <Drawer.Screen
                                        name="ViewApplication"
                                        component={ViewApplication}
                                    /> */}
                                    <Drawer.Screen
                                        name="ClubAdminStackScreen"
                                        component={ClubAdminStackScreen}
                                    />

                                </Drawer.Navigator>

                            :


                            <AuthStack.Navigator headerMode="none">
                                <AuthStack.Screen
                                    name="Login"
                                    component={Login}
                                />
                                <AuthStack.Screen
                                    name="Register"
                                    component={Register}
                                />
                            </AuthStack.Navigator>

                    }
                </NavigationContainer>
            </authContext.Provider>
    );
}

export default Routes;