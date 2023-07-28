import DateTimePicker from "@react-native-community/datetimepicker";
import { Alert, Text, View } from "react-native";
import Input from "../components/Input";

import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import ContainerSafeArea from "../components/ContainerSafeArea";
import {
  default as CustomButtom,
  default as CustomButton,
} from "../components/CustomButton";
import Flex from "../components/Flex";
import Loader from "../components/Loader";
import Selector from "../components/Selector";
import { createUser } from "../services/UserController";
import utils from "../utils";

const HomeScreen = ({ navigation }) => {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 500);
  }, [])

  const handleNavigateScreen = (path) => navigation.navigate(path);

  return (
    <ContainerSafeArea>
      <View style={styles.container}>
        <Text style={styles.title}>Bem Vindo</Text>
        <Text style={[styles.subtitle, { textDecorationLine: 'none' }]}>Vamos começar seu cadastro?</Text>
        <Flex style={styles.buttonContainer}>
          <CustomButtom
            label="Novo Usuário"
            onPress={() => {
              handleNavigateScreen('ScreenCreateUser')
            }}
          />
          <CustomButtom
            label="Ver usuários"
            outline onPress={() => {
              handleNavigateScreen('ScreenListOfUsers')
            }}
          />
        </Flex>
      </View>

      <Loader isOpen={isLoading} setIsOpen={setIsLoading} />
    </ContainerSafeArea >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 700,
    marginTop: 10,
    color: "#404040",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 600,
    color: "#404040",
    textDecorationLine: "underline",
  },
  buttonContainer: {
    flex: 0.1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    gap: 6,
  },
  dateOfBirth: {
    minWidth: "100%",
    paddingLeft: 24,
    marginVertical: 14,
    alignItems: "flex-start",
    gap: 10,
  },
  dateOfBirthText: {
    fontSize: 14,
    textAlign: "left",
    color: "#404040",
    fontWeight: 600,
  },
  contianerDateOfBirth: {
    borderColor: "#e5e5e5",
    borderWidth: 2,
    width: "90%",
    marginVertical: 12,
    borderRadius: 6,
  },
});

export default HomeScreen;
