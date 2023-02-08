import React, { useState } from "react";
import {
  FlatList,
  I18nManager,
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  Pressable,
  View,
  SafeAreaView,
  ViewStyle,
  TextStyle,
  ImageSourcePropType,
  ImageStyle,
} from "react-native";
import CountryJSON from "./src/CountryPicker/country.json";

const CountryPicker = (props: CountryPickerProps) => {
  const [selectedCountry, setSelectedCountry] = useState<CountryJsonProps>();
  const [hidePickerTitle, togglePickerTitle] = useState<boolean>(
    props?.hidePickerTitle
  );
  const [hideSearchBar, toggleSearchBar] = useState<boolean>(
    props?.hideSearchBar
  );
  const [countryJson, setCountryJson] = useState<any[]>(CountryJSON);
  const [isModalVisible, toggleModal] = useState<boolean>(false);
  const [selectedFlag, setSelectedFlag] = useState<boolean>(false);
  const language: string =
    props.language !== undefined ? props.language : "common";

  const searchByCountryNameCode = (searchText: string) => {
    if (/^-{0,1}\d+$/.test(searchText)) {
      var filteredJson = Object.values(CountryJSON).filter((item) => {
        return item.region.startsWith(searchText);
      });
    } else {
      var filteredJson = Object.values(CountryJSON).filter((item: any) => {
        const itemData =
          item?.name[language]?.toUpperCase() || item?.name[language]; // some lanaguage can't be uppercase e.g Arabic, Japenese
        const queryText = searchText?.toUpperCase() || searchText;
        return itemData?.includes(queryText);
      });
    }
    setCountryJson([...filteredJson]);
  };

  const handleItemOnClick = (item: CountryJsonProps) => {
    toggleModal(false);
    setSelectedFlag(true);
    setSelectedCountry(item);
    setCountryJson(CountryJSON);
    props.selectedValue && props.selectedValue(item.callingCode);
  };

  const renderListItem = ({
    item,
    index,
  }: {
    item: CountryJsonProps;
    index: Number;
  }) => {
    return (
      <View>
        <Pressable onPress={() => handleItemOnClick(item)}>
          <View style={styles(props).listItemView}>
            {!props.hideCountryFlag && (
              <Image
                source={{ uri: item.flag }}
                style={[styles(props).countryFlagStyle, props.countryFlagStyle]}
              />
            )}
            <View style={styles(props).titleView}>
              <Text
                style={[
                  styles(props).countryNameTextStyle,
                  props.countryNameTextStyle,
                ]}
              >
                {item?.name[language]}
                {`(+${item.callingCode})`}
              </Text>
            </View>
          </View>
          <View style={styles(props).divider} />
        </Pressable>
      </View>
    );
  };

  const renderFlagComponent = (selectedFlag: boolean, defaultText: string) => {
    let country: any = CountryJSON;
    const filteredJson: any = Object.keys(CountryJSON)
      .filter((key) => key.includes(defaultText))
      .reduce((obj, key) => {
        return Object.assign(obj, {
          [key]: country[key],
        });
      }, {});
    return (
      <Pressable
        style={{ flexDirection: "row" }}
        disabled={props.disable}
        onPress={() => toggleModal(true)}
      >
        <View style={styles(props).selectedCountryView}>
          {!props.hideCountryFlag && (
            <Image
              source={{
                uri: selectedFlag
                  ? selectedCountry?.flag
                  : filteredJson[props.countryCode]?.flag,
              }}
              style={[styles(props).countryFlagStyle, props.countryFlagStyle]}
            />
          )}
          {!props.hideCountryCode && (
            <Text
              style={[
                styles(props).selectedCountryTextStyle,
                props.selectedCountryTextStyle,
              ]}
            >
              {selectedFlag
                ? "+" + selectedCountry?.callingCode
                : "+" + filteredJson[props.countryCode]?.callingCode}
            </Text>
          )}

          <Image
            source={props.dropDownImage}
            style={[styles(props).dropDownImage, props.dropDownImageStyle]}
          />
        </View>
      </Pressable>
    );
  };

  return (
    <View style={[styles(props).containerStyle, props.containerStyle]}>
      {renderFlagComponent(selectedFlag, props.countryCode)}

      <Modal
        visible={isModalVisible}
        animationType={props.animationType}
        onRequestClose={() => toggleModal(false)}
      >
        <SafeAreaView style={[styles(props).safeAreaView, props.safeAreaStyle]}>
          <View
            style={[
              styles(props).searchBarContainer,
              props.searchBarContainerStyle,
            ]}
          >
            <Pressable
              disabled={props.disable}
              onPress={() => {
                setCountryJson(CountryJSON);
                toggleModal(false);
              }}
            >
              <Image
                resizeMode="center"
                style={styles(props).imageStyle}
                source={props.backButtonImage}
              />
            </Pressable>

            {!hidePickerTitle && (
              <Text
                style={[styles(props).pickerTitleStyle, props.pickerTitleStyle]}
              >
                {props.pickerTitle}
              </Text>
            )}

            {!hideSearchBar && (
              <TextInput
                style={[styles(props).searchBarStyle, props.searchBarStyle]}
                onChangeText={searchByCountryNameCode}
                placeholderTextColor={"#A9A9A9"}
                placeholder={props.searchBarPlaceHolder}
                keyboardType="default"
                returnKeyType={"done"}
                blurOnSubmit={true}
              />
            )}

            {!hidePickerTitle && (
              <Pressable
                onPress={() => {
                  toggleSearchBar(!hideSearchBar);
                  togglePickerTitle(!hidePickerTitle);
                }}
              >
                <Image
                  resizeMode="center"
                  style={styles(props).imageStyle}
                  source={props.searchButtonImage}
                />
              </Pressable>
            )}
          </View>

          <FlatList
            data={Object.values(countryJson)}
            numColumns={1}
            overScrollMode="never"
            initialNumToRender={50}
            style={[props.flatListStyle, styles(props).flatListStyle]}
            keyboardShouldPersistTaps={"handled"}
            showsVerticalScrollIndicator={false}
            keyExtractor={(index: any) => index.name[language].toString()}
            renderItem={renderListItem}
          />
        </SafeAreaView>
      </Modal>
    </View>
  );
};
export default CountryPicker;
CountryPicker.defaultProps = {
  disable: false,
  animationType: "slide",
  hideCountryFlag: false,
  hideCountryCode: false,
  dropDownImage: require("./res/ic_drop_down.png"),
  backButtonImage: require("./res/ic_back_black.png"),
  searchButtonImage: require("./res/ic_search.png"),
  countryCode: "IN",
  searchBarPlaceHolder: "Search...",
  selectedValue: "",
  pickerTitle: "",
  language: "common",
  theme: "light",
  hidePickerTitle: true,
  hideSearchBar: false,
};
interface CountryJsonProps {
  currency: "string";
  callingCode: number;
  flag: "string";
  region: "string";
  subregion: "string";
  name: {
    common: "string";
    ces: "string";
    cym: "string";
    deu: "string";
    fra: "string";
    hrv: "string";
    ita: "string";
    jpn: "string";
    nld: "string";
    por: "string";
    rus: "string";
    slk: "string";
    spa: "string";
    fin: "string";
    est: "string";
    zho: "string";
    pol: "string";
    urd: "string";
    kor: "string";
  };
}
export interface CountryPickerProps {
  animationType?: "none" | "slide" | "fade" | undefined;
  containerStyle?: ViewStyle;
  searchBarStyle?: ViewStyle;
  searchBarContainerStyle?: ViewStyle;
  pickerTitleStyle?: TextStyle;
  countryNameTextStyle?: TextStyle;
  selectedCountryTextStyle?: TextStyle;
  dropDownImage?: ImageSourcePropType;
  backButtonImage?: ImageSourcePropType;
  searchButtonImage?: ImageSourcePropType;
  dropDownImageStyle?: ImageStyle;
  countryFlagStyle?: ImageStyle;
  flatListStyle?: ViewStyle;
  safeAreaStyle?: ViewStyle;
  theme: "dark" | "light";
  countryCode?: string | any;
  hideCountryFlag?: boolean;
  hideCountryCode?: boolean;
  searchBarPlaceHolder?: string;
  pickerTitle?: string;
  disable?: boolean;
  selectedValue?: Function;
  hideSearchBar?: boolean;
  hidePickerTitle?: boolean;
  language:
    | "common"
    | "ces"
    | "cym"
    | "deu"
    | "fra"
    | "hrv"
    | "ita"
    | "jpn"
    | "nld"
    | "por"
    | "rus"
    | "slk"
    | "spa"
    | "fin"
    | "est"
    | "zho"
    | "pol"
    | "urd"
    | "kor";
}
const styles = (props: any) =>
  StyleSheet.create({
    safeAreaView: {
      flex: 1,
      backgroundColor: props?.theme === "dark" ? "#000" : "#fff",
    },
    containerStyle: {
      justifyContent: "center",
      backgroundColor: props?.theme === "dark" ? "#000" : "#fff",
    },
    searchBarStyle: {
      flex: 1,
      height: "80%",
      color: props?.theme === "dark" ? "#fff" : "#000",
      borderRadius: 5,
      // borderWidth: 1,
      padding: 10,
      backgroundColor:
        props?.theme === "dark" ? "rgba(23,22,27,3)" : "rgba(255,255,255,3)",
    },
    selectedCountryTextStyle: {
      color: "#000",
      textAlign: "right",
    },
    pickerTitleStyle: {
      flex: 1,
      fontSize: 16,
      color: props?.theme === "dark" ? "#fff" : "#000",
      alignSelf: "center",
      flexDirection: "row",
      justifyContent: "center",
    },
    divider: {
      width: "95%",
      height: 0.8,
      marginHorizontal: 10,
      backgroundColor: "#D3D3D3",
    },
    selectedCountryView: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    listItemView: {
      margin: 10,
      flexDirection: "row",
      alignItems: "center",
    },
    titleView: {
      flexDirection: "row",
    },
    countryNameTextStyle: {
      color: props?.theme === "dark" ? "#fff" : "#000",
      textAlign: I18nManager.isRTL ? "right" : "left",
    },
    countryFlagStyle: {
      width: 35,
      height: 25,
      borderRadius: 3,
    },
    dropDownImage: {
      width: 10,
      height: 10,
      marginHorizontal: 5,
    },
    searchBarContainer: {
      height: 56,
      paddingHorizontal: 5,
      flexDirection: "row",
      alignItems: "center",
      backgroundColor:
        props?.theme === "dark" ? "rgba(0,0,0,3)" : "rgba(255,255,255,9)",
      elevation: 5,
      shadowColor: props?.theme === "dark" ? "#fff" : "#000",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      maxWidth: "95%",
    },
    imageStyle: {
      width: 45,
      height: 45,
      transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
      tintColor: props?.theme === "dark" ? "#fff" : "#000",
    },
    flatListStyle: {
      padding: 15,
    },
  });
