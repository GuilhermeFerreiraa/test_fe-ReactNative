import DateTimePicker from "@react-native-community/datetimepicker";
import { Alert, Platform, Text, View } from "react-native";
import Input from "../components/Input";

import { useState } from "react";
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

const FormScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({
    document: "",
    name: "",
    lastName: "",
    dateOfBirth: new Date(),
    email: "",
    gender: "",
  });

  const handleResetForm = () => {
    setUser({
      document: "",
      name: "",
      lastName: "",
      name: "",
      dateOfBirth: new Date(),
      email: "",
      gender: "female",
    });
  };

  const handleInputChange = (text, field) => {
    setUser((prevState) => ({
      ...prevState,
      [field]: text,
    }));
  };

  const handleChangeDatePicker = (event, selectedDate) => {
    let currentDate = selectedDate || user.dateOfBirth;
    setUser((prevState) => ({
      ...prevState,
      dateOfBirth: currentDate,
    }));
    setShowDatePicker(false);
  };

  const HandleCreateUser = async () => {
    if (
      !user.name ||
      !user.lastName ||
      !user.document ||
      !user.email ||
      !user.dateOfBirth ||
      !user.gender
    ) {
      Alert.alert("Por favor, preencha todos os campos obrigatórios!");
      return;
    }

    if (!utils.isValidCPF(user.document)) {
      Alert.alert("CPF Inválido!");
      return;
    }

    if (!utils.validateEmail(user.email)) {
      Alert.alert("E-mail Inválido!");
      return;
    }

    if (utils.isUnder18YearsOld(user.dateOfBirth)) {
      Alert.alert("O usuário deve ser maior de 18 anos!");
      return;
    }

    setIsLoading(true);
    const params = {
      name: user.name,
      lastName: user.lastName,
      document: user.document,
      email: user.email,
      dateOfBirth: user.dateOfBirth.toLocaleString(),
      gender: user.gender,
    };

    try {
      const createdUser = await createUser(params);
      handleResetForm();
      setIsLoading(false);
      Alert.alert("Usuário criado com sucesso!");
    } catch (error) {
      setIsLoading(false);
      Alert.alert("Erro ao criar usuário. Tente novamente mais tarde!");
    }
  };

  return (
    <ContainerSafeArea>
      <ScrollView>
        <View safeArea style={styles.container}>
          <Text style={styles.title}>Vamos fazer o seu Cadastro?</Text>

          <View style={styles.container}>
            <Input
              label="*CPF"
              placeholder="CPF"
              returnKeyType="done"
              value={utils.formatCPF(user.document)}
              keyboardType="decimal-pad"
              error={user.document && !utils.isValidCPF(user.document)}
              error_text={"CPF Inválido!"}
              maxLength={14}
              onChangeText={(v) => handleInputChange(v, "document")}
            />

            <Input
              label="*Nome"
              value={user.name}
              placeholder="Nome"
              returnKeyType="done"
              onChangeText={(v) => handleInputChange(v, "name")}
            />

            <Input
              label="*Sobrenome"
              returnKeyType="done"
              value={user.lastName}
              keyboardType="default"
              placeholder="Sobrenome"
              onChangeText={(v) => handleInputChange(v, "lastName")}
            />

            <Input
              label="*E-mail"
              value={user.email}
              returnKeyType="done"
              placeholder="E-mail"
              keyboardType="email-address"
              error_text={"*E-mail Inválido!"}
              onChangeText={(v) => handleInputChange(v, "email")}
              error={user.email && !utils.validateEmail(user.email)}
            />

            <View style={styles.contianerDateOfBirth}>
              <Flex style={styles.dateOfBirth}>
                <TouchableOpacity onPress={handleChangeDatePicker}>
                  <Text style={styles.dateOfBirthText}>
                    *Data de Nascimento:
                  </Text>
                  {Platform.OS !== "ios" && (
                    <Text style={styles.dateOfBirthText}>
                      {utils.formatDateToDayMonthYear(user.dateOfBirth)}
                    </Text>
                  )}

                </TouchableOpacity>
                <DateTimePicker
                  testID="dateTimePicker"
                  value={user.dateOfBirth}
                  mode="date"
                  display="default"
                  timeZoneOffsetInMinutes={-180}
                  onChange={handleChangeDatePicker}
                />
              </Flex>
            </View>

            <Selector
              handleChangeValue={(v) => handleInputChange(v, "gender")}
            />
          </View>

          <View style={styles.buttonContainer}>
            <CustomButtom
              label="Inserir"
              onPress={HandleCreateUser}
            />

            <CustomButton
              outline
              label="Recomeçar"
              onPress={handleResetForm}
            />
          </View>
        </View>
      </ScrollView>
      <Loader isOpen={isLoading} setIsOpen={setIsLoading} />
    </ContainerSafeArea>
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
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    flexDirection: "row",
    gap: 6,
  },
  dateOfBirth: {
    minWidth: "100%",
    paddingLeft: 24,
    marginVertical: Platform.OS === 'ios' ? 4 : 14,
    alignItems: "center",
    jsutifyContent: 'space-between',
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
    maxWidth: "90%",
    marginVertical: 12,
    flexDirection: "row",
    alignItems: 'center',
    borderRadius: 6,
  },
});

export default FormScreen;
