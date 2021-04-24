import React from "react";

// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Screens
import HomeScreen from "./Screens/HomeScreen";

// Redux
import { Provider } from "react-redux";
import store from "./store";

const Stack = createStackNavigator();

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{ animationEnabled: false }}
            initialRouteName="Home"
          >
            <Stack.Screen
              options={{ headerShown: false, gestureEnabled: false }}
              name="Home"
              component={HomeScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

export default App;
