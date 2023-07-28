import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import ListUsers from "../screens/ListUsers";
import EditUser from "../screens/EditUser";
import FormScreen from "../screens/FormScreen";

const Routes = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ title: "Home" }}
        name="HomeScreen"
        component={Home}
      />

      <Stack.Screen
        options={{ title: "Formulário" }}
        name="ScreenCreateUser"
        component={FormScreen}
      />
      <Stack.Screen
        options={{ title: "Todos os Registros" }}
        name="ScreenListOfUsers"
        component={ListUsers}
      />

      <Stack.Screen
        options={{ title: "Editar Usuário" }}
        name="EditUserScreen"
        component={EditUser}
      />
    </Stack.Navigator>
  );
};

export default Routes;
