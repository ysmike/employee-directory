/* eslint-disable import/no-cycle */
import { Grid } from '@chakra-ui/react';
import { useQuery } from '@apollo/client';
import { gql } from 'graphql-tag';
import Employee from './Employee';
import CreateModal from './CreateModal';

export const ALL_EMPLOYEES_QUERY = gql`
  query ALL_EMPLOYEES_QUERY {
    allEmployees {
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

export default function Employees() {
  const { data, error, loading } = useQuery(ALL_EMPLOYEES_QUERY);
  if (loading) return 'loading...';
  if (error) return error.message;
  const { allEmployees } = data;
  return (
    <>
      <CreateModal />
      <Grid templateColumns="repeat(4, 1fr)" gap={6}>
        {allEmployees.map((employee) => (
          <Employee employee={employee} key={employee.id} />
        ))}
      </Grid>
    </>
  );
}
