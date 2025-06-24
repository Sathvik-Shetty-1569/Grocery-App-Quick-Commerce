import React, { useState } from "react";
import { StyleSheet, FlatList, Image, Dimensions, View } from 'react-native';
import Animated, {
  interpolate,
  Extrapolate,
  useSharedValue,
  useAnimatedStyle
} from "react-native-reanimated";

const {width:SRC_WIDTH} = Dimensions.get("window");
const CARD_LENGTH = SRC_WIDTH * 0.8;
const SPACING = SRC_WIDTH * 0.02;
const SIDECARD_LENGTH = (SRC_WIDTH - CARD_LENGTH) ;
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

interface ItemProps {
  index: number;
  scrollX: number;
  image: any;
}

function Item({ index, scrollX, image }: ItemProps) {
  const size = useSharedValue(0.8);
  const opacity = useSharedValue(1);

  const inputRange = [
    (index - 1) * CARD_LENGTH,
    index * CARD_LENGTH,
    (index + 1) * CARD_LENGTH
  ];

  size.value = interpolate(
    scrollX,
    inputRange,
    [0.8, 1, 0.8],
    Extrapolate.CLAMP
  );

  opacity.value = interpolate(
    scrollX,
    inputRange,
    [0.5, 1, 0.5],
    Extrapolate.CLAMP
  );

  const cardStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scaleY: size.value }],
      opacity: opacity.value,
    };
  });

  return (
    <Animated.View
      style={[
        styles.card,
        cardStyle,
        {
          marginLeft: index === 0 ? SIDECARD_LENGTH : SPACING,
          marginRight: index === 2 ? SIDECARD_LENGTH : SPACING
        }
      ]}
    >
      <Image source={image} style={styles.image} />
    </Animated.View>
  );
}

export default function Carousel({ adData }: { adData: any[] }) {
  const [scrollX, setScrollX] = useState(0);

  return (
    <View style={styles.container}>
      <AnimatedFlatList
        data={adData}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_LENGTH + SPACING * 2}
        decelerationRate="fast"
        snapToAlignment="center"
        scrollEventThrottle={16}
        contentContainerStyle={styles.contentContainer}
        renderItem={({ item, index }) => (
          <Item index={index} scrollX={scrollX} image={item} />
        )}
        keyExtractor={(_, index) => index.toString()}
        onScroll={(event) => {
          setScrollX(event.nativeEvent.contentOffset.x);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    paddingHorizontal: SIDECARD_LENGTH - SPACING,
  },
  card: {
    width: CARD_LENGTH,
    height: 150,
    overflow: "hidden",
    borderRadius: 15,
    backgroundColor: 'white', // Optional: for better visibility
    elevation: 5, // Optional: for Android shadow
    shadowColor: '#000', // Optional: for iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: 'cover',
  }
});