import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const SearchInput = ({
  placeholder = 'Search',
  placeholderTextColor = '#8e8e93',
  iconColor = '#8e8e93',
  onChangeText,
  value,
  onIconClick,
  bgColor,
  onFocus,
  editable
}) => {
  const [showClearIcon, setShowClearIcon] = useState(false);

  const clearText = () => {
    onChangeText('');
    setShowClearIcon(false);
  };
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <View style={[styles.searchContainer, { backgroundColor: bgColor }]}>
      <TouchableOpacity onPress={onIconClick} style={styles.iconContainer}>
        <FontAwesome
          name="search"
          size={responsiveWidth(4)}
          color={iconColor}
          style={styles.searchIcon}
        />
      </TouchableOpacity>
      <TextInput
      ref={inputRef}
        placeholder={placeholder}
        style={styles.searchInput}
        placeholderTextColor={placeholderTextColor}
        onChangeText={(text) => {
          onChangeText(text);
          setShowClearIcon(text.length > 0);
        }}
        value={value}
        placeholderStyle={styles.placeholderText}
        onFocus={onFocus}
        editable={editable}
        
      />
      {showClearIcon && (
        <TouchableOpacity onPress={clearText} style={styles.iconContainer}>
          <FontAwesome name="times-circle" size={responsiveWidth(4)} color={iconColor} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'grey',
    borderRadius: responsiveWidth(3),
    paddingHorizontal: 10,
    backgroundColor: '#f2f2f2ff',
    justifyContent: 'space-between',
    height: responsiveWidth(12),
  },
  searchInput: {
    flex: 1,
    marginLeft: responsiveWidth(2),
    fontSize: responsiveFontSize(1.7),
    color: '#000',
    fontWeight: '400',
    fontFamily: 'Poppins-Regular',
  },
  searchIcon: {
    marginRight: responsiveWidth(2),
  },
  iconContainer: {
    padding: responsiveWidth(2),
  },
  placeholderText: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SearchInput;
