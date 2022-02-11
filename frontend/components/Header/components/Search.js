/* eslint-disable react/no-children-prop */
import { SearchIcon, SmallCloseIcon } from '@chakra-ui/icons';
import {
  Input, InputGroup, InputLeftElement, InputRightElement, Box,
} from '@chakra-ui/react';
import { useSearch } from '../../../lib/searchState';

export default function Search() {
  const { search, setSearch, clearSearch } = useSearch();
  const onChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <InputGroup w={{ base: '10rem', md: '20rem', lg: '30rem' }} flex="flex-end">
      <InputLeftElement
        pointerEvents="none"
        children={<SearchIcon color="gray.300" />}
      />
      <Input placeholder="Search" value={search} onChange={onChange} />
      <Box>
        <InputRightElement
          onClick={clearSearch}
          children={<SmallCloseIcon color="cyan.500" _hover={{ cursor: 'pointer' }} />}
        />
      </Box>
    </InputGroup>

  );
}
