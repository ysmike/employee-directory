import { useMutation } from '@apollo/client';
import {
  HamburgerIcon, EditIcon, DeleteIcon,
} from '@chakra-ui/icons';
import {
  Menu,
  MenuList,
  MenuItem,
  IconButton,
  MenuButton,
} from '@chakra-ui/react';
import gql from 'graphql-tag';
import { useState } from 'react';
import EditModal from './EditModal';

const DELETE_EMPLOYEE_MUTATION = gql`
  mutation DELETE_EMPLOYEE_MUTATION($id: ID!) {
    deleteEmployee(id: $id) {
      id
    }
  }
`;

function update(cache, payload) {
  const employeeLocationInCache = cache.identify(payload.data.deleteEmployee);
  cache.evict(employeeLocationInCache);
}

export default function EditButton({ employee }) {
  const [deleteEmployee, { data }] = useMutation(DELETE_EMPLOYEE_MUTATION, {
    variables: { id: employee.id },
    // instead of refetching queries, simply evict from the cache
    update,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <EditModal
        employee={employee}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<HamburgerIcon />}
          bg="transparent"
        />
        <MenuList>
          <MenuItem
            icon={<EditIcon />}
            onClick={() => setIsModalOpen(true)}
          >
            Edit
          </MenuItem>
          <MenuItem
            icon={<DeleteIcon />}
            onClick={() => {
            // eslint-disable-next-line no-restricted-globals
              if (confirm(`Are you sure you want to delete ${employee.fullName}?`)) {
                deleteEmployee();
              }
            }}
          >
            Delete
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
}
