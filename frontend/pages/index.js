import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

const ALL_EMPLOYEES = gql`
  query ALL_PRODUCTS_QUERY {
    allEmployees {
      firstName
      lastName
      photoURL
      uuid
    }
  }
`;

export default function Home() {
  const { data, error, loading } = useQuery(ALL_EMPLOYEES);
  if (loading) return 'loading...';
  if (error) return error.message;
  const { allEmployees } = data;
  console.log({ allEmployees });
  return (
    <div>
      {data?.allEmployees.map((employee) => (
        <>
          <div>{employee.firstName}</div>
          <div>{employee.lastName}</div>
          <div>{employee.photoURL}</div>
          <div>{employee.uuid}</div>
        </>
      ))}
    </div>
  );
}
