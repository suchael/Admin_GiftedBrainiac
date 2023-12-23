import React, { useRef, useEffect, useState } from 'react';
import { Dimensions, Text, View, FlatList, Modal, TouchableOpacity } from 'react-native';

function Index() {
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height * 0.8;

  const data = [...new Array(50).keys()];
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.floor(offsetX / width);

    if (!isUserScrolling) {
      setCurrentIndex(index);
    }
  };

  useEffect(() => {
    const scrollInterval = setInterval(() => {
      if (flatListRef.current && !isUserScrolling) {
        flatListRef.current.scrollToIndex({
          animated: true,
          index: currentIndex + 1,
        });
      }
    }, 5000);

    return () => {
      clearInterval(scrollInterval);
    };
  }, [currentIndex, isUserScrolling]);

  const renderCarouselItem = ({ item }) => (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width,
        height,
      }}
    >
      <View
        style={{
          borderWidth: 3,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'red',
          borderRadius: 8,
          width: width - 40,
          height,
          marginHorizontal: 20,
        }}
      >
        <Text style={{ textAlign: 'center', fontSize: 30 }}>{item}</Text>
      </View>
    </View>
  );

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
    <View style={{ flex: 1, alignItems: 'center' }}>
      <TouchableOpacity onPress={openModal} style={{ backgroundColor: 'lightblue', padding: 10, borderRadius: 8, marginTop: 20 }}>
        <Text style={{ fontSize: 20 }}>Open Modal</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" onRequestClose={closeModal} transparent>
        <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <TouchableOpacity style={{ margin: 16 }} onPress={closeModal}>
            <Text style={{ fontSize: 20, color: 'white' }}>Close</Text>
          </TouchableOpacity>

          <FlatList
            ref={flatListRef}
            data={data}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            renderItem={renderCarouselItem}
            keyExtractor={(item) => item.toString()}
            onScroll={(event) => {
              handleScroll(event);
            }}
            onScrollBeginDrag={() => setIsUserScrolling(true)}
            onMomentumScrollEnd={() => setIsUserScrolling(false)}
            snapToInterval={width}
            decelerationRate="fast"
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
            getItemLayout={getItemLayout} // Add this line
          />
        </View>
      </Modal>
    </View>
  );
}

export default Index;
