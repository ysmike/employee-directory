import { InfoOutlineIcon } from '@chakra-ui/icons';
import {
  Drawer,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  Flex,
  DrawerBody,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  useClipboard,
  Input,
} from '@chakra-ui/react';
import { useState } from 'react';

export default function InfoDrawer({ employee }) {
  const {
    email, cell, age, gender, city, state, country, photoURL, fullName,
  } = employee;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { hasCopied, onCopy } = useClipboard(email);

  return (
    <>
      {/* match dimensions of the hamburger icon above */}
      <Flex h="40px" w="40px" justify="center" align="center">
        <Flex>
          <InfoOutlineIcon display="inline-flex" onClick={onOpen} _hover={{ cursor: 'pointer' }} />
        </Flex>
      </Flex>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{fullName}</DrawerHeader>
          <DrawerBody>
            <Stat>
              <StatLabel ml="0.5">Email</StatLabel>
              <Flex mb={2}>
                <Input value={email} isReadOnly placeholder="Welcome" />
                <Button onClick={onCopy} ml={2}>
                  {hasCopied ? 'Copied' : 'Copy'}
                </Button>
              </Flex>
            </Stat>
            <Stat>
              <StatLabel>Mobile #</StatLabel>
              <StatNumber>{cell}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Age</StatLabel>
              <StatNumber>{age}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Gender</StatLabel>
              <StatNumber>{gender}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>City</StatLabel>
              <StatNumber>{city}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>State</StatLabel>
              <StatNumber>{state}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Country</StatLabel>
              <StatNumber>{country}</StatNumber>
            </Stat>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
