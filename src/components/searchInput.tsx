import React, {useRef, useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {styles} from './searchInput.styles';

export let handleCloseDropdown: () => void;

type SearchComponentProps = {
  onPerformSearch: (arg: string) => void;
  searchQuery: string;
  setSearchQuery: (arg: string) => void;
  searchedItems: string[];
};

const SearchComponent = ({
  onPerformSearch,
  searchQuery,
  setSearchQuery,
  searchedItems,
}: SearchComponentProps) => {
  const [typingTimer, setTypingTimer] = useState<NodeJS.Timeout | null>(null);
  const [isShowDropdown, setIsShowDropdown] = useState<boolean>(false);
  const inputRef = useRef<TextInput>(null);

  const handleInputChange = (text: string) => {
    setSearchQuery(text);
    if (typingTimer) {
      clearTimeout(typingTimer);
    }

    const newTimer = setTimeout(() => {
      onPerformSearch(text);
    }, 2000);

    setTypingTimer(newTimer);
  };

  handleCloseDropdown = () => {
    setIsShowDropdown(false);
    inputRef?.current?.blur();
  };

  return (
    <View style={{zIndex: 2}}>
      <TextInput
        style={styles.input}
        ref={inputRef}
        value={searchQuery}
        onChangeText={handleInputChange}
        placeholder="Search..."
        onFocus={() => setIsShowDropdown(true)}
        onBlur={() => setIsShowDropdown(false)}
      />
      {searchedItems?.length > 0 && isShowDropdown && (
        <View style={styles.dropdownContainer}>
          <View style={styles.dropdown}>
            <Text style={styles.recentText}>Recent Searches</Text>
            {searchedItems.map(item => (
              <TouchableOpacity
                onPress={() => onPerformSearch(item)}
                style={styles.item}
                key={item}>
                <Text style={styles.itemText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

export default SearchComponent;
