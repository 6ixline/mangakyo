import { View, ActivityIndicator, StyleSheet } from "react-native";

export default function Loader(){
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" />
        </View>
    );
}

styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: "center"
    }
})