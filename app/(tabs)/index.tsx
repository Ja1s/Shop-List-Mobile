import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import uuid from 'react-native-uuid';

function Home() {
  const [products, setProducts] = useState([]);
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState('');

  function addProduct() {
    if (inputValue.trim() === '') return;
    setProducts([{ id: uuid.v4(), name: inputValue }, ...products]);
    setInputValue('');
  }

  function confirmDeleteProduct(id) {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this product?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => deleteProduct(id),
        },
      ],
      { cancelable: true }
    );
  }

  function deleteProduct(id) {
    setProducts(products.filter(product => product.id !== id));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shop List</Text>
      <TextInput
        style={styles.input}
        placeholder='Products...'
        ref={inputRef}
        value={inputValue}
        onChangeText={setInputValue}
      />
      <Button title="Add" onPress={addProduct} />
      <FlatList
        data={products}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.productContainer}>
            <Text style={styles.productText}>{item.name}</Text>
            <TouchableOpacity onPress={() => confirmDeleteProduct(item.id)} style={styles.deleteButton}>
              <Text style={styles.deleteButtonText}>Delete Product</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#EEE'
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    color: '#111'
  },
  productContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  productText: {
    fontSize: 18,
    color: '#111'
  },
  deleteButton: {
    backgroundColor: '#ef2045',
    padding: 5,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
  },
});

export default Home;
