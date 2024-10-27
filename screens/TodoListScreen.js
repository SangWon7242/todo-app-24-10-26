import { Text, View, StyleSheet } from "react-native";
import React from "react";

const TodoListScreen = ({ route }) => {
  const { todos } = route.params?.todosState || { todos: [] };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {todos.length > 0 ? (
        todos.map((todo) => (
          <View key={todo.id} style={styles.listBox}>
            <Text>번호 : {todo.id}</Text>
            <Text>작성날짜: {todo.regDate}</Text>
            <Text>할일: {todo.content}</Text>
          </View>
        ))
      ) : (
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          할 일이 없습니다.
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  listBox: {
    borderWidth: 2,
    width: "90%",
    padding: 10,
    borderRadius: 10,
  },
});

export default TodoListScreen;
