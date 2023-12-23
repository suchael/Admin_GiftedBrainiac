import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Image,
  FlatList,
  Dimensions,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { dummyData } from "./stdntDummyData";

export default function PaymentScreen() {
    const [modalVisible, setModalVisible] = useState(false);
    const [showPaymentHistory, setShowPaymentHistory] = useState(false);
  
    const openModal = () => {
      setModalVisible(true);
    };
  
    const closeModal = () => {
      setModalVisible(false);
    };
  
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {!showPaymentHistory && (
          <>
            <TouchableOpacity
              onPress={openModal}
              style={{
                backgroundColor: "blue",
                padding: 20,
                borderRadius: 8,
                marginBottom: 20,
              }}
            >
              <Text style={{ fontSize: 20, color: "white" }}>Open Modal</Text>
            </TouchableOpacity>
  
            <TouchableOpacity
              onPress={() => setShowPaymentHistory(true)}
              style={{
                backgroundColor: "green",
                padding: 20,
                borderRadius: 8,
              }}
            >
              <Text style={{ fontSize: 20, color: "white" }}>Payment History</Text>
            </TouchableOpacity>
          </>
        )}
  
        {showPaymentHistory ? (
          // Render Payment History Component when the Payment History button is clicked
          <PaymentHistory />
        ) : (
          // Render the ScrollingModal component when Open Modal is clicked
          <Modal
            visible={modalVisible}
            animationType="slide"
            onRequestClose={closeModal}
            transparent
          >
            <View style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
              <TouchableOpacity
                onPress={closeModal}
                style={{
                  backgroundColor: "black",
                  padding: 10,
                  borderRadius: 8,
                  marginTop: 20,
                  marginHorizontal: 15,
                  marginBottom: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 20, color: "white" }}>Close Modal</Text>
              </TouchableOpacity>
  
              {modalVisible && <ScrollingModal />}
            </View>
          </Modal>
        )}
      </View>
    );
  }
  
  function PaymentHistory() {
    // Replace this with the actual PaymentHistoryComponent
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Payment History Component</Text>
        {/* You can replace the above Text with your PaymentHistoryComponent */}
      </View>
    );
  }
function ScrollingModal() {
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height * 0.86;

  const flatListRef = useRef(null);
  const currentIndexRef = useRef(0);

  const [isUserScrolling, setIsUserScrolling] = useState(false);

  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.floor(offsetX / width);
    currentIndexRef.current = index;

    if (!isUserScrolling) {
      // You may choose to update the currentIndex state here if needed
    }
  };

  const handleCallPress = (contact) => {
    const phoneNumberWithCountryCode = `tel:${contact}`;
    Linking.openURL(phoneNumberWithCountryCode);
  };

  const renderCarouselItem = ({ userData, index }) => {
    return (
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
            borderColor:  "white",
            justifyContent: "space-between",
            backgroundColor:  "#E0E5EC" ,
            borderRadius: 16,
            width: width - 40,
            height,
            marginHorizontal: 20,
            shadowColor: "#000",
            shadowOffset: { width: 3, height: 3 },
            shadowOpacity: 0.8,
            shadowRadius: 4,
            elevation: 5,
          }}
        >
          {/* IMAGE */}
          <View
            style={{
              flex: 2.4,
              margin: 12,
              borderRadius: 16,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {userData.imageURL ? (
              <Image
                source={{ uri: userData.imageURL }}
                style={{ borderRadius: 16, width: "100%", height: "100%" }}
                resizeMode="cover"
              />
            ) : (
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Ionicons name="person" size={100} color="black" />
                <Text style={{ color: "red", fontSize: 18 }}>
                  No screenshot of payment
                </Text>
              </View>
            )}
            <Text
              style={{
                position: "absolute",
                right: 5,
                top: 2,
                backgroundColor: "blue",
                color: "white",
                fontSize: 20,
                fontWeight: "bold",
                textAlign: "center",
                borderRadius: 8,
                paddingHorizontal: 10,
                paddingVertical: 6,
              }}
            >
              {index + 1}/{dummyData.length}
            </Text>
          </View>
          {/* DETAILS */}
          <View
            style={{
              flex: 1.6,
              marginBottom: 12,
              padding: 10,
              justifyContent: "center",
            }}
          >
            <View style={{ gap: 3 }}>
              <Text
                style={{ fontSize: 25, fontWeight: "600", textAlign: "center" }}
              >
                {userData.name}
              </Text>
              <Text style={{ fontSize: 19, fontWeight: "600" }}>
                Session:{" "}
                <Text style={{ fontSize: 17, fontWeight: "500" }}>
                  {userData.session} (400 naira)
                </Text>
              </Text>
              <Text style={{ fontSize: 19, fontWeight: "600" }}>
                Payment type:{" "}
                <Text style={{ fontSize: 17, fontWeight: "500" }}>
                  {userData.Type}
                </Text>
              </Text>
              <Text style={{ fontSize: 19, fontWeight: "600" }}>
                Amount Paid:{" "}
                <Text style={{ fontSize: 17, fontWeight: "500" }}>
                  400 naira
                </Text>
              </Text>
              <TouchableOpacity
                onPress={() => handleCallPress(userData.contact)}
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

              {/* REJECT AND ACCEPT BUTTONS */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 10,
                }}
              >
                <TouchableOpacity
                  onPress={() => console.log("Reject")}
                  style={{
                    backgroundColor: "red",
                    padding: 10,
                    borderRadius: 8,
                    flex: 1,
                    marginRight: 10,
                    justifyContent: "center",
          alignItems: "center",
                  }}
                >
                  <Text style={{ fontSize: 16, color: "white" }}>Reject</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => console.log("Accept")}
                  style={{
                    backgroundColor: "green",
                    padding: 10,
                    borderRadius: 8,
                    flex: 1,
                    marginLeft: 10,
                    justifyContent: "center",
          alignItems: "center",
                  }}
                >
                  <Text style={{ fontSize: 16, color: "white" }}>Accept</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const openModal = () => {
    setModalVisible(true);
  };

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <FlatList
        ref={flatListRef}
        data={dummyData}
        horizontal
        pagingEnabled
        windowSize={5}
        removeClippedSubviews={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) =>
          renderCarouselItem({ userData: item, index })
        }
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
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
      />
    </View>
  );
}
