import { useMutation } from '@apollo/client';
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
} from '@chakra-ui/react';
import gql from 'graphql-tag';
import { useRef, useState } from 'react';
import useForm from '../lib/useForm';
import { ALL_EMPLOYEES_QUERY } from './Employees';

const UPDATE_EMPLOYEE_MUTATION = gql`
  mutation UPDATE_EMPLOYEE_MUTATION(
    $id: ID!
    $data: EmployeeUpdateInput
  ) {
  updateEmployee(
    id: $id
    data: $data
  ) {
    id
    firstName
    lastName
    email
  }
}
`;

export default function EditModal({ employee, isModalOpen, setIsModalOpen }) {
  const {
    firstName, lastName, email, cell, age, gender, city, state, country, photoURL,
  } = employee;
  const initialRef = useRef();
  const {
    inputs, handleChange, resetForm,
  } = useForm({
    firstName, lastName, email, cell, age, gender, city, state, country, photoURL,
  });
  const [networkError, setNetworkError] = useState(false);
  const [updateEmployee, { data }] = useMutation(UPDATE_EMPLOYEE_MUTATION, {
    variables: { id: employee.id, data: inputs },
    refetchQueries: [{ query: ALL_EMPLOYEES_QUERY }],
  });

  const closeModal = () => {
    resetForm();
    setIsModalOpen(false);
  };

  const handleSubmit = async (_event) => {
    // save the input fields in the backend db
    try {
      const res = await updateEmployee();
      closeModal();
    } catch (e) {
      setNetworkError(e);
    }
  };

  const isRequiredFilledIn = inputs.firstName && inputs.lastName && inputs.email;
  return (
    <Modal
      initialFocusRef={initialRef}
      closeOnOverlayClick
      isOpen={isModalOpen}
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
  );
}
