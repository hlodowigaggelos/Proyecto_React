import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';

export default function App() {
  const [input, setInput] = useState(0)
  const [total, setTotal] = useState(null)
  const [signo, setSigno] = useState(null)
  const [prevInput, setPrevInput] = useState(0)
  const botones = [1, 2, 3, '+',
    4, 5, 6, '-',
    7, 8, 9, 'x',
    'C', 0, '=', '/']

  const handlePress = (tecla) => {
    if (!isNaN(tecla)) {
      setInput(Number(input + "" + tecla))
    } else {
      let resultado = calcular(signo, prevInput, input)
      setTotal(resultado)
      setPrevInput(total)
      if (tecla === '=') {
        setSigno(null)
      } else {
        setSigno(tecla)
        setPrevInput(total || input)
        setInput(0)
      }
    }
  }

  const resetCalculadora = () => {
    setSigno(null)
    setInput(0)
    setTotal(null)
    setPrevInput(0)
  }


  const calcular = (operacion, a, b) => {
    switch (operacion) {
      case "+": return suma(a, b);
      case "-": return resta(a, b);
      case "x": return multiplicacion(a, b);
      case "/": return division(a, b);
      case "C":
        resetCalculadora()
        break;
    }
  }

  const suma = (a, b) => a + b
  const resta = (a, b) => a - b
  const multiplicacion = (a, b) => a * b
  const division = (a, b) => {
    if (a === 0 || b === 0) {
      return 0
    }
    return a / b
  }

  return (
    <View style={styles.container}>
      
      <View style={styles.contenedor}>
        <View>
          <TextInput style={styles.textInput} value={total || input} readOnly />
        </View>
        <View style={styles.fila}>
          {botones.slice(0, 4).map((boton, i) => <Button key={i} title={boton} onPress={handlePress} style={styles.botonResultado} />)}
        </View>
        <View style={styles.fila}>
          {botones.slice(4, 8).map((boton, i) => <Button key={i} title={boton} onPress={handlePress} style={styles.botonNumero} />)}
        </View>
        <View style={styles.fila}>
          {botones.slice(8, 12).map((boton, i) => <Button key={i} title={boton} onPress={handlePress} style={styles.botonResultado} />)}
        </View>
        <View style={styles.fila}>
          {botones.slice(12, 16).map((boton, i) => <Button key={i} title={boton} onPress={handlePress}
            style={{ ...styles.botonOperacion, ...styles.botonResultado, ...styles.botonC }}
          />)}
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    gap: 10,
    flex: 1,
    flexWrap: 'wrap',
  },
  fila: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10
  },
  columna: {
    display: 'grid',

  },
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center'
  },

  textInput: {
    backgroundColor: '#613434',
    color: '#FFECEC'
  },
  botonNumero: {
    backgroundColor: '#FFF',
    color: '#000',
    fontSize: 20
  },
  botonOperacion: {
    backgroundColor: '#90C0F8',
    color: '#000'
  },
  botonC: {
    backgroundColor: '#F9F4F4',
    color: '#F9F4F4',
  },
  botonResultado: {
    backgroundColor: '#9500CA',
    padding: 12,
    color: '#FFFBFB',
  }
});