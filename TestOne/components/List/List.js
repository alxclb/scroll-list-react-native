/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import ListHeader from './components/ListHeader';
import ListFooter from './components/ListFooter';
import Item from './components/Item';
import Error from './components/Error';

const List = () => {
  const [onEnd, setOnEnd] = useState(false);
  const [errorData, setErrorData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setIsLoading(true);
    let wait = setTimeout(()=>{ getData() }, 1000);
    return ()=>clearTimeout(wait)
  }, [currentPage]);

  let getData = async () => {
    const apiURL = `https://api.github.com/gists/public?per_page=12&page=${currentPage}`;

    fetch(apiURL)
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          let err = data.message;
          setErrorData({active: true, message: err});
        } else {
          setList(prevList => [...prevList, ...data]);
          setErrorData({active: false, message: ''});
        }
      })
      .catch(err => alert(err));

    setIsLoading(false);
  };

  let loadMore = () => {
    setCurrentPage(currentPage + 1);
    setIsLoading(true);
  };

  return errorData.active ? (
    <Error message={errorData.message} />
  ) : (
    <FlatList
      style={styles.listStyle}
      data={list}
      renderItem={({item}) => <Item item={item} />}
      keyExtractor={(item, index) => String(index)}
      ListHeaderComponent={()=> <ListHeader/>}
      ListFooterComponent={() => <ListFooter isLoading={isLoading} />}
      onEndReachedThreshold={0}
      onMomentumScrollBegin = {() => {setOnEnd(false)}}
      onEndReached={() => {
        if (!onEnd) {
          loadMore();    // LOAD MORE DATA
          setOnEnd(true);
        }
      }
    }
    />
  );
};

const styles = StyleSheet.create({
  listStyle: {
    backgroundColor: '#663399',
  },
});

export default List;
