import React from 'react';
import { View, StyleSheet } from 'react-native';
import StarRating from 'react-native-star-rating-widget';

function RatingStar(props) {
    const [rating, setRating] = React.useState(0);
    console.log(rating)
    return (
        <View style={styles.container}>
            <StarRating
                rating={rating}
                onChange={setRating}
      />
        </View>
    );
}

const styles = StyleSheet.create({
    container:{

    }
})

export default RatingStar;