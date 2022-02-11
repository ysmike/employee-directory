import Head from 'next/head';
import Employees from '../../components/Employees';

export default function Home() {
  return (
    <>
      <Head>
        <title>Search by Country</title>
      </Head>
      <Employees byCity />
    </>
  );
}
