import { KeyboardAvoidingView, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RecentExpenses from './screens/Expenses/RecentExpensesScreen';
import Profile from './screens/Profile/Profile';
import {Ionicons} from '@expo/vector-icons';
import {HeaderButton} from './components/Global/headerAddButton';
import OverlayToggleContextProvider from './states/context/InputOverlayContext';
import AllExpensesReactQuery from './ReactQ_screens/AllExpensesReactQuery';
import SpendingInputReactQ from './ReactQ_screens/SpendingInputReactQ';
import Colors from './constants/colors';
import CreateProfile from './screens/Profile/CreateProfile';
import EditProfile from './screens/Profile/EditProfile';
import PlaceForm from './screens/Expenses/PlaceForm';
import ExpenseWithImageForm from './screens/Expenses/ExpenseWithImageForm';

const Tab = createBottomTabNavigator();

const AuthStack = () => {
  return (
    <View style={{flex:1}}>
      <OverlayToggleContextProvider>
      <KeyboardAvoidingView>
      </KeyboardAvoidingView>
        <NavigationContainer>
        <SpendingInputReactQ/>
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
            
            }}>   
            
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

              <Tab.Screen
                name="PlaceForm"
                component={PlaceForm}
                options={{
                  tabBarButton: () => null,
                  title:'Spending Form',
                  headerTitleStyle:{
                    color:Colors.Tangerine,
                  }
                }}/>

            <Tab.Screen
              name="ExpenseWithImageForm"
              component={ExpenseWithImageForm}
              options={{
                tabBarButton: () => null,
                headerTitleStyle:{
                  color:Colors.Tangerine,
                }
              }}/>

              
          </Tab.Navigator>
        </NavigationContainer>
    </OverlayToggleContextProvider>
    </View>
    
  )
}

export default AuthStack