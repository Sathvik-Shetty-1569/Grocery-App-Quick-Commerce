import { adData } from "@utils/dummyData";
import React from "react";
import { StyleSheet, FlatList, Image, Dimensions, View } from 'react-native';
import Animated, {
  interpolate,
  Extrapolate,
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler
} from "react-native-reanimated";

const { width: SRC_WIDTH } = Dimensions.get("window");
const CARD_LENGTH = SRC_WIDTH * 0.8;
const SPACING = SRC_WIDTH * 0.02;
const SIDECARD_LENGTH = (SRC_WIDTH - CARD_LENGTH) / 2;
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

interface ItemProps {
  index: number;
  scrollX: Animated.SharedValue<number>;
  image: any;
}

function Item({ index, scrollX, image }: ItemProps) {
  const inputRange = [
    (index - 1) * (CARD_LENGTH + SPACING),
    index * (CARD_LENGTH + SPACING),
    (index + 1) * (CARD_LENGTH + SPACING),
  ];

  const animatedStyle = useAnimatedStyle(() => {
    const scaleY = interpolate(
      scrollX.value,
      inputRange,
      [0.9, 1, 0.9],
      Extrapolate.CLAMP
    );
    const opacity = interpolate(
      scrollX.value,
      inputRange,
      [0.5, 1, 0.5],
      Extrapolate.CLAMP
    );
    return {
      transform: [{ scaleY }],
      opacity,
    };
  });

  return (
    <Animated.View
      style={[
        styles.card,
        animatedStyle,
        {
          marginLeft: index === 0 ? SIDECARD_LENGTH : SPACING / 2,
          marginRight: index === adData.length - 1 ? SIDECARD_LENGTH : SPACING / 2
        }
      ]}
    >
      <Image source={image} style={styles.image} />
    </Animated.View>
  );
}

export default function Carousel({ adData }: { adData: any[] }) {
  const scrollX = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  return (
    <View style={styles.container}>
      <AnimatedFlatList
        data={adData}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_LENGTH + SPACING}
        decelerationRate="fast"
        snapToAlignment="start"
        scrollEventThrottle={16}
        onScroll={onScroll}
        renderItem={({ item, index }) => (
          <Item index={index} scrollX={scrollX} image={item} />
        )}
        keyExtractor={(_, index) => index.toString()}
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
  card: {
    width: CARD_LENGTH,
    height: 150,
    overflow: "hidden",
    borderRadius: 15,
    backgroundColor: 'white',
    elevation: 5,
    shadowColor: '#000',
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
