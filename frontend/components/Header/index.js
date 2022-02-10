import {
  Box,
  Flex,
  Text,
  IconButton,
  Collapse,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import {
  HamburgerIcon,
  CloseIcon,
} from '@chakra-ui/icons';
import MobileNav from './components/MobileNav';
import DesktopNav from './components/DesktopNav';
import Search from './components/Search';

export default function Header() {
  // custom hook to handle common open, close, or toggle scenarios
  const { isOpen, onToggle } = useDisclosure();
  return (
    <Box>
      {/* top-level flex container */}
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH="4rem"
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle="solid"
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align="center"
      >
        {/* Mobile Hamburger Button */}
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant="ghost"
            aria-label="Toggle Navigation"
          />
        </Flex>
        {/* Main Title (top left) */}
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }} _hover={{ cursor: 'pointer' }}>
          <NextLink href="/">
            <Text
              textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
              color={useColorModeValue('gray.800', 'white')}
            >
              Employee Directory
            </Text>
          </NextLink>
          {/* Search By Location */}
          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>
        <Search />
      </Flex>
      {/* Mobile Drop Down Menu From Tapping Hamburger */}
      <Collapse in={isOpen}>
        <MobileNav />
      </Collapse>
    </Box>
  );
}
