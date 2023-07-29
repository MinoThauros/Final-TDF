import { KeyboardAvoidingView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RecentExpenses from './screens/RecentExpensesScreen';
import Profile from './screens/Profile/Profile';
import {Ionicons} from '@expo/vector-icons';
import { Provider } from 'react-redux';
import { store } from './states/redux/store';
import {HeaderButton} from './components/Global/headerAddButton';
import OverlayToggleContextProvider from './states/context/InputOverlayContext';
import SpendingDetailsComponent from './screens/SpengingDetails';
import AllExpensesReactQuery from './ReactQ_screens/AllExpensesReactQuery';
import SpendingInputReactQ from './ReactQ_screens/SpendingInputReactQ';
import SpendingDetailsReactQ from './ReactQ_screens/SpendingDetailsReactQ';
import AuthPages from './screens/AuthPages';
import Colors from './constants/colors';
import ProfileForm from './screens/Profile/ProfileForm';
import CreateProfile from './screens/Profile/CreateProfile';
import EditProfile from './screens/Profile/EditProfile';

const Tab = createBottomTabNavigator();

const AuthStack = () => {
  return (
    <OverlayToggleContextProvider>
      <Provider store={store}>
      <KeyboardAvoidingView>
        <SpendingInputReactQ/>
      </KeyboardAvoidingView>
        <NavigationContainer>
          <Tab.Navigator 
          initialRouteName='AllExpensesReactQuery'
          screenOptions={{
            headerRight:({color,size}:any)=> <HeaderButton size={40}/>,
            headerStyle:{
              backgroundColor:Colors.Dark_Purple,
            },
            tabBarStyle:{
              backgroundColor:Colors.Dark_Purple,
              borderTopColor:Colors.Dark_Purple,
            },
            tabBarActiveTintColor:Colors.Tangerine,
            
            //tabBarInactiveTintColor:Colors.Columbia_blue,
            
            }}>
            {/*
            
            <Tab.Screen 
              name="All Expenses" 
              component={AllExpenses}
              options={{
                tabBarIcon: ({color,size}:any)=>(<Ionicons name="cash-outline" color={color} size={size}/>)
              }}/>
            */}          
            
            <Tab.Screen
              name="AllExpensesReactQuery"
              component={AllExpensesReactQuery}
              options={{
                tabBarIcon: ({color,size}:any)=>(<Ionicons name="receipt" color={color} size={size}/>),
                title:'All Expenses',
                headerTitleStyle:{
                  color:Colors.Tangerine,
                }
              }}/>
            <Tab.Screen 
              name="Recent expenses" 
              component={RecentExpenses}
              options={{
                tabBarIcon: ({color,size}:any)=>(<Ionicons name="wallet" color={color} size={size}/>),
                headerTitleStyle:{
                  color:Colors.Tangerine,
                }
              }}
              />
            <Tab.Screen 
              name="Profile"
              component={Profile}
              options={{
                tabBarIcon: ({color,size}:any)=>(<Ionicons name="person-outline" color={color} size={size}/>),
                headerTitleStyle:{
                  color:Colors.Tangerine,
                },
                title:'My Profile',
                
              }}/>
              
              {/**
               <Tab.Screen 
              name="Details"
              component={SpendingDetailsComponent}
              options={{
                tabBarButton: () => null
              }}/>
               */
              }
              <Tab.Screen
                name="CreateProfile"
                component={CreateProfile}
                options={{
                  tabBarButton: () => null,
                  title:'Create Profile',
                  headerTitleStyle:{
                    color:Colors.Tangerine,
                  }
              }}/>

              <Tab.Screen
                name="EditProfile"
                component={EditProfile}
                options={{
                  tabBarButton: () => null,
                  title:'Edit Profile',
                  headerTitleStyle:{
                    color:Colors.Tangerine,
                  }
              }}/>

              
          </Tab.Navigator>
        </NavigationContainer>
      </Provider>
    </OverlayToggleContextProvider>
  )
}

export default AuthStack