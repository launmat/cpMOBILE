// App.tsx — projeto Expo, seguindo a navegação apresentada na aula 01.
// Usa as dependências de navegação instaladas em sala:
// @react-navigation/native, @react-navigation/native-stack,
// react-native-screens e react-native-safe-area-context.
// As duas telas e a navegação estão neste arquivo para a entrega.

import React, { useState } from 'react';
import {
  Button,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

type DadosPessoais = {
  nome: string;
  email: string;
  idade: string;
  telefone: string;
  cidade: string;
  estado: string;
};

// Define quais parâmetros cada tela recebe.
type RootStackParamList = {
  Formulario: undefined;
  DadosPessoais: DadosPessoais;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
type FormularioProps = NativeStackScreenProps<RootStackParamList, 'Formulario'>;
type DadosProps = NativeStackScreenProps<RootStackParamList, 'DadosPessoais'>;

function TelaFormulario({ navigation }: FormularioProps) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [idade, setIdade] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [erro, setErro] = useState('');

  function enviar() {
    if (!nome.trim() || !email.trim() || !idade.trim() ||
        !telefone.trim() || !cidade.trim() || !estado.trim()) {
      setErro('Preencha todos os campos antes de enviar.');
      return;
    }

    if (!/^\d+$/.test(idade.trim()) || !Number.isSafeInteger(Number(idade))) {
      setErro('Informe a idade em anos completos, usando apenas números.');
      return;
    }

    setErro('');
    Keyboard.dismiss();

    // Envia todos os dados pelos parâmetros da navegação.
    navigation.navigate('DadosPessoais', {
      nome: nome.trim(),
      email: email.trim(),
      idade: idade.trim(),
      telefone: telefone.trim(),
      cidade: cidade.trim(),
      estado: estado.trim(),
    });
  }

  return (
    <SafeAreaView style={styles.tela} edges={['left', 'right', 'bottom']}>
      <KeyboardAvoidingView
        style={styles.tela}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={100}
      >
        <ScrollView contentContainerStyle={styles.conteudo} keyboardShouldPersistTaps="handled">
          <Text style={styles.titulo}>Formulário</Text>
          <Text style={styles.descricao}>Todos os campos são obrigatórios.</Text>

          <Text style={styles.label}>Nome</Text>
          <TextInput
            style={styles.input}
            accessibilityLabel="Nome"
            placeholder="Digite seu nome"
            value={nome}
            onChangeText={setNome}
            autoCapitalize="words"
          />

          <Text style={styles.label}>E-mail</Text>
          <TextInput
            style={styles.input}
            accessibilityLabel="E-mail"
            placeholder="Digite seu e-mail"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <Text style={styles.label}>Idade</Text>
          <TextInput
            style={styles.input}
            accessibilityLabel="Idade"
            placeholder="Digite sua idade"
            value={idade}
            onChangeText={setIdade}
            keyboardType="number-pad"
          />

          <Text style={styles.label}>Telefone</Text>
          <TextInput
            style={styles.input}
            accessibilityLabel="Telefone"
            placeholder="(11) 99999-9999"
            value={telefone}
            onChangeText={setTelefone}
            keyboardType="phone-pad"
          />

          <Text style={styles.label}>Cidade</Text>
          <TextInput
            style={styles.input}
            accessibilityLabel="Cidade"
            placeholder="Digite sua cidade"
            value={cidade}
            onChangeText={setCidade}
            autoCapitalize="words"
          />

          <Text style={styles.label}>Estado</Text>
          <TextInput
            style={styles.input}
            accessibilityLabel="Estado"
            placeholder="Ex.: SP ou São Paulo"
            value={estado}
            onChangeText={setEstado}
            autoCapitalize="words"
          />

          {erro ? (
            <Text style={styles.erro} accessibilityRole="alert" accessibilityLiveRegion="polite">
              {erro}
            </Text>
          ) : null}

          <Button title="Enviar" onPress={enviar} color="#1d4ed8" />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function TelaDadosPessoais({ route, navigation }: DadosProps) {
  // Recebe os dados enviados pela tela de formulário.
  const { nome, email, idade, telefone, cidade, estado } = route.params;

  return (
    <SafeAreaView style={styles.tela} edges={['left', 'right', 'bottom']}>
      <ScrollView contentContainerStyle={styles.conteudo}>
        <Text style={styles.titulo}>Dados Pessoais</Text>
        <View style={styles.dados}>
          <Text style={styles.valor}>Nome: {nome}</Text>
          <Text style={styles.valor}>E-mail: {email}</Text>
          <Text style={styles.valor}>Idade: {idade} {Number(idade) === 1 ? 'ano' : 'anos'}</Text>
          <Text style={styles.valor}>Telefone: {telefone}</Text>
          <Text style={styles.valor}>Cidade: {cidade}</Text>
          <Text style={styles.valor}>Estado: {estado}</Text>
        </View>
        <Button title="Voltar" onPress={() => navigation.goBack()} color="#1d4ed8" />
      </ScrollView>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Formulario">
          <Stack.Screen name="Formulario" component={TelaFormulario} options={{ title: 'Formulário' }} />
          <Stack.Screen name="DadosPessoais" component={TelaDadosPessoais} options={{ title: 'Dados Pessoais' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: '#f5f5f5' },
  conteudo: { padding: 20, paddingBottom: 32 },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#111827' },
  descricao: { fontSize: 16, marginBottom: 20, color: '#4b5563' },
  label: { fontSize: 16, marginBottom: 6, color: '#111827' },
  input: {
    borderWidth: 1,
    borderColor: '#6b7280',
    borderRadius: 6,
    marginBottom: 16,
    padding: 12,
    fontSize: 16,
    color: '#111827',
    backgroundColor: '#ffffff',
  },
  erro: { fontSize: 14, color: '#b91c1c', marginBottom: 16 },
  dados: { marginBottom: 20 },
  valor: { fontSize: 18, lineHeight: 28, marginBottom: 12, color: '#111827' },
});
