import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import React, { useRef, useEffect, useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Dimensions,
  FlatList,
  Modal,
  Image,
  Linking,
  TouchableOpacity,
} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Ionicons } from '@expo/vector-icons';


// My import
import Main from "./src/Main.js";
import StdntSection from "./src/student/StdntSection.js";
import StdntForm from "./src/student/StdntForm.js";
import TeacherForm from "./src/teacher/TeacherForm.js";
import TeacherSection from "./src/teacher/TeacherSection.js";
import AllStdntDetails from "./src/student/AllStdntDetails.js";
import StdntPaymentConfirmation from "./src/student/StdntPaymentConfirmation.js";
import { dummyData } from "./src/student/stdntDummyData.js";

const Stack = createNativeStackNavigator();
function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="StdntSection"
            component={StdntSection}
            options={{ title: "Student section" }}
          />
          <Stack.Screen
            name="StdntForm"
            component={StdntForm}
            options={{ title: "Student form" }}
          />
          <Stack.Screen
            name="AllStdntDetails"
            component={AllStdntDetails}
            options={{ title: "All student details" }}
          />
          <Stack.Screen
            name="StdntPaymentConfirmation"
            component={StdntPaymentConfirmation}
            options={{ title: "Payment confirmation" }}
          />
          <Stack.Screen
            name="TeacherForm"
            component={TeacherForm}
            options={{ title: "Teacher form" }}
          />
          <Stack.Screen
            name="TeacherSection"
            component={TeacherSection}
            options={{ title: "Teacher section" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="lightgray" barStyle="light-content" />
      <Header />
      <Main />
      <ScrollingModal />
    </SafeAreaView>
  );
};

function Header() {
  return (
    <View style={styles.header}>
      <Text style={{ fontSize: 21, fontWeight: "600" }}>
        Gifted Brainiac Tutor{" "}
      </Text>
      <Text style={{ fontSize: 20, fontWeight: "900", color: "#3498db" }}>
        ADMIN{" "}
      </Text>
    </View>
  );
}

function ScrollingModal() {
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height * 0.83;

  const flatListRef = useRef(null);
  const currentIndexRef = useRef(0);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.floor(offsetX / width);
    currentIndexRef.current = index;

    if (!isUserScrolling) {
      setCurrentIndex(index);
    }
  };

  useEffect(() => {
    const scrollInterval = setInterval(() => {
      if (flatListRef.current && !isUserScrolling) {
        const nextIndex = (currentIndexRef.current + 1) % dummyData.length;
        flatListRef.current.scrollToIndex({
          animated: true,
          index: nextIndex,
        });
        currentIndexRef.current = nextIndex;
    }
    }, 5000);
  
    return () => {
      clearInterval(scrollInterval);
    };
  }, [ isUserScrolling]);
  

  const handleCallPress = (contact) => {
    const phoneNumberWithCountryCode = `tel:${contact}`;
    Linking.openURL(phoneNumberWithCountryCode);
  };
  const renderCarouselItem = ({ userData, index }) => {
    // console.log(userData.name, index)
    return(
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width,
        height,
      }}
    >
      <View
        style={{
          borderWidth: 5,
          borderColor:  userData.feb == "Paid" ? "white": "red",
          justifyContent: "space-between",

          backgroundColor: userData.feb == "Paid" ? "#E0E5EC": "pink", 
        //   backgroundColor: "#E0E5EC", // Light background color
          borderRadius: 16,
          width: width - 40,
          height,
          marginHorizontal: 20,
          shadowColor: "#000",
          shadowOffset: {
            width: 3,
            height: 3,
          },
          shadowOpacity: 0.8,
          shadowRadius: 4,
          elevation: 5,
        }}
      >
        {/* IMAGE */}
        <View
          style={{
            // borderWidth: 2,
            flex: 2.8,
            margin: 12,
            borderRadius: 16,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {userData.imageURL ? (
          <Image
            source={{ uri: userData.imageURL }}
            style={[styles.image, {borderRadius: 16,}]}
            resizeMode="cover"
          />
        ) : (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Ionicons name="person" size={100} color="black" />
            <Text style={{ color: "red", fontSize: 18,  }}>
              This user has no image
            </Text>
          </View>
        )}
            
            <Text style={{position: "absolute", right: 5, top: 2 ,backgroundColor: "blue", color: "white", fontSize: 20, fontWeight: "bold", textAlign: "center", borderRadius: 8, paddingHorizontal: 10,paddingVertical: 6 }}>
                {index + 1}/{dummyData.length}
            </Text>
        </View>
        {/* closing - IMAGE */}

        {/* DETAILS */}
        <View style={{ flex: 1.2, marginBottom: 12, padding: 10, justifyContent: "center", }}>
          <View style={{ gap: 3, }}>
            <Text style={{ fontSize: 25, fontWeight: "600", textAlign: "center" }}>
              {userData.name}
            </Text>
            <Text style={{ fontSize: 19, fontWeight: "600" }}>
              Session:{" "}
              <Text style={{ fontSize: 17, fontWeight: "500" }}>
              {userData.session}
              </Text>
            </Text>
            <Text style={{ fontSize: 19, fontWeight: "600" }}>
              Payment type:{" "}
              <Text style={{ fontSize: 17, fontWeight: "500" }}>
              {userData.Type}
              </Text>
            </Text>
            <Text
              style={{
                fontSize: 19,
                fontWeight: "600",
                color:  userData.feb == "Unpaid"? "red": null,
              }}
            >
              Payment Status:{" "}
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "600",
                }}
              >
                {userData.feb}
              </Text>
            </Text>
            <TouchableOpacity
              onPress={()=>handleCallPress(userData.contact)}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingVertical: 5,
                paddingHorizontal: 8,
                borderWidth: 2,
                borderColor: "#888",
              }}
            >
              <Text style={{ fontSize: 19, fontWeight: "600" }}>
                Contact:{" "}
                <Text style={{ fontSize: 17, fontWeight: "500" }}>
                {userData.contact}
                </Text>
              </Text>
              <Ionicons name="ios-call" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        {/* Closing - DETAILS */}
      </View>
    </View>
    );
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const getItemLayout = (_, index) => ({
    length: width,
    offset: width * index,
    index,
  });

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <TouchableOpacity
        onPress={openModal}
        style={{
          backgroundColor: "black",
          padding: 10,
          borderRadius: 8,
          marginTop: 20,
          position: "absolute",
          left: 15,
          right: 15,
          bottom: 15,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 20, color: "white" }}>Open Modal</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={closeModal}
        transparent
      >
        <View style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <TouchableOpacity
            style={{
              margin: 16,
              padding: 3,
              backgroundColor: "black",
              borderWidth: 2,
              borderColor: "white",
              borderRadius: 4,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={closeModal}
          >
            <Text style={{ fontSize: 20, color: "white" }}>Close</Text>
          </TouchableOpacity>

          <FlatList
            ref={flatListRef}
            data={dummyData}
            horizontal
            pagingEnabled
            windowSize={20} // Adjust as needed
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => renderCarouselItem({ userData: item, index })}
            keyExtractor={(userData) => userData.id}
            onScroll={(event) => {
                handleScroll(event);
                if (isUserScrolling) {
                  setIsUserScrolling(false);
                }
              }}
            onScrollBeginDrag={() => setIsUserScrolling(true)}
            onMomentumScrollEnd={() => setIsUserScrolling(false)}
            snapToInterval={width}
            decelerationRate="fast"
            contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
            getItemLayout={getItemLayout} // Add this line
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 15,
  },

  header: {
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 6,
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "contain", // You can adjust this based on your image aspect ratio
  },
});
export default App;
