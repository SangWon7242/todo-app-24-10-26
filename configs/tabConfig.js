import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import TodoSearchScreen from "../screens/TodoSearchScreen";
import TodoWriteScreen from "../screens/TodoWriteScreen";
import TodoListScreen from "../screens/TodoListScreen";
import MyPageScreen from "../screens/MyPageScreen";

const tabConfig = [
  {
    name: "Home",
    title: "메인 홈",
    component: HomeScreen,
    focusedIcon: "home-variant",
    unfocuedIcon: "home-variant-outline",
    iconComponent: MaterialCommunityIcons,
  },
  {
    name: "TodoSearch",
    title: "할일 검색",
    component: TodoSearchScreen,
    focusedIcon: "search-sharp",
    unfocuedIcon: "search-outline",
    iconComponent: Ionicons,
  },
  {
    name: "TodoWrite",
    title: "할일 작성",
    component: TodoWriteScreen,
    focusedIcon: "application-edit",
    unfocuedIcon: "application-edit-outline",
    iconComponent: MaterialCommunityIcons,
  },
  {
    name: "TodoList",
    title: "할일 리스트",
    component: TodoListScreen,
    focusedIcon: "list-sharp",
    unfocuedIcon: "list-outline",
    iconComponent: Ionicons,
  },
  {
    name: "MyPage",
    title: "내 정보",
    component: MyPageScreen,
    focusedIcon: "person-circle-sharp",
    unfocuedIcon: "person-circle-outline",
    iconComponent: Ionicons,
  },
];

export default tabConfig;
