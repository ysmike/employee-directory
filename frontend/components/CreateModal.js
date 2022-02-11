import { useMutation } from '@apollo/client';
import { AddIcon } from '@chakra-ui/icons';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import gql from 'graphql-tag';
import { useRef, useState } from 'react';
import useForm from '../lib/useForm';
import { ALL_EMPLOYEES_QUERY } from './Employees';

const CREATE_EMPLOYEE_MUTATION = gql`
  mutation CREATE_EMPLOYEE_MUTATION(
    # which variables are passed in and what types are they?
    $firstName: String!
    $lastName: String!
    $email: String!
    $cell: String
    $age: String
    $gender: String
    $city: String
    $state: String
    $country: String
    $photoURL: String
    $countryCode: String
  ) {
  createEmployee(
    data:{
      firstName: $firstName
      lastName: $lastName
      email: $email
      cell: $cell
      age: $age
      gender: $gender
      city: $city
      state: $state
      country: $country
      photoURL: $photoURL
      countryCode: $countryCode
  }) {
    id
    firstName
    lastName
    email
    age
  }
}
`;

export default function CreateModal() {
  const initialRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { inputs, handleChange, resetForm } = useForm({
    firstName: '',
    lastName: '',
    email: '',
    cell: '',
    age: '',
    gender: '',
    city: '',
    state: '',
    country: '',
    photoURL: '',
  });

  const [networkError, setNetworkError] = useState(false);
  const [createEmployee, { data }] = useMutation(CREATE_EMPLOYEE_MUTATION, {
    variables: inputs,
    refetchQueries: [{ query: ALL_EMPLOYEES_QUERY }],
  });

  const closeModal = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (_event) => {
    // save the input fields in the backend db
    try {
      await createEmployee();
      closeModal();
    } catch (e) {
      setNetworkError(e);
    }
  };

  const isRequiredFilledIn = inputs.firstName && inputs.lastName && inputs.email;
  return (
    <>
      {/* full-size button for destop screen width */}
      <Button
        onClick={onOpen}
        bg={useColorModeValue('green.200', 'white')}
        color="black"
        m={5}
        display={{ base: 'none', md: 'flex' }}
      >
        Create Employee
      </Button>
      {/* plus button for mobile screen width */}
      <Button
        onClick={onOpen}
        bg={useColorModeValue('green.200', 'gray.400')}
        color="black"
        m={5}
        display={{ base: 'flex', md: 'none' }}
      >
        <AddIcon />
      </Button>

      <Modal
        initialFocusRef={initialRef}
        closeOnOverlayClick
        isOpen={isOpen}
        onClose={closeModal}
        size="xl"
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create an employee</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {/* optional error message */}
            {networkError
            && (
            <Text
              color="red"
              mb={4}
              p={2}
              border="1px solid red"
            >
              {networkError.message}
            </Text>
            )}
            {/* first & last name */}
            <Stack direction="row">
              <FormControl isRequired>
                <FormLabel>First name</FormLabel>
                <Input
                  ref={initialRef}
                  placeholder="First name"
                  onChange={handleChange}
                  name="firstName"
                  value={inputs.firstName}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Last name</FormLabel>
                <Input
                  placeholder="Last name"
                  onChange={handleChange}
                  name="lastName"
                  value={inputs.lastName}
                />
              </FormControl>
            </Stack>
            {/* email */}
            <FormControl isRequired mt={4}>
              <FormLabel>Email</FormLabel>
              <Input
                placeholder="Email"
                onChange={handleChange}
                name="email"
                value={inputs.email}
              />
            </FormControl>
            {/* mobile, age & gender */}
            <Stack direction="row" mt={4}>
              <FormControl>
                <FormLabel>Mobile #</FormLabel>
                <Input placeholder="Mobile #" onChange={handleChange} name="cell" value={inputs.cell} />
              </FormControl>
              <FormControl>
                <FormLabel>Age</FormLabel>
                <Input placeholder="Age" onChange={handleChange} name="age" type="number" value={inputs.age} />
              </FormControl>
              <FormControl>
                <FormLabel>Gender</FormLabel>
                <Input placeholder="Gender" onChange={handleChange} name="gender" value={inputs.gender} />
              </FormControl>
            </Stack>
            {/* city, state & country */}
            <Stack direction="row" mt={4}>
              <FormControl>
                <FormLabel>City</FormLabel>
                <Input placeholder="City" onChange={handleChange} name="city" value={inputs.city} />
              </FormControl>
              <FormControl>
                <FormLabel>State</FormLabel>
                <Input placeholder="State" onChange={handleChange} name="state" value={inputs.state} />
              </FormControl>
              <FormControl>
                <FormLabel>Country</FormLabel>
                <Input placeholder="Country" onChange={handleChange} name="country" value={inputs.country} />
              </FormControl>
            </Stack>
            {/* photoURL */}
            <FormControl mt={4}>
              <FormLabel>Photo URL</FormLabel>
              <Input placeholder="Photo URL" onChange={handleChange} name="photoURL" value={inputs.photoURL} />
            </FormControl>
          </ModalBody>
          {/* save & cancel buttons */}
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit} disabled={!isRequiredFilledIn}>
              Save
            </Button>
            <Button onClick={closeModal}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
