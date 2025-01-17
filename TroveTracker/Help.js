import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useTheme } from './ThemeContext';
import { lightTheme, darkTheme } from './themes';

const Help = () => {
  const windowWidth = Dimensions.get('window').width;
  const imageWidth = windowWidth * 0.4;
  const aspectRatio = 1080/2115;
  const imageHeight = imageWidth / aspectRatio;
  const { theme } = useTheme();
  const currentTheme = theme === 'light' ? lightTheme : darkTheme;
  const styles = getStyles(currentTheme, imageWidth, imageHeight);


  

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>About</Text>
      <Text style={styles.helpText}>
        Trove Tracker is a user-friendly, searchable inventory app designed to help you keep track of your collectibles. Whether you're browsing books in a store and unsure if you already own a particular title, or managing any other type of collectible, Trove Tracker is your go-to tool. The app supports flexible search functionality, providing results for even partial matches, and allows for easy entry of new items, including bulk uploads via CSV files. With Trove Tracker, you can effortlessly manage and access your collection right from your hand, no matter where you are.
      </Text>
      <View style={styles.separator}></View>

      <Text style={styles.header}>Home</Text>
      <View style={styles.imageContainer}>
        <Image source={require('./imgs/homeimg.png')} style={styles.image} />
      </View>
      <Text style={styles.helpText}>
        Trove Tracker can keep track of your inventory of items as well as a wanted list of items. You can select which database you want to access here on the Home page. This page also offers the option of switching between Dark Mode and Light Mode.
      </Text>
      <View style={styles.separator}></View>

      <Text style={styles.header}>Search</Text>
      <View style={styles.imageContainer}>
        <Image source={require('./imgs/searchimg1.png')} style={styles.image} />
        <Image source={require('./imgs/searchimg2.png')} style={styles.image} />
      </View>
      <Text style={styles.helpText}>
        To find an item in the database, simply enter the keyword(s) in the Name field. The search will locate all entries containing the keyword(s) anywhere in their names. You can also enter the type of item to refine your results further. Once you've entered your criteria, press the Search button to display the results. To start a new search, click the New Search button.
      </Text>
      <View style={styles.separator}></View>

      <Text style={styles.header}>Add</Text>
      <View style={styles.imageContainer}>
        <Image source={require('./imgs/addimg.png')} style={styles.image} />
      </View>
      <Text style={styles.helpText}>
        To add an item to your inventory, enter the item's name or description in the Name field. Optionally, you can also specify the type of item in the Type field. Once you've entered the necessary information, press the Add button to save the item to the database.
      </Text>
      <View style={styles.separator}></View>

      <Text style={styles.header}>File</Text>
      <View style={styles.imageContainer}>
        <Image source={require('./imgs/fileimg1.png')} style={styles.image} />
        <Image source={require('./imgs/fileimg2.png')} style={styles.image} />
      </View>
      <Text style={styles.helpText}>
        You can easily add multiple items to your inventory using a CSV file. Create a CSV file with the items, including optional types, and save it on your phone (e.g., in the documents folder). On the File page, click the Browse button to select your CSV file. Once the correct file is displayed, press the Add Items button to import all the items from the file into your database.
      </Text>
      <View style={styles.separator}></View>

      <Text style={styles.header}>Delete</Text>
      <View style={styles.imageContainer}>
        <Image source={require('./imgs/deleteimg1.png')} style={styles.image} />
        <Image source={require('./imgs/deleteimg2.png')} style={styles.image} />
      </View>
      <Text style={styles.helpText}>
        To remove items from the database, enter the keyword(s) related to the item name or description. You can also enter a type to refine your search. Click the Search button to display the matching items. Check the boxes next to the items you wish to delete, then click the Delete button. You can enter new keyword(s) and perform another search at any time for different results.
      </Text>

      <Text style={styles.header}>List</Text>
      <View style={styles.imageContainer}>
        <Image source={require('./imgs/listimg.png')} style={styles.image} />
      </View>
      <Text style={styles.helpText}>
        The List view displays all entries in the selected table in alphabetical order, allowing you to easily browse the entire list.
      </Text>
      <View style={styles.separator}></View>

      <Text style={styles.header}>Creating A CSV</Text>
      <View style={styles.imageContainer}>
        <Image source={require('./imgs/csvimg1.png')} style={styles.image} />
        <Image source={require('./imgs/csvimg2.png')} style={styles.image} />
      </View>
      <Text style={styles.helpText}>
        Creating a CSV file for batch inserting items into Trove Tracker is simple. Use Excel to create two columns for your entries, then save the file as a CSV. Alternatively, you can use a text editor like Notepad. Enter the item name, followed by a comma, and then the item type. Ensure each item is on a new line, with no headers such as Name or Type. Then simply save as a CSV file.
      </Text>
      <View style={styles.separator}></View>

    </ScrollView>
  );
};

const getStyles = (theme, imageWidth, imageHeight) => StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: theme.background,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.text,
    marginBottom: 8,
  },
  helpText: {
    marginBottom: 16,
    color: theme.text,
    fontSize: 16,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  image: {
    width: imageWidth,
    height: imageHeight,
    marginHorizontal: 8,
    resizeMode: 'contain',
  },
  separator: {
    height: 16,
  },
});



export default Help;
