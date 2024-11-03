import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Alert,
  Modal,
  TextInput,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useState, useContext } from "react";
import TodosContext from "../components/TodosProvider";
import AppLoadingContext from "../components/AppLoadingProvider";
import { ListItem, Icon } from "@rneui/themed";

const { width, height } = Dimensions.get("window");

const TodoListItem = ({ todo, onModifyTodo, onRemoveTodo }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { fontsLoaded } = useContext(AppLoadingContext);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <View
      style={{
        marginVertical: "1%", // margin Y축
        marginHorizontal: "1.5%", // margin X축
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
          <Text>작성 날짜 : {todo.regDate}</Text>
          <Pressable onPress={toggleExpand} style={styles.contentBox}>
            <Text numberOfLines={isExpanded ? null : 2} ellipsizeMode="tail">
              할 일: {todo.content}
            </Text>
          </Pressable>
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
          <ScrollView style={styles.modalInner}>
            <TextInput
              multiline
              maxLength={100}
              style={styles.modifyInput}
              placeholder="수정할 일을 입력해주세요."
              value={modifiedContent}
              onChangeText={setModifiedContent}
            />
          </ScrollView>
          <View style={styles.modalBtnBox}>
            <TouchableOpacity onPress={onModifyTodo}>
              <Text style={styles.modalBtnText}>수정</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={closeModal}>
              <Text style={styles.modalBtnText}>취소</Text>
            </TouchableOpacity>
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
        <FlatList
          data={todos}
          renderItem={({ item }) => (
            <TodoListItem
              todo={item}
              onModifyTodo={openModifyModal}
              onRemoveTodo={handleRemoveTodo}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
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
  modalBox: {
    flex: 0.4,
    width: width * 0.8,
    backgroundColor: "#fff",
    borderWidth: 3,
    borderRadius: 10,
  },
  modifyInput: {
    padding: 10,
    fontSize: 20,
    fontFamily: "gmarketsans-font",
  },
  modalBtnBox: {
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 10,
    paddingRight: 20,
  },
  modalBtnText: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "gmarketsans-font",
  },
});

export default TodoListScreen;
