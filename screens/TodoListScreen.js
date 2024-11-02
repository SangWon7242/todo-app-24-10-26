import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Alert,
  Modal,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState, useContext } from "react";
import TodosContext from "../components/TodosProvider";
import { ListItem, Icon } from "@rneui/themed";

const TodoListItem = ({ todo, onModifyTodo, onRemoveTodo }) => {
  return (
    <View
      key={todo.id}
      style={{
        marginVertical: 5, // margin Y축
        marginHorizontal: 10, // margin X축
        borderWidth: 2,
        borderRadius: 10,
        overflow: "hidden",
      }}
    >
      <ListItem.Swipeable
        bottomDivider
        style={styles.listBox}
        leftContent={(reset) => (
          <Pressable
            style={{ ...styles.pressableBtn, backgroundColor: "blue" }}
            onPress={() => onModifyTodo(todo, reset)}
          >
            <Icon name="update" color="white" />
            <Text style={styles.btnText}>수정</Text>
          </Pressable>
        )}
        rightContent={(reset) => (
          <Pressable
            style={{ ...styles.pressableBtn, backgroundColor: "red" }}
            onPress={() => onRemoveTodo(todo.id, reset)}
          >
            <Icon name="delete" color="white" />
            <Text style={styles.btnText}>삭제</Text>
          </Pressable>
        )}
      >
        <ListItem.Content>
          <ListItem.Title>번호 : {todo.id}</ListItem.Title>
          <ListItem.Subtitle>작성 날짜 : {todo.regDate}</ListItem.Subtitle>
          <ListItem.Subtitle>할 일: {todo.content}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem.Swipeable>
    </View>
  );
};

const TodoModifyModal = ({
  modalVisible,
  setModalVisible,
  modifiedContent,
  setModifiedContent,
  onModifyTodo,
  closeModal,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <Pressable onPress={closeModal} style={styles.modalContainer}>
        <Pressable style={styles.modalBox}>
          <View style={styles.modalInner}>
            <View style={{ flexGrow: 1 }}>
              <TextInput
                multiline
                style={styles.modifyInput}
                placeholder="수정할 일을 입력해주세요."
                value={modifiedContent}
                onChangeText={setModifiedContent}
              />
            </View>
            <View style={styles.modalBtnBox}>
              <TouchableOpacity onPress={onModifyTodo}>
                <Text style={styles.modalBtnText}>수정</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={closeModal}>
                <Text style={styles.modalBtnText}>취소</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const TodoListScreen = () => {
  const { todos, removeTodo, modifyTodo } = useContext(TodosContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState(null);
  const [modifiedContent, setModifiedContent] = useState("");

  const openModifyModal = (todo, reset) => {
    setSelectedTodoId(todo.id);
    setModifiedContent(todo.content);
    reset();
    setModalVisible(true);
  };

  const handleModifyTodo = () => {
    if (selectedTodoId !== null) {
      modifyTodo(selectedTodoId, modifiedContent);
    }

    setSelectedTodoId(null);
    setModalVisible(false);
  };

  const closeModal = () => {
    setModifiedContent(modifiedContent);
    setModalVisible(false);
  };

  const handleRemoveTodo = (id, reset) => {
    Alert.alert(
      "삭제 확인",
      "정말 삭제하시겠습니까?",
      [
        {
          text: "삭제",
          onPress: () => {
            removeTodo(id);
            reset();
          },
          style: "destructive",
        },
        { text: "취소", onPress: () => reset(), style: "cancel" },
      ],
      {
        cancelable: true, // 경고창 상자 밖을 클릭하면 경고창 닫힘
        onDismiss: () => reset(), // 경고창 상자 밖을 클릭한 경우 콜백 함수 실행
      }
    );
  };

  return (
    <View style={styles.todoListContainer}>
      {todos.length > 0 ? (
        todos.map((todo) => (
          <TodoListItem
            todo={todo}
            onModifyTodo={openModifyModal}
            onRemoveTodo={handleRemoveTodo}
          />
        ))
      ) : (
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          할 일이 없습니다.
        </Text>
      )}
      <TodoModifyModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        modifiedContent={modifiedContent}
        setModifiedContent={setModifiedContent}
        onModifyTodo={handleModifyTodo}
        closeModal={closeModal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  todoListContainer: {
    flex: 1,
    backgroundColor: "#fff",
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalInner: {
    flex: 1,
  },
  modalBox: {
    width: "80%",
    minHeight: 250,
    borderWidth: 3,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  modifyInput: {
    padding: 10,
    fontSize: 20,
  },
  modalBtnBox: {
    height: 60,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 10,
    paddingRight: 20,
  },
  modalBtnText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default TodoListScreen;
