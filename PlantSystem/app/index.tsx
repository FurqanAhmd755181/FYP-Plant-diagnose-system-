import { View } from "react-native";
import BottomTab from "../src/components/BottomTab";
import { PhotoProvider } from "../src/components/PhotoContext";
// import Admin from"../src/Pages/AdminPages/AdminPage";
// import { GestureHandlerRootView } from "react-native-gesture-handler";
// import AdminDrawer from "../src/Pages/AdminPages/Navigations/AdminDrawer";


export default function Index() {
  return (
    <PhotoProvider> 
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <BottomTab />
        {/* <Admin></Admin> */}
      </View>
    </PhotoProvider>

    // <GestureHandlerRootView style={{ flex: 1 }}>
    //   <AdminDrawer />
    // </GestureHandlerRootView>
  );
}
