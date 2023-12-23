import React from "react";

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { PaymentCategory } from "./PaymentCategory.js";
import { useNavigation } from "@react-navigation/native";

const RoleSelectionScreen = () => {
  const navigation = useNavigation();
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("TeacherSection")}
        >
          <Text style={styles.buttonText}>Teacher{"\n"}Section</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.stdnt]}
          onPress={() => navigation.navigate("StdntSection")}
        >
          <Text style={styles.buttonText}>Student{"\n"}Section</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("TeacherForm")}
        >
          <Text style={styles.buttonText}>Teacher{"\n"}Form</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.stdnt]}
          onPress={() => navigation.navigate("StdntForm")}
        >
          <Text style={styles.buttonText}>Student{"\n"}Form</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("StdntPaymentConfirmation")}
        >
          <Text style={styles.buttonText}>Payment confirmation</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.textView}>
        {Object.keys(PaymentCategory).map((session, index) => (
          <View key={index} style={styles.sessionContainer}>
            <Text style={styles.sessionTitle}>{session}</Text>
            <Text style={styles.sessionText}>
              Monthly Payment: {PaymentCategory[session].monthlyPayment}
            </Text>
            <Text style={styles.sessionText}>
              Weekly Payment: {PaymentCategory[session].weeklyPayment}
            </Text>
            <Text style={styles.sessionText}>
              Daily Payment: {PaymentCategory[session].dailyPayment}
            </Text>
            <Text style={styles.sessionText}>
              Time: {PaymentCategory[session].time}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    paddingVertical: 30,
    paddingBottom: 150,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#3498db",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  textView: {
    marginVertical: 24,
  },
  sessionContainer: {
    marginBottom: 16,
  },
  sessionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  sessionText: {
    fontSize: 16,
  },
  stdnt: {
    backgroundColor: "black",
  },
});

export default RoleSelectionScreen;
