import { Text, View } from "react-native";
import React from "react";

const TodoSearchScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 40, fontWeight: "bold" }}>할일 검색</Text>
    </View>
  );
};

export default TodoSearchScreen;
