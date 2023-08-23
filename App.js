import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';

export default function App() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/filter.php?i=tomato')
      .then(response => response.json())
      .then(data => setRecipes(data.meals))
      .catch(error => console.error(error));
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={recipes}
        keyExtractor={item => item.idMeal}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item.strMeal}</Text>
            <Image style={styles.image} source={{ uri: item.strMealThumb }} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  image: {
    width: 100,
    height: 100,
  },
});