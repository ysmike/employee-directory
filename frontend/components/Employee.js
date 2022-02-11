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
import EditButton from './EditButton';
import InfoDrawer from './InfoDrawer';

export default function Employee({ employee }) {
  const {
    firstName, lastName, photoURL, city, country, cell, email,
  } = employee;
  const fullName = `${firstName} ${lastName}`;
  const location = `${city}, ${country}`;

  return (
    <Center p={5}>
      <Box
        minH={250}
        maxW="250px"
        w="full"
        bg={useColorModeValue('cyan.50', 'gray.800')}
        boxShadow="2xl"
        rounded="xl"
        mt={12}
      >

        <Flex justify="flex-end">
          <Flex direction="column">
            <EditButton employee={{ ...employee, fullName }} />
            <InfoDrawer employee={{ ...employee, fullName }} />

          </Flex>
        </Flex>

        <Flex justify="center" mt={-10}>
          <Avatar size="xl" src={photoURL} alt="Employee" />
        </Flex>

        <Box p={5}>
          <Stack spacing={0} align="center" mb={5}>
            <Heading fontSize="2xl" fontWeight={500} fontFamily="body">
              {fullName}
            </Heading>
            <Text color="gray.500">{location}</Text>
          </Stack>

          <Flex h={8} py={10}>
            <Flex
              justify="space-around"
              align="center"
              flex={1}
              _hover={{ cursor: 'pointer' }}
            >
              <Link href={`tel:${cell}`}>
                <PhoneIcon w={25} h={25} />
              </Link>
            </Flex>
            <Flex
              justify="space-around"
              align="center"
              flex={1}
              _hover={{ cursor: 'pointer' }}
            >
              <Link href={`mailto:${email}`}>
                <EmailIcon w={25} h={25} />
              </Link>
            </Flex>
          </Flex>
        </Box>
      </Box>
    </Center>
  );
}
