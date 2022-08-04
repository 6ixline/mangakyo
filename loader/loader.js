import { View, ActivityIndicator, StyleSheet } from "react-native";

export default function Loader(){
    return (
        <View style={styles.containerLoader}>
            <ActivityIndicator size="large" color="#89CFF0" style={styles.ActivityIndicator} />
        </View>
    );
}

const styles = StyleSheet.create({
    containerLoader:{
        flex: 1,
        padding: 50,
        justifyContent: 'center',
        alignItems: "center",
        height: 500,
    },
    ActivityIndicator:{
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    }

})