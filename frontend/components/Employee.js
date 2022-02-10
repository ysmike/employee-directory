import { EmailIcon, PhoneIcon } from '@chakra-ui/icons';
import {
  Heading,
  Avatar,
  Box,
  Center,
  Flex,
  Text,
  Stack,
  useColorModeValue,
  Link,
} from '@chakra-ui/react';
import { useState } from 'react';

export default function Employee({ employee }) {
  const {
    firstName, lastName, photoURL, city, country, cell, email,
  } = employee;
  const fullName = `${firstName} ${lastName}`;
  const location = `${city}, ${country}`;
  const [isPhoneHovered, setIsPhoneHovered] = useState(false);
  const [isEmailHovered, setIsEmailHovered] = useState(false);

  return (
    <Center py={5}>
      <Box
        maxW="250px"
        w="full"
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow="2xl"
        rounded="md"
        mt={12}
      >
        <Flex justify="center" mt={-12}>
          <Avatar size="xl" src={photoURL} alt="Employee" />
        </Flex>

        <Box p={5}>
          <Stack spacing={0} align="center" mb={5}>
            <Heading fontSize="2xl" fontWeight={500} fontFamily="body">
              {fullName}
            </Heading>
            <Text color="gray.500">{location}</Text>
          </Stack>

          <Flex h={8} p={0}>
            <Flex
              justify="space-around"
              align="center"
              flex={1}
              onMouseOver={() => setIsPhoneHovered(true)}
              onMouseLeave={() => setIsPhoneHovered(false)}
              _hover={{ cursor: 'pointer' }}
            >
              {!isPhoneHovered ? (
                <PhoneIcon w={25} h={25} />
              ) : (
                <Link href={`tel:${cell}`}>
                  <Text fontSize="x-small">{cell}</Text>
                </Link>
              )}
            </Flex>
            <Flex
              justify="space-around"
              align="center"
              flex={1}
              onMouseOver={() => setIsEmailHovered(true)}
              onMouseLeave={() => setIsEmailHovered(false)}
              _hover={{ cursor: 'pointer' }}
            >
              {!isEmailHovered ? (
                <EmailIcon w={25} h={25} />
              ) : (
                <Link href={`mailto:${email}`}>
                  <Text fontSize="x-small">{email}</Text>
                </Link>
              )}
            </Flex>
          </Flex>
        </Box>
      </Box>
    </Center>
  );
}
