import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, Image, StyleSheet, View, Dimensions ,Text, TouchableOpacity} from 'react-native';
import { navigate } from '../../App';

const HorizontalPhotoScrollView2 = ({slider}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const scrollViewRef = useRef(null);
  const { width } = Dimensions.get('window');
  const itemWidth = width-10; // 100% width
  const itemHeight = 160; 
//   console.log(images)
//  console.log(slider)

  useEffect(() => {
    const interval = setInterval(() => {
      const newIndex = (currentImageIndex + 1) %3;
      scrollViewRef.current.scrollTo({
        x: newIndex * Dimensions.get('window').width,
        animated: true,
      });
      setCurrentImageIndex(newIndex);
    }, 2500);

    return () => clearInterval(interval);
  }, [currentImageIndex, 3]);
  const items = [
    
    { text: 'Item 1',  uri: 'https://onemg.gumlet.io/9bf3d88a-7d33-4746-b2c3-3499afd73ad2_1708057517.png?w=899&h=200&format=auto' },
    { text: 'Item 2', uri:'https://onemg.gumlet.io/ff8ecaa6-f7e3-4add-bfb3-e7a62ef134ee_1707991323.png?w=899&h=200&format=auto'},
    { text: 'Item 3', uri:'https://onemg.gumlet.io/750b4e8c-8283-4ad9-8f54-d04260c188a0_1707976923.jpg?w=899&h=200&format=auto' },
    // Add more items as needed
  ];

  return (
    <ScrollView
      ref={scrollViewRef}
      horizontal
      contentContainerStyle={styles.container}
      showsHorizontalScrollIndicator={false}
      pagingEnabled
      onMomentumScrollEnd={(event) => {
        const contentOffset = event.nativeEvent.contentOffset;
        const imageIndex = Math.round(contentOffset.x / Dimensions.get('window').width);
        setCurrentImageIndex(imageIndex);
      }}
    >
           {slider&&slider.map((item, index) => (
          <TouchableOpacity onPress={()=>navigate("Wallet")}>
              <Image
        source={{uri:item}}
          key={index}
          style={[styles.item, { width: itemWidth, height: itemHeight, backgroundColor: item?.color,borderRadius:10,marginHorizontal:5 }]}
        >
        </Image>
          </TouchableOpacity>
      ))}

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
     height:160,
    //  backgroundColor:"black",
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius:10
  },
  imageContainer: {
   
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height-300,
    resizeMode:"contain"
    
  },
});

export default HorizontalPhotoScrollView2;
