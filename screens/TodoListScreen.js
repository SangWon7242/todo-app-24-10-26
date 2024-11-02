import { Text, View, StyleSheet, Pressable } from "react-native";
import React, { useContext } from "react";
import TodosContext from "../components/TodosProvider";
import { ListItem, Icon } from "@rneui/themed";

const TodoListScreen = ({ route }) => {
  const { todos } = useContext(TodosContext);

  return (
    <View style={styles.todoListContainer}>
      {todos.length > 0 ? (
        todos.map((todo) => (
          <View key={todo.id} style={{ marginTop: 5 }}>
            <ListItem.Swipeable
              style={styles.listBox}
              leftContent={(reset) => (
                <Pressable
                  style={{ ...styles.pressableBtn, backgroundColor: "blue" }}
                  onPress={() => reset()}
                >
                  <Icon name="update" color="white" />
                  <Text style={styles.btnText}>수정</Text>
                </Pressable>
              )}
              rightContent={(reset) => (
                <Pressable
                  style={{ ...styles.pressableBtn, backgroundColor: "red" }}
                  onPress={() => reset()}
                >
                  <Icon name="delete" color="white" />
                  <Text style={styles.btnText}>삭제</Text>
                </Pressable>
              )}
            >
              <ListItem.Content>
                <ListItem.Title>번호 : {todo.id}</ListItem.Title>
                <ListItem.Subtitle>{todo.regDate}</ListItem.Subtitle>
                <ListItem.Subtitle>{todo.content}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem.Swipeable>
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
  todoListContainer: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 10,
  },
  listBox: {
    borderWidth: 2,
  },
  pressableBtn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default TodoListScreen;
