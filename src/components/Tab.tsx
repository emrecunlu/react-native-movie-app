import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, {
  Children,
  ReactNode,
  createContext,
  isValidElement,
  useContext,
  useState,
} from "react";
import colors from "@/utils/constants/colors";

type TabContextType = {
  activeTab: number | string;
  setActiveTab: (tab: number | string) => void;
};

const TabContext = createContext<TabContextType | undefined>(undefined);

type TabProps = {
  children: ReactNode;
  tab: number | string;
};

const Tab = ({ children, tab }: TabProps) => {
  const [activeTab, setActiveTab] = useState<number | string>(tab);

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      <ScrollView horizontal bounces={false}>
        {Children.map(children, (child) => child)}
      </ScrollView>

      <View className="mt-6">
        {Children.map(children, (child, index) => {
          if (isValidElement(child) && activeTab === index)
            return child.props.children;
        })}
      </View>
    </TabContext.Provider>
  );
};

type TabItemProps = {
  children?: ReactNode;
  value: number;
  title: string;
};

Tab.Item = ({ title, value }: TabItemProps) => {
  const context = useContext(TabContext);

  if (!context) {
    throw new Error("Tab context is undefined");
  }

  const { activeTab, setActiveTab } = context;

  return (
    <TouchableOpacity
      className="mr-12 pb-3"
      onPress={() => setActiveTab(value)}
      style={{
        borderBottomWidth: 6,
        borderBottomColor:
          activeTab === value ? colors.input : colors.background,
      }}
    >
      <Text
        className="font-poppins-medium text-white text-[17px]"
        style={{
          color: activeTab === value ? colors.light : colors.muted,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Tab;
