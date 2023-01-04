import { View, Text, StyleSheet, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";


function Home() {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text>Home Screen</Text>
            <Button
                onPress={() => navigation.navigate('Destination')}
                title = 'Navigate'
            />
        </View>
    );
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})