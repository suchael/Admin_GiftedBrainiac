import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Linking,
  TextInput,
  ActivityIndicator,
  Modal,
  Image,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Entypo, Ionicons } from "@expo/vector-icons";

import { dummyData } from "./stdntDummyData.js";

const TableComponent = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [data, setData] = useState(dummyData);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const renderTableHeader = () => {
    return (
      <View style={styles.tableHeaderContainer}>
        <Text style={styles.tableHeader}>Name</Text>
        <Text style={[styles.tableHeader, { textAlign: "right" }]}>Feb</Text>
        <Text style={[styles.tableHeader, { textAlign: "right" }]}>
          Session
        </Text>
        <Text style={[styles.tableHeader, { textAlign: "right" }]}>Today</Text>
      </View>
    );
  };

  const renderTableItem = ({ item }) => {
    const handleRowClick = () => {
      // Handle row click here, for example, navigate to a detail screen
      setSelectedItem(item);
      setModalVisible(true);
    };

    return (
      <TouchableOpacity onPress={handleRowClick}>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>{item.name}</Text>
          <Text
            style={[
              styles.tableCell,
              {
                textAlign: "right",
                color: item.feb == "Unpaid" ? "red" : "green",
                fontWeight: "bold",
              },
            ]}
          >
            {item.feb}
          </Text>
          <Text style={[styles.tableCell, { textAlign: "right" }]}>
            {item.session}
          </Text>
          <Text style={[styles.tableCell, { textAlign: "right" }]}>
            {item.today === "present" ? (
              <Entypo name="check" size={24} color="black" />
            ) : (
              <Entypo name="cross" size={24} color="black" />
            )}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const handleShowAllDetails = () => {
    // Logic to show all details
    navigation.navigate("AllStdntDetails");
  };

  const handleSearch = () => {
    Keyboard.dismiss(); // Close the keyboard
  
    setLoading(true);
    setTimeout(() => {
      let filteredData;
  
      if (searchTerm.toLowerCase() === 'paid' || searchTerm.toLowerCase() === 'unpaid') {
        // Special search for Paid or Unpaid
        filteredData = dummyData.filter(item => item.feb.toLowerCase() === searchTerm.toLowerCase());
      } else {
        // General search for other columns
        filteredData = dummyData.filter((item) => {
          for (const key in item) {
            if (item[key].toLowerCase().includes(searchTerm.toLowerCase())) {
              return true;
            }
          }
          return false;
        });
      }
  
      setData(filteredData);
      setLoading(false);
    }, 100);
  };
  
  

  const handleClearSearch = () => {
    setSearchTerm("");
    setData(dummyData);
  };

  return (
    <View style={styles.container}>
      {renderTableHeader()}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderTableItem}
      />
      <View style = {styles.bottomBtn}>
        <View style={styles.searchInputContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Enter name to search"
            onChangeText={(text) => setSearchTerm(text)}
            value={searchTerm}
          />
          {searchTerm.length > 0 && (
            <TouchableOpacity
              style={styles.clearButton}
              onPress={handleClearSearch}
            >
              <Entypo name="cross" size={24} color="#888" />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.searchButton}
            onPress={handleSearch}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Search</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.showAllDetailsButton}
            onPress={handleShowAllDetails}
          >
            <Text style={styles.buttonText}>Show All Details</Text>
          </TouchableOpacity>
        </View>
        <UserModal
          modalVisible={modalVisible}
          closeModal={() => setModalVisible(false)}
          selectedItem={selectedItem}
        />
      </View>
    </View>
  );
};

function UserModal({ modalVisible, closeModal, selectedItem }) {
  return (
    <View style={{ flex: 1 }}>
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <TouchableOpacity
          onPress={closeModal}
          style={{
            backgroundColor: "rgba(0,0,0,0.6)",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              borderRadius: 15,
              backgroundColor: "white",
              padding: 0.1,
              height: "75%",
              width: "85%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <UserDetails selectedItem={selectedItem} />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const UserDetails = ({ selectedItem }) => {
  const phoneNumber = selectedItem.contact;
  const handleCallPress = () => {
    const phoneNumberWithCountryCode = `tel:${phoneNumber}`;
    Linking.openURL(phoneNumberWithCountryCode);
  };
  return (
    <View
      style={{
        width: "100%",
        backgroundColor: selectedItem.feb == "Unpaid" ? "pink" : "lightgreen",
        borderWidth: 6,
        borderColor: selectedItem.feb == "Unpaid" ? "red" : "green",
        borderRadius: 15,
        flex: 1,
        justifyContent: "space-between",
        padding: 15,
      }}
    >
      {/* Picture */}

      <View
        style={{
          borderWidth: 2,
          borderColor: "gray",
          borderRadius: 3,
          height: "55%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {selectedItem.imageURL ? (
          <Image
            source={{ uri: selectedItem.imageURL }}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Ionicons name="person" size={100} color="black" />
            <Text style={{ color: "red", fontSize: 18 }}>
              This user has no image
            </Text>
          </View>
        )}
      </View>
      {/* Closing - Picture */}

      <View style={{ gap: 3 }}>
        <Text style={{ fontSize: 19, fontWeight: "600" }}>
          Name:{" "}
          <Text style={{ fontSize: 17, fontWeight: "500" }}>
            {selectedItem.name}
          </Text>
        </Text>
        <Text style={{ fontSize: 19, fontWeight: "600" }}>
          Session:{" "}
          <Text style={{ fontSize: 17, fontWeight: "500" }}>
            {selectedItem.session}
          </Text>
        </Text>
        <Text style={{ fontSize: 19, fontWeight: "600" }}>
          Payment type:{" "}
          <Text style={{ fontSize: 17, fontWeight: "500" }}>
            {selectedItem.Type}
          </Text>
        </Text>
        <Text
          style={{
            fontSize: 19,
            fontWeight: "600",
            color: selectedItem.feb == "Paid" && "green",
          }}
        >
          Payment Status:{" "}
          <Text
            style={{
              fontSize: 17,
              fontWeight: "600",
              color: selectedItem.feb == "Unpaid" ? "red" : "white",
            }}
          >
            {selectedItem.feb}
          </Text>
        </Text>
        <Text style={{ fontSize: 19, fontWeight: "600" }}>
          Department:{" "}
          <Text style={{ fontSize: 17, fontWeight: "500" }}>
            {selectedItem.department}
          </Text>
        </Text>
        <TouchableOpacity
          onPress={handleCallPress}
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
              {selectedItem.contact}
            </Text>
          </Text>
          <Ionicons name="ios-call" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
  },
  tableHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#888",
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  tableHeader: {
    flex: 1, // Use flex to allow text to wrap to the next line
    fontWeight: "bold",
    fontSize: 18,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 3,
    borderBottomColor: "#ddd",
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  tableCell: {
    flex: 1, // Use flex to allow text to wrap to the next line
    fontSize: 17,
    fontWeight: "500",
  },
  showAllDetailsButton: {
    backgroundColor: "#3498db",
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  showAllDetailsButtonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  bottomBtn: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    gap: 10,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 10,
  },
  searchButton: {
    backgroundColor: "#27ae60",
    paddingVertical: 12,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
  },
  showAllDetailsButton: {
    backgroundColor: "#3498db",
    paddingVertical: 12,
    borderRadius: 8,
    flex: 1,
    marginLeft: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  searchInput: {
    marginTop: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
  },
  clearButton: {
    padding: 8,
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "contain", // You can adjust this based on your image aspect ratio
  },
});

export default TableComponent;
