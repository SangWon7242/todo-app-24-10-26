import {
  Text,
  View,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useContext, useState } from "react";
import TodosContext from "../components/TodosProvider";

const TodoWriteScreen = ({ navigation }) => {
  const [todo, setTodo] = useState("");
  const { addTodo } = useContext(TodosContext);

  const headleAddTodo = () => {
    if (!todo.trim()) {
      Alert.alert("할 일을 입력해주세요.");
      return;
    }

    addTodo(todo);
    navigation.navigate("TodoList");
    setTodo("");
  };

  return (
    <>
      <TextInput
        multiline
        onChangeText={setTodo}
        value={todo}
        placeholder="할 일을 작성해주세요."
        style={styles.inputBox}
      />
      <View
        style={{
          flexDirection: "row",
          gap: 5,
          justifyContent: "center",
          marginLeft: 10,
          marginRight: 10,
        }}
      >
        <Pressable style={styles.pressableBtn} onPress={headleAddTodo}>
          <Text style={styles.text}>작성</Text>
        </Pressable>
        <Pressable
          style={styles.pressableBtn}
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <Text style={styles.text}>취소</Text>
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  inputBox: {
    minHeight: 200,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 2,
    margin: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  pressableBtn: {
    width: "50%",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default TodoWriteScreen;
