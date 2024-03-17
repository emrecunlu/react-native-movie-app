import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, {
  Children,
  LegacyRef,
  ReactNode,
  Ref,
  createContext,
  isValidElement,
  useContext,
  useRef,
  useState,
  MutableRefObject,
} from "react";
import colors from "@/utils/constants/colors";

type TabContextType = {
  activeTab: number | string;
  setActiveTab: (tab: number | string) => void;
  scrollRef: MutableRefObject<ScrollView | null>;
};

const TabContext = createContext<TabContextType | undefined>(undefined);

type TabProps = {
  children: ReactNode;
  tab: number | string;
  onChange: (value: number | string) => void;
};

const Tab = ({ children, tab, onChange }: TabProps) => {
  const ref = useRef<ScrollView | null>(null);

  return (
    <TabContext.Provider
      value={{ activeTab: tab, setActiveTab: onChange, scrollRef: ref }}
    >
      <ScrollView
        horizontal
        ref={ref}
        showsHorizontalScrollIndicator={false}
        bounces={false}
      >
        {Children.map(children, (child) => child)}
      </ScrollView>

      <View className="mt-6">
        {Children.map(children, (child, index) => {
          if (isValidElement(child) && tab === index)
            return child.props.children;
        })}
      </View>
    </TabContext.Provider>
  );
};

type TabItemProps = {
  children?: ReactNode;
  value: number | string;
  title: string;
};

Tab.Item = ({ title, value }: TabItemProps) => {
  const context = useContext(TabContext);

  if (!context) {
    throw new Error("Tab context is undefined");
  }

  const { activeTab, setActiveTab, scrollRef } = context;

  return (
    <TouchableOpacity
      className="mr-8 pb-3"
      onPress={(event) => {
        event.currentTarget.measure((x) => {
          scrollRef.current?.scrollTo({ x, animated: true });
        });

        setActiveTab(value);
      }}
      style={{
        borderBottomWidth: 4,
        borderBottomColor:
          activeTab === value ? colors.input : colors.background,
      }}
    >
      <Text
        className="font-poppins-medium text-white text-base"
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
