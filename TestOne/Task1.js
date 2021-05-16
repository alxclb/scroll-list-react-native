/**
 * Question 1:
 * What are the issues in the page, how would you fix it?
 */

 import React from 'react';
 import { connect } from 'react-redux';
 import { View } from 'react-native';
 
 const mapCompaniesIntoPeople = (people, companies) => {
   /* Map Company names into each person that they work for */
 };
 
 const mapPeopleIntoHouses = (houses, people) => {
   /* Map people into house who live in the house */
 };
 
 class App extends React.Component {
   render() {
     this.props.fetchPeople()
     return (
       <View style={styles.container}>
         <People data={this.props.people}/>
         <House data={this.props.houses} />
       </View>
     );
   }
 }
 
 const mapStateToProps = state => {
   const { people: { data }, companies, houses } = state;
   const people = mapCompaniesIntoPeople(data, companies);
   const houses = mapPeopleIntoHouses(houses, data)
   return {
     people,
     houses,
   };
 };
 
 const mapDispatchToProps = dispatch => ({
   fetchPeople: () => dispatch(fetchPeople())
 });
 
 export default connect(mapStateToProps, mapDispatchToProps)(App);

/**
 *  Answer on Question 1: What are the issues in the page, how would you fix it?
 * 
 *  1. Rename "mapCompaniesIntoPeople" to "People". Function name must be the same as Component name in class App
 *  2. Rename "mapPeopleIntoHouses" to "Houses".    Function name must be the same as Component name in class App
 *  3. Import StyleSheet from 'react-native' and create styles with container property.
 *  4. Remove this.props.fetchPeople() from render() method, and put in "componentDidMount" lifecycle method, 
 *     to prevent possible infinite loop. 
 *  5. Rename <House/> to <Houses/>, to be the same as Function name.
 *  6. Remove "people = mapCompaniesIntoPeople(data, companies)" and "houses = mapPeopleIntoHouses(houses, data)" from mapStateToProps 
 *     and return {data, houses, companies} from mapStateToProps, because we need to return data and put them in components as props.
 *  7. In <People/> add data={this.props.data} companies={this.props.companies}
 *     In <Houses/> add houses={this.props.houses} data={this.props.data} 
 *  8. Delete mapDispatchProps and remove them also from connect. Add {fetchPeople} to "export default connect"
 *     Import fetchPeople from actions
 * 
 *     Code after correction
 */ 

 import React from 'react';
 import { connect } from 'react-redux';
 import { View, StyleSheet } from 'react-native';
 import { fetchPeople } from '...actions';
 
 const People = (people, companies) => {
   /* Map Company names into each person that they work for */
 };
 
 const Houses = (houses, people) => {
   /* Map people into house who live in the house */
 };
 
 class App extends React.Component {

  componentDidMount() {
    this.props.fetchPeople();
}

   render() {
     return (
       <View style={styles.container}>
         <People data={this.props.data} companies={this.props.companies} />
         <Houses add houses={this.props.houses} data={this.props.data} />
       </View>
     );
   }
 }
 const styles = StyleSheet.create({
  container: {
    //some styles
  },
});
 
 const mapStateToProps = state => {
   const { people: { data }, companies, houses } = state;
   return {
     data,
     houses,
     companies
   };
 };
 
 export default connect(mapStateToProps, { fetchPeople })(App);