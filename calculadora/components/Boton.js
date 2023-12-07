import { Button, StyleSheet } from "react-native";

export default function Boton({ title, onPress }) {
    return <Button title={title} style={botonEstilos.botonC} onPress={(V) => onPress(title)} />
}

const buttonstyles = StyleSheet.create({
    button: {
        backgroundColor: 'red',
        fontSize: 40
    }
})