import { Grid, Select, useColorModeValue } from '@chakra-ui/react';
import { useQuery } from '@apollo/client';
import { gql } from 'graphql-tag';
import { useState, useEffect } from 'react';
import Employee from './Employee';
import { useSearch } from '../lib/searchState';

export const ALL_EMPLOYEES_QUERY = gql`
  query ALL_EMPLOYEES_QUERY {
    allEmployees(orderBy: "lastName") {
      id
      firstName
      lastName
      email
      cell
      age
      gender
      city
      state
      country
      photoURL
      countryCode
    }
  }`;

export default function Employees({ columns, byCountry, byCity }) {
  const { data, error, loading } = useQuery(ALL_EMPLOYEES_QUERY);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState();
  const [selectedCity, setSelectedCity] = useState();
  const { search } = useSearch();
  const uniqueCountries = [...new Set(
    data?.allEmployees.map((employee) => employee.country).filter(Boolean),
  )];
  const uniqueCities = [...new Set(
    data?.allEmployees.map((employee) => employee.city).filter(Boolean),
  )];

  const filter = () => {
    let searchedEmployees = data?.allEmployees.filter(
      (employee) => {
        const regex = new RegExp(search, 'i');
        return regex.test(employee.firstName) || regex.test(employee.lastName);
      },
    );
    if (byCountry && selectedCountry) searchedEmployees = searchedEmployees.filter((emp) => emp.country === selectedCountry);
    else if (byCity && selectedCity) searchedEmployees = searchedEmployees.filter((emp) => emp.city === selectedCity);
    setFilteredEmployees(searchedEmployees);
  };

  useEffect(filter, [search, data, selectedCity, selectedCountry]);

  if (loading) return 'loading...';
  if (error) return error.message;
  return (
    <>
      {byCountry && (
      <Select placeholder="Select country" onChange={(e) => setSelectedCountry(e.target.value)}>
        {uniqueCountries.map((country) => <option value={country}>{country}</option>)}
      </Select>
      )}
      {byCity && (
      <Select placeholder="Select city" onChange={(e) => setSelectedCity(e.target.value)}>
        {uniqueCities.map((country) => (
          <option value={country}>{country}</option>))}
      </Select>
      )}
      <Grid
        templateColumns={`repeat(${columns || 'auto-fit'}, minmax(250px, 1fr))`}
        gap={5}
        bg={useColorModeValue('white', 'gray.700')}
      >
        {filteredEmployees.map((employee) => (
          <Employee employee={employee} key={employee.id} />
        ))}
      </Grid>
    </>
  );
}
