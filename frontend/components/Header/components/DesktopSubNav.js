import {
  Box,
  Flex,
  Text,
  Stack,
  Icon,
  Link,
  useColorModeValue,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import {
  ChevronRightIcon,
} from '@chakra-ui/icons';

// Nav dropdown items visible at desktop resolution
export default function DesktopSubNav({ label, href, subLabel }) {
  return (
    <NextLink href={href} passHref>
      <Link
        role="group"
        display="block"
        p={2}
        rounded="md"
        _hover={{ bg: useColorModeValue('cyan.50', 'gray.900') }}
      >
        <Stack direction="row" align="center">
          <Box>
            <Text
              transition="all .3s ease"
              _groupHover={{ color: 'cyan.400' }}
              fontWeight={500}
            >
              {label}
            </Text>
            <Text fontSize="sm">{subLabel}</Text>
          </Box>
          <Flex
            transition="all .5s ease"
            transform="translateX(-50px)"
            opacity={0}
            _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
            justify="flex-end"
            align="center"
            flex={1}
          >
            <Icon color="cyan.400" w={5} h={5} as={ChevronRightIcon} />
          </Flex>
        </Stack>
      </Link>
    </NextLink>
  );
}
